import {all} from 'redux-saga/effects';
import authSagas from './auth';
import profileSagas from './profile';
import offerSagas from './offer';
import offerDriverSagas from './offer-driver';
import tripSagas from './trip';
import aboutSagas from './about';
import accidentSagas from './accident';
import penaltiesSagas from './penalties';
import vehiclesSagas from './vehicles'

export default function* rootSaga(getState) {
    yield all([
        authSagas(),
        profileSagas(),
        offerSagas(),
        offerDriverSagas(),
        tripSagas(),
        aboutSagas(),
        accidentSagas(),
        penaltiesSagas(),
        vehiclesSagas()
    ]);
}
