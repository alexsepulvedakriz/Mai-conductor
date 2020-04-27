import {all, fork, put, takeEvery, take, call} from "redux-saga/effects";
import {firestore, storage} from "../firebase/firebase";
import { PERFIL_LOAD, PERFIL_UPDATE } from "../redux/actionTypes";
import {profileLoaded, profileUpdated, profileLoadFail, profileUpdateFail} from "../actions/profile";
import { eventChannel} from 'redux-saga';
import {showModalCheck} from "../actions/modals";

const uploadPhotoProfileWithStorage = async (informacion) => {
    const {photo, id_pasajero, id_photo} = informacion;
    if(photo) {
        const ref = storage.ref().child("images/profile/" + id_pasajero+ '/' + id_photo);
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

const actualizarPerfilFirestore  = (infoPerfil) => eventChannel(emitter => {
    delete infoPerfil.photo;
    const {id_pasajero} = infoPerfil;
    firestore.collection('pasajeros/' + id_pasajero + '/perfil').doc(id_pasajero).update(infoPerfil)
        .then(_=> {emitter({
            data: {cambiado: true}})})
        .catch( error => {
            console.log(error);
            emitter({
                data: {cambiado: false}})})
    ;
    return () => unsubscribe();
});

const consultaPerfilFirestore  = (id_pasajero) => eventChannel(emitter => {
    const unsubscribe = firestore.collection('pasajeros/' + id_pasajero + '/perfil').onSnapshot(snapshot => {
        snapshot.forEach((change) => {
            emitter({
                data: {...change.data(), id_pasajero: id_pasajero}
            })
        });
    });
    return () => unsubscribe();
});

function* obtenerPerfil({payload}) {
    const id_pasajero = payload;
    try {
        // consulta directa a firestore, una vez conectado emite un evento
        const todosChannel = consultaPerfilFirestore(id_pasajero);
        // escucha eventos emitidos por la funcion anteriorm activandose y emitiendo una accion manejable por los reducers
        yield takeEvery(todosChannel, function*(action) {
            yield put(profileLoaded(action.data));
        });
        // detener la ejecucion de la consulta directa a firestore
        yield take('UNWATCH-TODOS');
        todosChannel.close();
    } catch (error) {
        yield put(profileLoadFail());
    }

}

function* actualizarPerfil({payload}) {
    const copyProfile = Object.assign({}, payload);
    try {
// consulta directa a firestore, una vez conectado emite un evento
        const todosChannel = actualizarPerfilFirestore(copyProfile);
        // escucha eventos emitidos por la funcion anteriorm activandose y emitiendo una accion manejable por los reducers
        yield takeEvery(todosChannel, function*() {
            yield put(profileUpdated());
            yield put(showModalCheck());
        });
        // detener la ejecucion de la consulta directa a firestore

        yield call(uploadPhotoProfileWithStorage, payload);
        yield take('UNWATCH-TODOS');
        todosChannel.close();
    } catch (error) {
        yield put(profileUpdateFail());
    }

}

export function* activadorObtenerPerfil() {
    yield takeEvery(PERFIL_LOAD, obtenerPerfil);
}
export function* activadorActualizarPerfil() {
    yield takeEvery(PERFIL_UPDATE, actualizarPerfil);
}

// permite agregar las funciones de este archivo al sagas root
export default function* rootSaga() {
    yield all([fork(activadorObtenerPerfil), fork(activadorActualizarPerfil)]);
}
