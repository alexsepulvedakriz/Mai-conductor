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
    resettingPasswordSuccess
} from "../actions/auth";
import {profileCleanStore, profileLoad} from "../actions/profile";
import {offerCleanStore} from "../actions/offer";
import {offersDriverCleanStore} from "../actions/offer_driver";
import {tripCleanStore} from "../actions/trip";
import {aboutCleanStore} from "../actions/about";

const createUserWithEmailPasswordRequest = async (email, password) =>
    await  auth.createUserWithEmailAndPassword(email, password)
        .then(authUser => authUser)
        .catch(error => error);

const createUserWithFirestore = async (informacion, id) => {
    delete informacion.password;
    delete informacion.photo;
    await  firestore.collection('pasajeros/' + id + '/perfil').doc(id).set(informacion)
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
}

const uploadPhotoUserWithStorage = async (informacion, id) => {
    const {photo} = informacion;
    if(photo) {
        const ref = storage.ref().child("images/riders" + id);
        await ref.put(photo)
            .then(function() {
                console.log("Photo successfully uploaded!");
            })
            .catch(function(error) {
                console.error("Error upload photo: ", error);
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
    const {email, password} = payload;
    try {
        const signUpUser = yield call(createUserWithEmailPasswordRequest, email, password);
        yield call(uploadPhotoUserWithStorage, payload, signUpUser.user.uid);
        payload = {...payload, id_pasajero: signUpUser.user.uid, conductores_bloqueados: []};
        yield call(createUserWithFirestore, payload, signUpUser.user.uid);
        yield put(userSignUpSuccess());
        yield put(profileLoad(signUpUser.user.uid));
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
