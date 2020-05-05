import {all, fork, put, takeEvery, take, call} from "redux-saga/effects";
import {firestore, storage} from "../firebase/firebase";
import { eventChannel} from 'redux-saga';
import {TRIP_CURRENCY_LOAD, TRIP_FINISH, TRIP_LOAD, TRIP_UPDATE, TRIP_CURRENCY_STOP_LISTEN_LOAD, TRIP_STOP_LISTEN_LOAD} from "../redux/actionTypes";
import {tripLoaded, tripLoadFailed, tripUpdated, tripUpdateFailed, tripCurrencyLoaded, tripCurrencyLoadFailed, tripCleanStore, tripFinishFail, tripFinished} from "../actions/trip";
import * as Random from 'expo-random';

const generateUIDD = async () => {
    const randomBytes = await Random.getRandomBytesAsync(8);
    /* Some crypto operation... */
    let id = 'file';
    randomBytes.map( number => {
        id = id + '-' + number;
    });
    return id;
};

const uploadFileUserWithStorage = async (file, id) => {
    if(file) {
        const ref = storage.ref().child("files/trips/" + id);
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
        const { id_driver, id_trip} = Trip;
        firestore.collection('drivers/' + id_driver + '/trips').doc(id_trip).update(Trip)
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
        yield call(uploadFileUserWithStorage, payload.ref_photo_receiver, 'ref_photo_receiver' + id_base);
        yield call(uploadFileUserWithStorage, payload.ref_photo_package, 'ref_photo_package' + id_base);
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
