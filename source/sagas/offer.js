import {all, fork, put, takeEvery, take, call} from "redux-saga/effects";
import {firestore, storage} from "../firebase/firebase";
import { eventChannel} from 'redux-saga';
import {OFFERS_LOAD, OFFERS_STOP_LISTEN_lOAD} from "../redux/actionTypes";
import {offersLoaded, offersLoadFail} from "../actions/offer";


const loadOffersFirestore  = (id_driver) => eventChannel(emitter => {
    const unsubscribe = firestore.collection('drivers/' + id_driver + '/offers').onSnapshot(snapshot => {
        const offers = [];
        snapshot.forEach((change) => {
            offers.push({...change.data(), id_offer: change.id, id_driver: id_driver});
        });
        emitter({
            data: offers
        })
    });
    return () => unsubscribe();
});

function* loadOffers({payload}) {
    try {
        const {id_driver} = payload;
        const loadChannel = loadOffersFirestore(id_driver);
        yield takeEvery(loadChannel, function*(action) {
            yield put(offersLoaded({offers: action.data}));
        });
        yield take(OFFERS_STOP_LISTEN_lOAD);
        loadChannel.close();
    } catch (error) {
        yield put(offersLoadFail());
    }
}

export function* triggerLoadOffers() {
    yield takeEvery(OFFERS_LOAD, loadOffers);
}

export default function* rootSaga() {
    yield all([fork(triggerLoadOffers)]);
}
