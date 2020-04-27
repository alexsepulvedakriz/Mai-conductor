import {all, fork, put, takeEvery, take} from "redux-saga/effects";
import { firestore } from "../firebase/firebase";
import { eventChannel} from 'redux-saga';
import {CONTRAOFERTAS_ACCEPT, CONTRAOFERTAS_DECLINE, CONTRAOFERTAS_LOAD, CONTRAOFERTAS_STOP_LOAD} from "../redux/actionTypes";
import {offerDriverCleanStore, offerDriverDeclined, offerDriverLoaded, offerDriverAccepted, offerDriverAcceptFailed, offerDriverDeclineFailed, offerDriverLoadFailed} from "../actions/offer_driver";
import {offerCleanStore} from "../actions/offer";
import {tripCurrencyLoad} from "../actions/trip";

const loadOfferDriverFirestore  = (id_pasajero) => eventChannel(emitter => {
        const unsubscribe = firestore.collection('pasajeros/' + id_pasajero + '/contra-ofertas').onSnapshot(snapshot => {
            const offersDrivers = [];
            snapshot.forEach((change) => {
                offersDrivers.push({...change.data(), id_oferta_conductor: change.id, id_pasajero: id_pasajero});
            });
            emitter({
                data: offersDrivers
            })
        });
        return () => unsubscribe();
    });

const updateOfferDriverFirestore  = (offerDriver) => eventChannel(emitter => {
    const {id_oferta_conductor, id_pasajero} = offerDriver;
    firestore.collection('pasajeros/' + id_pasajero + '/contra-ofertas').doc(id_oferta_conductor).update(offerDriver)
        .then(_=> {emitter({
            data: {cambiado: true}})})
        .catch( error => {
            console.log('error de firebase',error);
            emitter({
                data: {cambiado: false}})});
    return () => unsubscribe();
});

function* loadOfferDriver({payload}) {
    try {
        const id_pasajero = payload;
        const todosChannel = loadOfferDriverFirestore(id_pasajero);
        yield takeEvery(todosChannel, function*(action) {
            yield put(offerDriverLoaded({contra_ofertas: action.data}));
        });
        yield take(CONTRAOFERTAS_STOP_LOAD);
        yield put(offerDriverCleanStore());
        todosChannel.close();
    } catch (error) {
        yield put(offerDriverLoadFailed());
    }
}

function* acceptOfferDriver({payload}) {
    const {id_pasajero} = payload;
    const todosChannel = updateOfferDriverFirestore(payload);
    try {
        // eliminar el resto de las contraofertas
        yield takeEvery(todosChannel, function*(action) {
            yield put(tripCurrencyLoad(id_pasajero));
            yield put(offerDriverAccepted());
            yield put(offerDriverCleanStore());
            yield put(offerCleanStore());
        });
        yield take('UNWATCH-TODOS');
        todosChannel.close();
    } catch (error) {
        yield put(offerDriverAcceptFailed());
    }
}

function* declineOfferDriver({payload}) {
    try {
        const todosChannel = updateOfferDriverFirestore(payload);
        // eliminar el resto de las contraofertas
        yield takeEvery(todosChannel, function*(action) {
            yield put(offerDriverDeclined());
        });
        yield take('UNWATCH-TODOS');
        todosChannel.close();
    } catch (error) {
        yield put(offerDriverDeclineFailed());
    }
}



// funciones que escuchan las acciones emitidas
export function* triggerLoadOfferDriver() {
    yield takeEvery(CONTRAOFERTAS_LOAD, loadOfferDriver);
}
export function* triggerDeclineOfferDriver() {
    yield takeEvery(CONTRAOFERTAS_DECLINE, declineOfferDriver);
}
export function* triggerAcceptOfferDriver() {
    yield takeEvery(CONTRAOFERTAS_ACCEPT, acceptOfferDriver);
}

// permite agregar las funciones de este archivo al sagas root
export default function* rootSaga() {
    yield all([fork(triggerLoadOfferDriver), fork(triggerAcceptOfferDriver), fork(triggerDeclineOfferDriver)]);
}
