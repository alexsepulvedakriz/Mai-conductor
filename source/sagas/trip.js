import {all, fork, put, takeEvery, take, call} from "redux-saga/effects";
import {firestore, storage} from "../firebase/firebase";
import { eventChannel} from 'redux-saga';
import {
    TRIP_CURRENCY_LOAD,
    TRIP_FINISH,
    TRIP_LOAD,
    TRIP_UPDATE,
    TRIP_CURRENCY_STOP_LISTEN_LOAD,
    TRIP_STOP_LISTEN_LOAD,
    TRIP_CANCEL
} from "../redux/actionTypes";
import {tripLoaded, tripLoadFailed, tripUpdated, tripUpdateFailed, tripCurrencyLoaded, tripCurrencyLoadFailed, tripCleanStore, tripFinishFail, tripFinished, tripCanceled, tripCancelFail} from "../actions/trip";
import {generateUIDD} from "../functions/others";

const uploadFileUserWithStorage = async (file, ref) => {
    if(file) {
        const ref = storage.ref().child(ref);
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
};
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

const loadPathTripCurrencyFirestore  = (id_driver) => eventChannel(emitter => {
    const unsubscribe = firestore.collection('drivers/' + id_driver + '/trip').onSnapshot(snapshot => {
        const trips = [];
        snapshot.forEach((change) => {
            trips.push({...change.data()});
        });
        emitter({
            data: trips
        })
    });
    return () => unsubscribe();
});

const loadTripCurrencyFirestore  = (id_trip) => eventChannel(emitter => {
    const unsubscribe = firestore.collection('trips/').where('id_trip', '==', id_trip ).onSnapshot(snapshot => {
        const trips = [];
        snapshot.forEach((change) => {
            trips.push({...change.data(), id_trip: change.id});
        });
        emitter({
            data: trips
        })
    });
    return () => unsubscribe();
});

const updateTripFirestore  = (Trip) => eventChannel(emitter => {
        const { id_trip} = Trip;
        firestore.collection('trips').doc(id_trip).update(Trip)
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
    let id_base= yield call(generateUIDD);
    try {
        yield call(uploadFileUserWithStorage, payload.photo_receiver, 'trips/'+ payload.id_driver + '/ref_photo_receiver' + id_base);
        yield call(uploadFileUserWithStorage, payload.photo_package, 'trips/'+ payload.id_driver + '/ref_photo_package' + id_base);
        const trip = {
            id_driver: payload.id_driver,
            id_trip: payload.id_trip,
            observation_driver: payload.observation_driver,
            ref_photo_receiver: 'trips/'+ payload.id_driver + '/ref_photo_receiver' + id_base,
            ref_photo_package: 'trips/'+ payload.id_driver + '/ref_photo_package' + id_base,
            active: false,
            cancel: false,
            on_rute: false,
            evaluate: false
        }
        const finishChannel = updateTripFirestore(trip);
        yield takeEvery(finishChannel, function*() {
            yield put(tripFinished());
            yield put(tripCleanStore());
        });
        finishChannel.close();
    } catch (error) {
        yield put(tripFinishFail());
    }
}

function* cancelTrip({payload}) {
    try {
        const finishChannel = updateTripFirestore(payload);
        yield takeEvery(finishChannel, function*() {
            yield put(tripCanceled());
            yield put(tripCleanStore());
        });
        finishChannel.close();
    } catch (error) {
        yield put(tripCancelFail());
    }
}


function* loadTrip({payload}) {
    try {
        const todosChannel = loadTripFirestore(payload);
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
        const pathChannel = loadPathTripCurrencyFirestore(id_driver);
        yield takeEvery(pathChannel, function*(action) {
            const tripChannel = loadTripCurrencyFirestore(action.data[0].id_trip);
                yield takeEvery(tripChannel, function*(trip) {

                    yield put(tripCurrencyLoaded({currencyTrip: trip.data[0]}));
                })
        });
        yield take(TRIP_CURRENCY_STOP_LISTEN_LOAD);
        pathChannel.close();
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

export function* triggerCancelCurrencyTrip() {
    yield takeEvery(TRIP_CANCEL, cancelTrip);
}

export default function* rootSaga() {
    yield all([fork(triggerUpdateTrip), fork(triggerLoadTrip), fork(triggerLoadCurrencyTrip), fork(triggerEndCurrencyTrip), fork(triggerCancelCurrencyTrip)]);
}
