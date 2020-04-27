import {all, fork, put, takeEvery, take} from "redux-saga/effects";
import { firestore } from "../firebase/firebase";
import {ABOUT_LOAD} from "../redux/actionTypes";
import { eventChannel} from 'redux-saga';
import {aboutLoaded, aboutLoadFail} from "../actions/about";

const getAboutFirestore  = () => eventChannel(emitter => {
    const unsubscribe = firestore.collection('empresa').doc('nosotros').get()
        .then(function(doc) {
            if (doc.exists) {
                emitter({
                    data: doc.data()
                })
            } else {
                // doc.data() will be undefined in this case
                emitter({
                    data: {cambiado: false}
                });
            }
        })
        .catch( error => {
            console.log(error);
            emitter({
                data: {cambiado: false}
            })});
    return () => unsubscribe();
});

function* getAbout({payload}) {
    const idPasajero = payload;
    try {
        // consulta directa a firestore, una vez conectado emite un evento
        const todosChannel = getAboutFirestore(idPasajero);
        // escucha eventos emitidos por la funcion anteriorm activandose y emitiendo una accion manejable por los reducers
        yield takeEvery(todosChannel, function*(action) {
            yield put(aboutLoaded(action.data));
        });
        // detener la ejecucion de la consulta directa a firestore
        yield take('UNWATCH-TODOS');
        todosChannel.close();
    } catch (error) {
        yield put(aboutLoadFail());
    }

}

export function* triggerAbout() {
    yield takeEvery(ABOUT_LOAD, getAbout);
}

// permite agregar las funciones de este archivo al sagas root
export default function* rootSaga() {
    yield all([fork(triggerAbout)]);
}
