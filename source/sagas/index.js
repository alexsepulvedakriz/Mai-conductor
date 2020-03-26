import {all} from 'redux-saga/effects';
import authSagas from './auth';
import profileSagas from './perfil'

export default function* rootSaga(getState) {
    yield all([
        authSagas(),
        profileSagas()
    ]);
}
