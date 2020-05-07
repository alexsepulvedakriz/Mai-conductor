import {
    VEHICLES_ADD,
    VEHICLES_ADD_FAIL,
    VEHICLES_ADDED,
    VEHICLES_CLEAN,
    VEHICLES_LOAD,
    VEHICLES_LOAD_FAILED,
    VEHICLES_LOADED, VEHICLES_STOP_LISTEN_lOAD
} from "../redux/actionTypes";

export const vehiclesDriverCleanStore = () => {return {type: VEHICLES_CLEAN}};
export const vehiclesAdd = (vehicle) => {return {type: VEHICLES_ADD, payload: vehicle}};
export const vehiclesAdded = () => {return {type: VEHICLES_ADDED}};
export const vehiclesAddFail = () => {return {type: VEHICLES_ADD_FAIL}};
export const vehiclesLoad = (id_driver) => {return {type: VEHICLES_LOAD, payload: id_driver}};
export const vehiclesLoaded = (vehicles) => {return {type: VEHICLES_LOADED, payload: vehicles}};
export const vehiclesLoadFail = () => {return {type: VEHICLES_LOAD_FAILED}};
export const vehiclesLoadStop = () => {return {type: VEHICLES_STOP_LISTEN_lOAD}};
