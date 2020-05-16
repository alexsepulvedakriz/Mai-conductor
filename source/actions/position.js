import {
    POSITION_ADD,
    POSITION_ADD_FAILED,
    POSITION_ADDED,
    POSITION_CLEAN,
} from "../redux/actionTypes";

export const positionAdd = (position) => { return {type: POSITION_ADD, payload: position}};
export const positionAdded = () => {return {type: POSITION_ADDED}};
export const positionAddFail = () => {return {type: POSITION_ADD_FAILED}};
export const positionClean = () => {return {type: POSITION_CLEAN}};
