import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {auth, firestore, storage} from "../firebase/firebase";
import {
    RESETTING_PASSWORD,
    SIGNIN_USER,
    SIGNOUT_USER,
    SIGNUP_USER
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
import { getPerfil} from "../actions/perfil";

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
        const ref = storage.ref().child("images/" + id);
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
        .catch(error => error);

const signOutRequest = async () =>
    await  auth.signOut()
        .then(authUser => authUser)
        .catch(error => error);

function* createUserWithEmailPassword({payload}) {
    const {email, password} = payload;
    try {
        const signUpUser = yield call(createUserWithEmailPasswordRequest, email, password);
        yield call(uploadPhotoUserWithStorage, payload, signUpUser.user.uid);
        yield call(createUserWithFirestore, payload, signUpUser.user.uid);
        yield put(userSignUpSuccess());
        yield put(getPerfil(signUpUser.user.uid));
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
            yield put(getPerfil(userId));
        }
    } catch (error) {
        console.log(error);
    }
}

function* signOut() {
    try {
        const signOutUser = yield call(signOutRequest);
        if (signOutUser === undefined) {
            localStorage.removeItem('user_id');
            yield put(userSignOutSuccess(signOutUser));
        } else {
            yield put(userSignOutFailed());
        }
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
    yield takeEvery(SIGNUP_USER, createUserWithEmailPassword);
}

export function* signInUser() {
    yield takeEvery(SIGNIN_USER, signInUserWithEmailPassword);
}

export function* signOutUser() {
    yield takeEvery(SIGNOUT_USER, signOut);
}

export default function* rootSaga() {
    yield all([fork(signInUser),
        fork(createUserAccount),
        fork(signOutUser),
        fork(resettingPassword)
    ]);
}
