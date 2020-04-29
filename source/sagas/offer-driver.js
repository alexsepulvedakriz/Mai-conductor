import {all, fork, put, takeEvery, take} from "redux-saga/effects";
import { firestore } from "../firebase/firebase";
import { eventChannel} from 'redux-saga';
import { OFFER_DRIVER_ADD} from "../redux/actionTypes";
import {offerDriverAdded, offerDriverAddFail} from "../actions/offer_driver";


const setOfferFirestore  = (offer_driver) => eventChannel(emitter => {
    const { id_driver: id_driver} = offer_driver;
    firestore.collection('drivers/' + id_driver + '/offers-drivers').doc(id_driver).set(offer_driver)
        .then(_=> {emitter({
            data: {cambiado: true}})})
        .catch( error => {
            console.log(error);
            emitter({
                data: {cambiado: false}})});
    return () => unsubscribe();
});

function* addOfferDriver({payload}) {
    try {
        const addChannel = setOfferFirestore(payload);
        yield takeEvery(addChannel, function*() {
            yield put(offerDriverAdded());
        });
        addChannel.close();
    } catch (error) {
        yield put(offerDriverAddFail());
    }
}


export function* triggerAddOfferDriver() {
    yield takeEvery(OFFER_DRIVER_ADD, addOfferDriver);
}
export default function* rootSaga() {
    yield all([fork(addOfferDriver)]);
}
