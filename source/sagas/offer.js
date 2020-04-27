import {all, fork, put, takeEvery, take, call} from "redux-saga/effects";
import {firestore, storage} from "../firebase/firebase";
import { eventChannel} from 'redux-saga';
import {OFERTAS_ADD, OFERTAS_CANCEL} from "../redux/actionTypes";
import {offerAdded, offerAddFailed, offerCanceled, offerCancelFailed} from "../actions/offer";
import {offerDriverLoad} from "../actions/offer_driver";
import * as Random from 'expo-random';

const generateUIDD = async () => {
    const randomBytes = await Random.getRandomBytesAsync(8);
    /* Some crypto operation... */
    let id = 'photo';
    randomBytes.map( number => {
        id = id + '-' + number;
    });
    return id;
};

const uploadPhotoOfferWithStorage = async (informacion, id) => {
    const {foto, id_pasajero} = informacion;
    if(foto) {
        const ref = storage.ref().child("images/offer/" + id_pasajero+ '/' + id);
        await ref.put(foto)
            .then(function() {
                console.log("Photo successfully uploaded!");
            })
            .catch(function(error) {
                console.error("Error upload photo: ", error);
            });
    }    else {
        console.log('error de carga: foto carga');
    }
}

const setOfferFirestore  = (offer) => eventChannel(emitter => {
        // todo puede que genere un problema al actualizar
        delete offer.foto;
        const { id_pasajero} = offer;
        firestore.collection('pasajeros/' + id_pasajero + '/ofertas').doc(id_pasajero).set(offer)
            .then(_=> {emitter({
                data: {cambiado: true}})})
            .catch( error => {
                console.log(error);
                emitter({
                    data: {cambiado: false}})});
        return () => unsubscribe();
    });

const updateOfferFirestore  = (offer) => eventChannel(emitter => {
    // todo puede que genere un problema al actualizar
    const { id_pasajero} = offer;
    firestore.collection('pasajeros/' + id_pasajero + '/ofertas').doc(id_pasajero).update(offer)
        .then(_=> {emitter({
            data: {cambiado: true}})})
        .catch( error => {
            console.log(error);
            emitter({
                data: {cambiado: false}})});
    return () => unsubscribe();
});

function* setOffer({payload}) {
    try {
        let idPhoto= yield call(generateUIDD);
        const oferta = {...payload, id_photo: idPhoto};
        const ofertaCopia = Object.assign({}, oferta);
        const { id_pasajero} = oferta;
        const todosChannel = setOfferFirestore(ofertaCopia);
        yield takeEvery(todosChannel, function*() {
            yield put(offerAdded());
            yield put(offerDriverLoad(id_pasajero))
        });
        yield call(uploadPhotoOfferWithStorage, payload, idPhoto);
        yield take('UNWATCH-TODOS');
        todosChannel.close();
    } catch (error) {
        yield put(offerAddFailed());
    }
}

function* cancelOffer({payload}) {
    try {
        const oferta = {...payload};
        const todosChannel = updateOfferFirestore(oferta);
        yield takeEvery(todosChannel, function*() {
            yield put(offerCanceled());
        });
        yield take('UNWATCH-TODOS');
        todosChannel.close();
    } catch (error) {
        yield put(offerCancelFailed())
    }
}


export function* triggerAddOffer() {
    yield takeEvery(OFERTAS_ADD, setOffer);
}

export function* triggerCancelOffer() {
    yield takeEvery(OFERTAS_CANCEL, cancelOffer);
}

// permite agregar las funciones de este archivo al sagas root
export default function* rootSaga() {
    yield all([fork(triggerAddOffer), fork((triggerCancelOffer))]);
}
