import { all, fork, put, takeEvery, take, call} from "redux-saga/effects";
import { firestore} from "../firebase/firebase";
import { eventChannel} from 'redux-saga';
import {POSITION_ADD} from "../redux/actionTypes";
import {positionAdded, positionAddFail} from "../actions/position";

const addPositionFirestore  = (position) => eventChannel(emitter => {
    const { id_driver} = position;
    firestore.collection('drivers/' + id_driver + '/position').doc(id_driver).set(position)
        .then(_=> {emitter({
            data: {cambiado: true}})})
        .catch( error => {
            console.log(error);
            emitter({
                data: {cambiado: false}})});
    return () => unsubscribe();
});

function* addPosition({payload}) {
    try {
        const todosChannel = addPositionFirestore(payload);
        yield takeEvery(todosChannel, function*() {
            yield put(positionAdded());
        });
        yield take('UNWATCH-TODOS');
        todosChannel.close();
    } catch (error) {
        yield put(positionAddFail());
    }
}



export function* triggerAddPosition() {
    yield takeEvery(POSITION_ADD,addPosition);
}

export default function* rootSaga() {
    yield all([fork(triggerAddPosition)]);
}
