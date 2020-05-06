import {
    ACCIDENT_ADD,
    ACCIDENT_ADD_FAIL,
    ACCIDENT_ADDED,
    ACCIDENT_CLEAN
} from "../redux/actionTypes";

export const accidentAdd = (accident) => {return {type: ACCIDENT_ADD, payload: accident}};
export const accidentAdded = () => {return {type: ACCIDENT_ADDED}};
export const accidentAddFail = () => {return {type: ACCIDENT_ADD_FAIL}};
export const accidentCleanStore = () => {return {type: ACCIDENT_CLEAN}};
