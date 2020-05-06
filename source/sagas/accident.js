import {all, fork, put, takeEvery, take, call} from "redux-saga/effects";
import {firestore, storage} from "../firebase/firebase";
import { eventChannel} from 'redux-saga';
import {ACCIDENT_ADD} from "../redux/actionTypes";
import {accidentAdded, accidentAddFail} from "../actions/accident";
import {generateUIDD} from "../functions/others";

const uploadFileAccidentWithStorage = async (file, id) => {
    if(file) {
        const ref = storage.ref().child("files/accident/" + id);
        await ref.put(file)
            .then(function() {
                console.log("File suben!");
            })
            .catch(function(error) {
                console.error("Error upload file: ", error);
            });
    }    else {
        console.log('error de carga: foto de accidente');
    }
};


const setOfferFirestore  = (accident, id_accident) => eventChannel(emitter => {
    firestore.collection('accidents/').doc(id_accident).set(accident)
        .then(_=> {emitter({
            data: {cambiado: true}})})
    console.log('cambiado')
        .catch( error => {
            console.log(error);
            emitter({
                data: {cambiado: false}})});
    return () => unsubscribe();
});

function* addAccident({payload}) {
    let id_base= yield call(generateUIDD);
    try {
        yield call(uploadFileAccidentWithStorage, payload.photo, 'ref_photo' + id_base);
        const accident = {
            id_driver: payload.id_driver,
            id_trip: payload.id_trip,
            ref_photo: 'ref_photo_receiver' + id_base,
            description: payload.description,
            date: new Date(),
        };
        const addChannel = setOfferFirestore(accident, payload.ref_accident);
        yield takeEvery(addChannel, function*() {
            yield put(accidentAdded());
        });
        addChannel.close();
    } catch (error) {
        yield put(accidentAddFail());
    }
}


export function* triggerAddAccident() {
    yield takeEvery(ACCIDENT_ADD, addAccident);
}
export default function* rootSaga() {
    yield all([fork(triggerAddAccident)]);
}
