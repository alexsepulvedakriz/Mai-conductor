import {
    OFFER_DRIVER_CLEAN,
    OFFER_DRIVER_ADD,
    OFFER_DRIVER_ADDED,
    OFFER_DRIVER_ADD_FAIL,
    OFFER_DRIVER_UPDATE,
    OFFER_DRIVER_UPDATE_FAIL,
    OFFER_DRIVER_UPDATED,
} from "../redux/actionTypes";

export const offersDriverCleanStore = () => {return {type: OFFER_DRIVER_CLEAN}};
export const offerDriverAdd = (offer) => {return {type: OFFER_DRIVER_ADD, payload: offer}};
export const offerDriverAdded = () => {return {type: OFFER_DRIVER_ADDED}};
export const offerDriverAddFail = () => {return {type: OFFER_DRIVER_ADD_FAIL}};
export const offerDriverUpdate = (offer) => {return {type: OFFER_DRIVER_UPDATE, payload: offer}};
export const offerDriverUpdated = () => {return {type: OFFER_DRIVER_UPDATED}};
export const offerDriverUpdateFail = () => {return {type: OFFER_DRIVER_UPDATE_FAIL}};

