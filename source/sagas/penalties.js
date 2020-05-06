import {all, fork, put, takeEvery, take, call} from "redux-saga/effects";
import {firestore, storage} from "../firebase/firebase";
import { eventChannel} from 'redux-saga';
import {PENALTIES_LOAD, PENALTIES_STOP_LISTEN_LOAD} from "../redux/actionTypes";
import {penaltiesLoaded, penaltiesLoadFail} from "../actions/penalties";


const loadPenaltiesFirestore  = (id_driver) => eventChannel(emitter => {
    const unsubscribe = firestore.collection('drivers/' + id_driver + '/penalties').onSnapshot(snapshot => {
        const Penalties = [];
        snapshot.forEach((change) => {
            Penalties.push({...change.data(), id_offer: change.id, id_driver: id_driver});
        });
        emitter({
            data: Penalties
        })
    });
    return () => unsubscribe();
});

function* loadPenalties({payload}) {
    try {
        const loadChannel = loadPenaltiesFirestore(payload);
        yield takeEvery(loadChannel, function*(action) {
            yield put(penaltiesLoaded(action.data));
        });
        yield take(PENALTIES_STOP_LISTEN_LOAD);
        loadChannel.close();
    } catch (error) {
        yield put(penaltiesLoadFail());
    }
}

export function* triggerLoadPenalties() {
    yield takeEvery(PENALTIES_LOAD, loadPenalties);
}

export default function* rootSaga() {
    yield all([fork(triggerLoadPenalties)]);
}
