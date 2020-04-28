import {all, fork, put, takeEvery, take} from "redux-saga/effects";
import { firestore } from "../firebase/firebase";
import { eventChannel} from 'redux-saga';
import {TRIP_CURRENCY_LOAD, TRIP_FINISH, TRIP_LOAD, TRIP_UPDATE} from "../redux/actionTypes";
import {
    tripLoaded,
    tripLoadFailed,
    tripUpdated,
    tripUpdateFailed,
    tripCurrencyLoaded,
    tripCurrencyLoadFailed,
    tripCleanStore,
    tripEndFail,
    tripEnded
} from "../actions/trip";

const loadTripFirestore  = (id_pasajero) => eventChannel(emitter => {
        const unsubscribe = firestore.collection('pasajeros/' + id_pasajero + '/viajes').onSnapshot(snapshot => {
            const trips = [];
            snapshot.forEach((change) => {
                trips.push({...change.data(), id_viaje: change.id, id_pasajero: id_pasajero});
            });
            emitter({
                data: trips
            })
        });
        return () => unsubscribe();
    });

const loadTripCurrencyFirestore  = (id_pasajero) => eventChannel(emitter => {
    const unsubscribe = firestore.collection('pasajeros/' + id_pasajero + '/viajes').where('activo' ,'==', true).onSnapshot(snapshot => {
        const trips = [];
        snapshot.forEach((change) => {
            trips.push({...change.data(), id_viaje: change.id, id_pasajero: id_pasajero});
        });
        emitter({
            data: trips
        })
    });
    return () => unsubscribe();
});

const updateTripFirestore  = (Trip) => eventChannel(emitter => {
        const { id_pasajero, id_viaje} = Trip;
        firestore.collection('pasajeros/' + id_pasajero + '/viajes').doc(id_viaje).update(Trip)
            .then(_=> {emitter({
                data: {cambiado: true}})})
            .catch( error => {
                console.log(error);
                emitter({
                    data: {cambiado: false}})});
        return () => unsubscribe();
    });

function* updateTrip({payload}) {
    try {
        const viaje = payload;
        const todosChannel = updateTripFirestore(viaje);
        yield takeEvery(todosChannel, function*() {
            // TODO revisar lo que recibe esta funcion
            yield put(tripUpdated());
        });
        yield take('UNWATCH-TODOS');
        todosChannel.close();
    } catch (error) {
        yield put(tripUpdateFailed());
    }
}

function* endTrip({payload}) {
    try {
        const viaje = payload;
        const todosChannel = updateTripFirestore(viaje);
        yield takeEvery(todosChannel, function*() {
            // TODO revisar lo que recibe esta funcion
            yield put(tripEnded());
            yield put(tripCleanStore());
        });
        yield take('UNWATCH-TODOS');
        todosChannel.close();
    } catch (error) {
        yield put(tripEndFail());
    }
}


function* loadTrip({payload}) {
    try {
        const {id_pasajero} = payload;
        const todosChannel = loadTripFirestore(id_pasajero);
        yield takeEvery(todosChannel, function*(action) {
            yield put(tripLoaded({viajes: action.data}));
        });
        yield take('UNWATCH-TODOS');
        todosChannel.close();
    } catch (error) {
        yield put(tripLoadFailed());
    }

}

function* loadCurrencyTrip({payload}) {
    try {
        const id_pasajero = payload;
        const todosChannel = loadTripCurrencyFirestore(id_pasajero);
        yield takeEvery(todosChannel, function*(action) {
            yield put(tripCurrencyLoaded({viajeActual: action.data[0]}));
        });
        yield take('UNWATCH-TODOS');
        todosChannel.close();
    } catch (error) {
        yield put(tripCurrencyLoadFailed());
        console.log("error de saga");
    }
}

export function* triggerUpdateTrip() {
    yield takeEvery(TRIP_UPDATE, updateTrip);
}

export function* triggerLoadTrip() {
    yield takeEvery(TRIP_LOAD, loadTrip);
}

export function* triggerLoadCurrencyTrip() {
    yield takeEvery(TRIP_CURRENCY_LOAD, loadCurrencyTrip);
}

export function* triggerEndCurrencyTrip() {
    yield takeEvery(TRIP_FINISH, endTrip);
}

// permite agregar las funciones de este archivo al sagas root
export default function* rootSaga() {
    yield all([fork(triggerUpdateTrip), fork(triggerLoadTrip), fork(triggerLoadCurrencyTrip), fork(triggerEndCurrencyTrip)]);
}
