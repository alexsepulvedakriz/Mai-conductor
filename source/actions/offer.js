import {
    OFERTAS_ADD,
    OFERTAS_ADDED,
    OFERTAS_ADD_FAILED,
    OFERTAS_UPDATE,
    OFERTAS_UPDATED,
    OFERTAS_UPDATE_FAILED,
    OFERTAS_CLEAN, OFERTAS_CANCEL, OFERTAS_CANCEL_FAILED, OFERTAS_CANCELED
} from "../redux/actionTypes";

export const offerAdd = (offer) => {return {type: OFERTAS_ADD, payload: offer}};
export const offerAdded = () => {return {type: OFERTAS_ADDED}};
export const offerAddFailed = () => {return {type: OFERTAS_ADD_FAILED}};
export const offerUpdate = (offer) => {return {type: OFERTAS_UPDATE, payload: offer}};
export const offerUpdated = (offer) => {return {type: OFERTAS_UPDATED, payload: offer }};
export const offerUpdateFailed = () => {return {type: OFERTAS_UPDATE_FAILED}};
export const offerCancel = (info) => {return {type: OFERTAS_CANCEL, payload: info}};
export const offerCanceled = () => {return {type: OFERTAS_CANCELED}};
export const offerCancelFailed = () => {return {type: OFERTAS_CANCEL_FAILED}};
export const offerCleanStore = () => {return {type: OFERTAS_CLEAN}};
