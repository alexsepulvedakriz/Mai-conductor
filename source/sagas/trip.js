import {all, fork, put, takeEvery, take} from "redux-saga/effects";
import { firestore } from "../firebase/firebase";
import { eventChannel} from 'redux-saga';
import {TRIP_CURRENCY_LOAD, TRIP_FINISH, TRIP_LOAD, TRIP_UPDATE, TRIP_CURRENCY_STOP_LISTEN_LOAD, TRIP_STOP_LISTEN_LOAD} from "../redux/actionTypes";
import {tripLoaded, tripLoadFailed, tripUpdated, tripUpdateFailed, tripCurrencyLoaded, tripCurrencyLoadFailed, tripCleanStore, tripFinishFail, tripFinished} from "../actions/trip";

const loadTripFirestore  = (id_driver) => eventChannel(emitter => {
        const unsubscribe = firestore.collection('drivers/' + id_driver + '/trips').onSnapshot(snapshot => {
            const trips = [];
            snapshot.forEach((change) => {
                trips.push({...change.data(), id_trip: change.id, id_driver: id_driver});
            });
            emitter({
                data: trips
            })
        });
        return () => unsubscribe();
    });

const loadTripCurrencyFirestore  = (id_driver) => eventChannel(emitter => {
    const unsubscribe = firestore.collection('drivers/' + id_driver + '/trips').where('active' ,'==', true).onSnapshot(snapshot => {
        const trips = [];
        snapshot.forEach((change) => {
            trips.push({...change.data(), id_trip: change.id, id_driver: id_driver});
        });
        emitter({
            data: trips
        })
    });
    return () => unsubscribe();
});

const updateTripFirestore  = (Trip) => eventChannel(emitter => {
        const { id_driver, id_viaje} = Trip;
        firestore.collection('drivers/' + id_driver + '/trips').doc(id_viaje).update(Trip)
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
        const updateChannel = updateTripFirestore(payload);
        yield takeEvery(updateChannel, function*() {
            yield put(tripUpdated());
        });
        updateChannel.close();
    } catch (error) {
        yield put(tripUpdateFailed());
    }
}

function* finishTrip({payload}) {
    try {
        const finishChannel = updateTripFirestore(payload);
        yield takeEvery(finishChannel, function*() {
            yield put(tripFinished());
            yield put(tripCleanStore());
        });
        finishChannel.close();
    } catch (error) {
        yield put(tripFinishFail());
    }
}


function* loadTrip({payload}) {
    try {
        const {id_driver} = payload;
        const todosChannel = loadTripFirestore(id_driver);
        yield takeEvery(todosChannel, function*(action) {
            yield put(tripLoaded({trips: action.data}));
        });
        yield take(TRIP_STOP_LISTEN_LOAD);
        todosChannel.close();
    } catch (error) {
        yield put(tripLoadFailed());
    }

}

function* loadCurrencyTrip({payload}) {
    try {
        const id_driver = payload;
        const todosChannel = loadTripCurrencyFirestore(id_driver);
        yield takeEvery(todosChannel, function*(action) {
            yield put(tripCurrencyLoaded({currencyTrip: action.data[0]}));
        });
        yield take(TRIP_CURRENCY_STOP_LISTEN_LOAD);
        todosChannel.close();
    } catch (error) {
        yield put(tripCurrencyLoadFailed());
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
    yield takeEvery(TRIP_FINISH, finishTrip);
}

export default function* rootSaga() {
    yield all([fork(triggerUpdateTrip), fork(triggerLoadTrip), fork(triggerLoadCurrencyTrip), fork(triggerEndCurrencyTrip)]);
}
