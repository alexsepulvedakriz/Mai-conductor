import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {auth, firestore, storage} from "../firebase/firebase";
import {
    RESETTING_PASSWORD,
    SIGN_IN_USER,
    SIGN_OUT_USER,
    SIGN_UP_USER
} from "../redux/actionTypes";
import {
    userSignInSuccess,
    userSignOutSuccess,
    userSignUpSuccess,
    userSignInFailed,
    userSignUpFailed,
    userSignOutFailed,
    resettingPasswordFailed,
    resettingPasswordSuccess, authCleanStore
} from "../actions/auth";
import {profileCleanStore, profileLoad} from "../actions/profile";
import {offerCleanStore} from "../actions/offer";
import {offersDriverCleanStore} from "../actions/offer_driver";
import {tripCleanStore} from "../actions/trip";
import {aboutCleanStore} from "../actions/about";
import {accidentCleanStore} from "../actions/accident";
import {generateUIDD} from "../functions/others";
import {vehiclesDriverCleanStore} from "../actions/vehicles";
import {penaltiesCleanStore} from "../actions/penalties";
import {complaintClean} from "../actions/complaint";

const createUserWithEmailPasswordRequest = async (email, password) =>
    await  auth.createUserWithEmailAndPassword(email, password)
        .then(authUser => authUser)
        .catch(error => error);

const createUserWithFirestore = async (user, id) => {
    console.log('driver firestore');
    await  firestore.collection('drivers/' + id + '/profile').doc(id).set(user)
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
}

const uploadFileUserWithStorage = async (file, id) => {
    if(file) {
        const ref = storage.ref().child("files/drivers/" + id);
        await ref.put(file)
            .then(function() {
                console.log("File suben!");
            })
            .catch(function(error) {
                console.error("Error upload file: ", error);
            });
    }    else {
        console.log('error de carga: foto perfil');
    }
}

const resetPasswordFirebase = async (email) =>
    await  auth.sendPasswordResetEmail(email)
        .then(res => res)
        .catch(error => error);


const signInUserWithEmailPasswordRequest = async (email, password) =>
    await  auth.signInWithEmailAndPassword(email, password)
        .then(authUser => authUser)
        .catch(error => console.log(error));

const signOutRequest = async () =>
    await  auth.signOut()
        .then(authUser => authUser)
        .catch(error => error);

function* createUserWithEmailPassword({payload}) {
    let id_base= yield call(generateUIDD);
    const {new_user, new_driver, new_vehicle} = payload;
    const document_new_user = {
        ... new_user,
        type_licence: new_driver.type_licence,
        ref_photo_driver_licence: 'photo_driver_licence-' + id_base,
        ref_file_criminal_record: 'file_criminal_record-' + id_base,
        ref_photo_id_card: 'photo_id_card-' + id_base,
        ref_photo_driver: 'photo_driver-' + id_base,
        licence_plate: new_vehicle.licence_plate,
        year: new_vehicle.year,
        type: new_vehicle.type,
        car_make: new_vehicle.car_make,
        model: new_vehicle.model,
        vehicle_roll: 'vehicle_roll-' + id_base,
        annotation_certificate: 'annotation_certificate-' + id_base,
        photo_authorization: 'photo_authorization-' + id_base,
        photo_vehicle: 'photo_vehicle-' + id_base,
        permission_to_circulate: 'permission_to_circulate-' + id_base,
    };
    try {
        const sign_up_user = yield call(createUserWithEmailPasswordRequest, new_user.email, new_user.password);
        yield call(uploadFileUserWithStorage, new_driver.photo_driver_licence, 'photo_driver_licence' + id_base);
        yield call(uploadFileUserWithStorage, new_driver.file_criminal_record, 'file_criminal_record' + id_base);
        yield call(uploadFileUserWithStorage, new_driver.photo_id_card, 'photo_id_card' + id_base);
        yield call(uploadFileUserWithStorage, new_driver.photo_driver, 'photo_driver' + id_base);
        yield call(createUserWithFirestore, document_new_user, sign_up_user.user.uid);
        yield put(userSignUpSuccess());
        yield put(authCleanStore());
    } catch (error) {
        yield put(userSignUpFailed(error));
    }
}


function* signInUserWithEmailPassword({payload}) {
    const {email, password} = payload;
    try {
        const signInUser = yield call(signInUserWithEmailPasswordRequest, email, password);
        // obtenemos la id del usuario una vez autentciado
        const userId = signInUser.user.uid;
        if (signInUser.message) {
            yield put(userSignInFailed());
        } else {
            yield put(userSignInSuccess(userId));
            yield put(profileLoad(userId));
        }
    } catch (error) {
        yield put(userSignInFailed());
    }
}

function* signOut() {
    try {
        yield call(signOutRequest);
        yield put(userSignOutSuccess());
        yield put(offerCleanStore());
        yield put(offersDriverCleanStore());
        yield put(profileCleanStore());
        yield put(tripCleanStore());
        yield put(aboutCleanStore());
        yield put(authCleanStore());
        yield put(accidentCleanStore());
        yield put(vehiclesDriverCleanStore());
        yield put(penaltiesCleanStore());
        yield put(complaintClean());
        localStorage.removeItem('user_id');
    } catch (error) {
        yield put(userSignOutFailed());
    }
}

function* resettingPasswordUser(info) {
    const {payload} = info;
    try {
        yield call(resetPasswordFirebase, payload);
        yield put(resettingPasswordSuccess());
    } catch (error) {
        yield put(resettingPasswordFailed());
    }
}

export function* resettingPassword() {
    yield takeEvery(RESETTING_PASSWORD, resettingPasswordUser);
}

export function* createUserAccount() {
    yield takeEvery(SIGN_UP_USER, createUserWithEmailPassword);
}

export function* signInUser() {
    yield takeEvery(SIGN_IN_USER, signInUserWithEmailPassword);
}

export function* signOutUser() {
    yield takeEvery(SIGN_OUT_USER, signOut);
}

export default function* rootSaga() {
    yield all([fork(signInUser),
        fork(createUserAccount),
        fork(signOutUser),
        fork(resettingPassword)
    ]);
}
