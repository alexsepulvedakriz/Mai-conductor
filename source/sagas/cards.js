import { all, fork, put, takeEvery, take, call} from "redux-saga/effects";
import { firestore} from "../firebase/firebase";
import { eventChannel} from 'redux-saga';
import {CARD_ADD, CARD_DELETE, CARD_LOAD} from "../redux/actionTypes";
import {CardAdded, CardLoaded, CardDeleted, CardAddFail, CardDeleteFail, CardLoadFail} from "../actions/card";

const addCardFirestore  = (card) => eventChannel(emitter => {
    const { id_pasajero} = card;
    firestore.collection('pasajeros/' + id_pasajero + '/cards').doc(id_pasajero).set(card)
        .then(_=> {emitter({
            data: {cambiado: true}})})
        .catch( error => {
            console.log(error);
            emitter({
                data: {cambiado: false}})});
    return () => unsubscribe();
});

const deleteCardFirestore  = (card) => eventChannel(emitter => {
    const { id_pasajero, id_card} = card;
    firestore.collection('pasajeros/' + id_pasajero + '/cards').doc(id_card).delete()
        .then(_=> {emitter({
            data: {cambiado: true}})})
        .catch( error => {
            console.log(error);
            emitter({
                data: {cambiado: false}})});
    return () => unsubscribe();
});

const loadCardFirestore  = (id_pasajero) => eventChannel(emitter => {
    const unsubscribe = firestore.collection('pasajeros/' + id_pasajero + '/cards').onSnapshot(snapshot => {
        const cards = [];
        snapshot.forEach((change) => {
            cards.push({...change.data(), id_card: change.id, id_pasajero: id_pasajero});
        });
        emitter({
            data: cards
        })
    });
    return () => unsubscribe();
});

function* addCard({payload}) {
    try {
        const todosChannel = addCardFirestore(payload);
        yield takeEvery(todosChannel, function*() {
            yield put(CardAdded());
        });
        yield take('UNWATCH-TODOS');
        todosChannel.close();
    } catch (error) {
        yield put(CardAddFail());
    }
}

function* deleteCard({payload}) {
    try {
        const todosChannel = deleteCardFirestore(payload);
        yield takeEvery(todosChannel, function*() {
            yield put(CardDeleted());
        });
        yield take('UNWATCH-TODOS');
        todosChannel.close();
    } catch (error) {
        yield put(CardDeleteFail());
    }
}

function* loadCard({payload}) {
    try {
        const todosChannel = loadCardFirestore(payload);
        yield takeEvery(todosChannel, function*(action) {
            yield put(CardLoaded({cards: action.data}));
        });
        yield take('UNWATCH-TODOS');
        todosChannel.close();
    } catch (error) {
        yield put(CardLoadFail());
    }
}




export function* triggerAddCard() {
    yield takeEvery(CARD_ADD, addCard);
}

export function* triggerDeleteCard() {
    yield takeEvery(CARD_DELETE, deleteCard);
}

export function* triggerLoadCard() {
    yield takeEvery(CARD_LOAD, loadCard);
}

export default function* rootSaga() {
    yield all([fork(triggerAddCard), fork((triggerDeleteCard)), fork(triggerLoadCard)]);
}
