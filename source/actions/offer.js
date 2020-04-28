import {
    OFFERS_CLEAN,
    OFFERS_LOAD,
    OFFERS_LOAD_FAILED,
    OFFERS_LOADED
} from "../redux/actionTypes";

export const offerCleanStore = () => {return {type: OFFERS_CLEAN}};
export const offersLoad = () => {return {type: OFFERS_LOAD}};
export const offersLoaded = (offers) => {return {type: OFFERS_LOADED, payload: offers}};
export const offersLoadFail = () => {return {type: OFFERS_LOAD_FAILED}};
