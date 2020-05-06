import {
    PENALTIES_CLEAN,
    PENALTIES_LOAD,
    PENALTIES_LOAD_FAIL,
    PENALTIES_LOADED
} from "../redux/actionTypes";

export const penaltiesCleanStore = () => {return {type: PENALTIES_CLEAN}};
export const penaltiesLoad = (id_driver) => {return {type: PENALTIES_LOAD, payload: id_driver}};
export const penaltiesLoaded = (offers) => {return {type: PENALTIES_LOADED, payload: offers}};
export const penaltiesLoadFail = () => {return {type: PENALTIES_LOAD_FAIL}};
