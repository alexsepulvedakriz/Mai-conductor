import {
    TRIP_LOAD,
    TRIP_LOADED,
    TRIP_LOAD_FAILED,
    TRIP_UPDATE,
    TRIP_UPDATED,
    TRIP_UPDATE_FAILED,
    TRIP_CLEAN,
    TRIP_CURRENCY_LOADED,
    TRIP_CURRENCY_LOAD,
    TRIP_CURRENCY_LOAD_FAILED, TRIP_FINISH, TRIP_FINISHED, TRIP_FINISH_FAILED
} from "../redux/actionTypes";

export const tripLoad = (info) => {return {type: TRIP_LOAD, payload: info}};
export const tripLoaded = (trip) => {return {type: TRIP_LOADED, payload: trip}};
export const tripLoadFailed = () => {return {type: TRIP_LOAD_FAILED}};
export const tripCurrencyLoad = (info) => {return {type: TRIP_CURRENCY_LOAD, payload: info}};
export const tripCurrencyLoaded = (trip) => {return {type: TRIP_CURRENCY_LOADED, payload: trip}};
export const tripCurrencyLoadFailed = () => {return {type: TRIP_CURRENCY_LOAD_FAILED}};
export const tripUpdate = (trip) => {return {type: TRIP_UPDATE, payload: trip}};
export const tripUpdated = (trip) => {return {type: TRIP_UPDATED, payload: trip }};
export const tripUpdateFailed = () => {return {type: TRIP_UPDATE_FAILED}};
export const tripEnd = (trip) => {return{type: TRIP_FINISH,payload: trip}};
export const tripEnded = () => {return{type: TRIP_FINISHED}};
export const tripEndFail = () => {return{type: TRIP_FINISH_FAILED}};
export const tripCleanStore = () => {return {type: TRIP_CLEAN}};
