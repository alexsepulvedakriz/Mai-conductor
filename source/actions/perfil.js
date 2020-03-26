import {
    PERFIL_LOANDING, PERFIL_UPDATED,
    PERFIL_LOANDING_FAILED, PERFIL_UPDATING, PERFIL_LOADED
} from '../redux/actionTypes';

export const getPerfil = (idPasajero) => {
    return {
        type: PERFIL_LOANDING,
        payload: idPasajero
    };
};
export const gotPerfil = (info) => {
    return {
        type: PERFIL_LOADED,
        payload: info
    };
};
export const failedGetPerfil = () => {
    return {
        type: PERFIL_LOANDING_FAILED,
        payload: true
    };
};
export const updatePerfil = (user) => {
    return {
        type: PERFIL_UPDATING,
        payload: user
    };
};
export const updatedPerfil = () => {
    return {
        type: PERFIL_UPDATED
    };
};
export const failedUpdatePerfil = () => {
    return {
        type: PERFIL_LOANDING_FAILED,
        payload: true
    };
};
