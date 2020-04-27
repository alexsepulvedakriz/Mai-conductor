import {
    CONTRAOFERTAS_LOAD,
    CONTRAOFERTAS_LOADED,
    CONTRAOFERTAS_LOAD_FAILED,
    CONTRAOFERTAS_DECLINE,
    CONTRAOFERTAS_DECLINED,
    CONTRAOFERTAS_DECLINE_FAILED,
    CONTRAOFERTAS_ACCEPT,
    CONTRAOFERTAS_ACCEPTED,
    CONTRAOFERTAS_ACCEPT_FAILED,
    CONTRAOFERTAS_CLEAN, CONTRAOFERTAS_STOP_LOAD
} from "../redux/actionTypes";

export const offerDriverLoad = (id_pasajero) => {return {type: CONTRAOFERTAS_LOAD, payload: id_pasajero}};
export const offerDriverLoaded = (contra_ofertas) => {return {type: CONTRAOFERTAS_LOADED, payload: contra_ofertas}};
export const offerDriverLoadFailed = () => {return {type: CONTRAOFERTAS_LOAD_FAILED}};
export const offerDriverDecline = (contra_oferta) => {return {type: CONTRAOFERTAS_DECLINE, payload: contra_oferta}};
export const offerDriverDeclined = () => {return {type: CONTRAOFERTAS_DECLINED}};
export const offerDriverDeclineFailed = () => {return {type: CONTRAOFERTAS_DECLINE_FAILED}};
export const offerDriverAccept = (contra_oferta) => {return {type: CONTRAOFERTAS_ACCEPT, payload: contra_oferta}};
export const offerDriverAccepted = () => {return {type: CONTRAOFERTAS_ACCEPTED}};
export const offerDriverAcceptFailed = () => {return {type: CONTRAOFERTAS_ACCEPT_FAILED}};
export const offerDriverCleanStore = () => {return {type: CONTRAOFERTAS_CLEAN}};
export const offerDriverStopLoad = () => {return {type: CONTRAOFERTAS_STOP_LOAD}};
