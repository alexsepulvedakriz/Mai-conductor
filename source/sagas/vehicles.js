import {all, fork, put, takeEvery, take, call} from "redux-saga/effects";
import {firestore, storage} from "../firebase/firebase";
import { eventChannel} from 'redux-saga';
import {VEHICLES_ADD, VEHICLES_LOAD, VEHICLES_STOP_LISTEN_lOAD,} from "../redux/actionTypes";
import {vehiclesAdded, vehiclesAddFail, vehiclesLoaded, vehiclesLoadFail} from "../actions/vehicles";
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
}

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
    let id_base= yield call(generateUIDD);
    const new_vehicle = {
        id_driver: payload.id_driver,
        licence_plate: payload.licence_plate,
        year: payload.year,
        type: payload.type,
        car_make: payload.car_make,
        model: payload.model,
        ref_vehicle_roll: 'drivers/' + payload.id_driver + '/'+ 'vehicle_roll-' + id_base,
        ref_annotation_certificate: 'drivers/' + payload.id_driver + '/'+ 'annotation_certificate-' + id_base,
        ref_photo_authorization: 'drivers/' + payload.id_driver + '/'+ 'photo_authorization-' + id_base,
        ref_photo_vehicle: 'drivers/' + payload.id_driver + '/'+ 'photo_vehicle-' + id_base,
        ref_permission_to_circulate: 'drivers/' + payload.id_driver + '/'+ 'permission_to_circulate-' + id_base,
    };
    try {
        yield call(uploadFileUserWithStorage, payload.vehicle_roll, 'drivers/' + payload.id_driver + '/'+'vehicle_roll' + id_base);
        yield call(uploadFileUserWithStorage, payload.annotation_certificate, 'drivers/' + payload.id_driver + '/'+ 'annotation_certificate' + id_base);
        yield call(uploadFileUserWithStorage, payload.photo_authorization, 'drivers/' + payload.id_driver + '/'+ 'photo_authorization' + id_base);
        yield call(uploadFileUserWithStorage, payload.photo_vehicle, 'drivers/' + payload.id_driver + '/'+ 'photo_vehicle' + id_base);
        yield call(uploadFileUserWithStorage, payload.permission_to_circulate, 'drivers/' + payload.id_driver + '/'+ 'permission_to_circulate' + id_base);
        const addChannel = setVehicleFirestore(new_vehicle);
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
