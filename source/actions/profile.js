import {
    PERFIL_LOAD,
    PERFIL_UPDATED,
    PERFIL_LOAD_FAILED,
    PERFIL_UPDATE,
    PERFIL_LOADED,
    PERFIL_CLEAN
} from '../redux/actionTypes';

export const profileLoad = (idPasajero) => {return {type: PERFIL_LOAD, payload: idPasajero}};
export const profileLoaded = (info) => {return {type: PERFIL_LOADED, payload: info}};
export const profileLoadFail = () => {return {type: PERFIL_LOAD_FAILED, payload: true}};
export const profileUpdate = (user) => {return {type: PERFIL_UPDATE, payload: user}};
export const profileUpdated = () => {return {type: PERFIL_UPDATED}};
export const profileUpdateFail = () => {return {type: PERFIL_LOAD_FAILED, payload: true}};
export const profileCleanStore = () => {return {type: PERFIL_CLEAN}};
