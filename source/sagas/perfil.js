import {all, fork, put, takeEvery, take} from "redux-saga/effects";
import { firestore } from "../firebase/firebase";
import { PERFIL_LOANDING, PERFIL_UPDATING } from "../redux/actionTypes";
import {gotPerfil, updatedPerfil} from "../actions/perfil";
import { eventChannel} from 'redux-saga'
import {NavigationActions} from "react-navigation";


// obtener perfilesm escucha la accion emitida por algun componente

export function* activadorObtenerPerfil() {
    yield takeEvery(PERFIL_LOANDING, obtenerPerfil);
}
// consulta a firestore, javascript tradicional
const consultaPerfilFirestore  = (idPasajero) =>
    eventChannel(emitter => {
        const unsubscribe = firestore.collection('conductores/' + idPasajero + '/perfil').onSnapshot(snapshot => {
            snapshot.forEach((change) => {
                console.log(change.data());
                emitter({
                    data: change.data()
                })
            });
        });
        return () => unsubscribe();
    });

// funcion saga que llama a  la funcion que hara la llamada a firestore, ademas permite emitir acciones para los reducers y detener la subcripcion
function* obtenerPerfil({payload}) {
    const idPasajero = payload;
    try {
        // consulta directa a firestore, una vez conectado emite un evento
        const todosChannel = consultaPerfilFirestore(idPasajero);
        // escucha eventos emitidos por la funcion anteriorm activandose y emitiendo una accion manejable por los reducers
        yield takeEvery(todosChannel, function*(action) {
            yield put(gotPerfil(action.data));
        });
        // detener la ejecucion de la consulta directa a firestore
        yield take('UNWATCH-TODOS');
        todosChannel.close();
    } catch (error) {
        console.log("error");
    }

}

// actulalizar perfiles

export function* activadorActualizarPerfil() {
    yield takeEvery(PERFIL_UPDATING, actualizarPerfil);
}

function* actualizarPerfil({payload}) {
    const infoPerfil = payload;
    // consulta directa a firestore, una vez conectado emite un evento
    const todosChannel = actualizarPerfilFirestore(infoPerfil);
    // escucha eventos emitidos por la funcion anteriorm activandose y emitiendo una accion manejable por los reducers
    yield takeEvery(todosChannel, function*() {
        yield put(updatedPerfil());
    });
    // detener la ejecucion de la consulta directa a firestore
    yield take('UNWATCH-TODOS');
    todosChannel.close();
}

const actualizarPerfilFirestore  = (infoPerfil) =>
    eventChannel(emitter => {
        console.log(infoPerfil);
        const {idPasajero} = infoPerfil;
        console.log(idPasajero);
        firestore.collection('conductores/' + idPasajero + '/perfil').doc('BGUVZOsrAQNUIiQTbi0AlTt46IE3').update(infoPerfil)
            .then(_=> {emitter({
            data: {cambiado: true}})})
            .catch( error => {
                console.log(error);
                emitter({
                data: {cambiado: false}})})
        ;
        return () => unsubscribe();
    });

// permite agregar las funciones de este archivo al sagas root
export default function* rootSaga() {
    yield all([fork(activadorObtenerPerfil), fork(activadorActualizarPerfil)]);
}
