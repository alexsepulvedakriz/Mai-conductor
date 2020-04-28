import {all, fork, put, takeEvery, take, call} from "redux-saga/effects";
import {firestore, storage} from "../firebase/firebase";
import { eventChannel} from 'redux-saga';


// permite agregar las funciones de este archivo al sagas root
export default function* rootSaga() {
    yield all([]);
}
