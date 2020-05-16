import {
    ABOUT_CLEAN,
    ABOUT_LOAD,
    ABOUT_LOAD_FAILED,
    ABOUT_LOADED
} from '../redux/actionTypes';

export const aboutLoad = (idPasajero) => {return {type: ABOUT_LOAD, payload: idPasajero}};
export const aboutLoaded = (info) => {return {type: ABOUT_LOADED, payload: info}};
export const aboutLoadFail = () => {return {type: ABOUT_LOAD_FAILED}};
export const aboutCleanStore = () => {return {type: ABOUT_CLEAN}};
