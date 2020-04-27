import {all} from 'redux-saga/effects';
import authSagas from './auth';
import profileSagas from './profile';
import offerSagas from './offer';
import offerDriverSagas from './offer-driver';
import tripSagas from './trip';
import aboutSagas from './about';
import cardsSagas from './cards';

export default function* rootSaga(getState) {
    yield all([
        authSagas(),
        profileSagas(),
        offerSagas(),
        offerDriverSagas(),
        tripSagas(),
        aboutSagas(),
        cardsSagas()
    ]);
}
