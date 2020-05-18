import {all, fork, put, takeEvery, take, call} from "redux-saga/effects";
import {firestore, storage} from "../firebase/firebase";
import {PROFILE_LOAD, PROFILE_STOP_LISTEN_LOAD, PROFILE_UPDATE} from "../redux/actionTypes";
import {profileLoaded, profileUpdated, profileLoadFail, profileUpdateFail} from "../actions/profile";
import { eventChannel} from 'redux-saga';

const uploadPhotoProfileWithStorage = async (profile) => {
    const {photo, id_driver, id_photo} = profile;
    if(photo) {
        const ref = storage.ref().child("images/profile/" + id_driver+ '/' + id_photo);
        await ref.put(photo)
            .then(function() {
                console.log("Photo successfully uploaded!");
            })
            .catch(function(error) {
                console.error("Error upload photo: ", error);
            });
    }    else {
        console.log('error de carga: foto carga');
    }
}

const updateProfileFirestore  = (profile) => eventChannel(emitter => {
    delete profile.photo;
    const {id_driver} = profile;
    firestore.collection('drivers/' + id_driver + '/profile').doc(id_driver).update(profile)
        .then(_=> {emitter({
            data: {cambiado: true}})})
        .catch( error => {
            console.log(error);
            emitter({
                data: {cambiado: false}})})
    ;
    return () => unsubscribe();
});

const loadProfileFirestore  = (id_driver) => eventChannel(emitter => {
    const unsubscribe = firestore.collection('drivers/' + id_driver + '/profile').onSnapshot(snapshot => {
        snapshot.forEach((change) => {
            emitter({
                data: {...change.data(), id_driver: id_driver}
            })
        });
    });
    return () => unsubscribe();
});

function* loadProfile({payload}) {
    const id_driver = payload;
    try {
        const todosChannel = loadProfileFirestore(id_driver);
        yield takeEvery(todosChannel, function*(action) {
            yield put(profileLoaded(action.data));
        });
        yield take('UNWATCH-TODOS');
        todosChannel.close();
    } catch (error) {
        yield put(profileLoadFail());
    }

}

function* updateProfile({payload}) {
    try {
        const todosChannel = updateProfileFirestore(payload);
        yield takeEvery(todosChannel, function*() {
            yield put(profileUpdated());
        });
        yield call(uploadPhotoProfileWithStorage, payload);
        yield take(PROFILE_STOP_LISTEN_LOAD);
        todosChannel.close();
    } catch (error) {
        yield put(profileUpdateFail());
    }

}
export function* triggerLoadProfile() {
    yield takeEvery(PROFILE_LOAD, loadProfile);
}
export function* triggerUpdateProfile() {
    yield takeEvery(PROFILE_UPDATE, updateProfile);
}
export default function* rootSaga() {
    yield all([fork(triggerLoadProfile), fork(triggerUpdateProfile)]);
}
