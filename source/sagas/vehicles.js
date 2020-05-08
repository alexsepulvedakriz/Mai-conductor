import {all, fork, put, takeEvery, take, call} from "redux-saga/effects";
import {firestore, storage} from "../firebase/firebase";
import { eventChannel} from 'redux-saga';
import {VEHICLES_ADD, VEHICLES_LOAD, VEHICLES_STOP_LISTEN_lOAD,} from "../redux/actionTypes";
import {vehiclesAdded, vehiclesAddFail, vehiclesLoaded, vehiclesLoadFail} from "../actions/vehicles";

const setVehicleFirestore  = (Vehicle_driver) => eventChannel(emitter => {
    const { id_driver } = Vehicle_driver;
    firestore.collection('drivers/' + id_driver + '/vehicles').doc().set(Vehicle_driver)
        .then(_=> {emitter({
            data: {cambiado: true}})})
    console.log('cambiado')
        .catch( error => {
            console.log(error);
            emitter({
                data: {cambiado: false}})});
    return () => unsubscribe();
});


const loadVehiclesFirestore  = (id_driver) => eventChannel(emitter => {
    const unsubscribe = firestore.collection('drivers/' + id_driver + '/vehicles').onSnapshot(snapshot => {
        const Vehicles = [];
        snapshot.forEach((change) => {
            Vehicles.push({...change.data(), id_Vehicle: change.id, id_driver: id_driver});
        });
        emitter({
            data: Vehicles
        })
    });
    return () => unsubscribe();
});

function* loadVehicles({payload}) {
    try {
        const loadChannel = loadVehiclesFirestore(payload);
        yield takeEvery(loadChannel, function*(action) {
            yield put(vehiclesLoaded(action.data));
        });
        yield take(VEHICLES_STOP_LISTEN_lOAD);
        loadChannel.close();
    } catch (error) {
        yield put(vehiclesLoadFail());
    }
}

function* addVehicle({payload}) {
    try {
        const addChannel = setVehicleFirestore(payload);
        yield takeEvery(addChannel, function*() {
            yield put(vehiclesAdded());
        });
        addChannel.close();
    } catch (error) {
        yield put(vehiclesAddFail());
    }
}


export function* triggerAddVehicle() {
    yield takeEvery(VEHICLES_ADD, addVehicle);
}

export function* triggerLoadVehicles() {
    yield takeEvery(VEHICLES_LOAD, loadVehicles);
}

export default function* rootSaga() {
    yield all([fork(triggerLoadVehicles), fork((triggerAddVehicle))]);
}
