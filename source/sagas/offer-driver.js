import {all, fork, put, takeEvery, take} from "redux-saga/effects";
import { firestore } from "../firebase/firebase";
import { eventChannel} from 'redux-saga';

// permite agregar las funciones de este archivo al sagas root
export default function* rootSaga() {
    yield all([]);
}
