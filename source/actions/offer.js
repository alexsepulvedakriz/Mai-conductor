import {
    OFFERS_CLEAN,
    OFFERS_LOAD,
    OFFERS_LOAD_FAILED,
    OFFERS_LOADED
} from "../redux/actionTypes";

export const offerCleanStore = () => {return {type: OFFERS_CLEAN}};
export const offersLoad = (id_driver) => {return {type: OFFERS_LOAD, payload: id_driver}};
export const offersLoaded = (offers) => {return {type: OFFERS_LOADED, payload: offers}};
export const offersLoadFail = () => {return {type: OFFERS_LOAD_FAILED}};
