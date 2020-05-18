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
    TRIP_CURRENCY_LOAD_FAILED,
    TRIP_FINISH,
    TRIP_FINISHED,
    TRIP_FINISH_FAILED,
    TRIP_CANCEL,
    TRIP_CANCEL_FAILED,
    TRIP_CANCELED,
    TRIP_STOP_LISTEN_LOAD,
    TRIP_CURRENCY_STOP_LISTEN_LOAD
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
export const tripFinish = (trip) => {return{type: TRIP_FINISH,payload: trip}};
export const tripFinished = () => {return{type: TRIP_FINISHED}};
export const tripFinishFail = () => {return{type: TRIP_FINISH_FAILED}};
export const tripCleanStore = () => {return {type: TRIP_CLEAN}};
export const tripCancel = (trip) => {return{type: TRIP_CANCEL,payload: trip}};
export const tripCancelFail = () => {return{type: TRIP_CANCEL_FAILED}};
export const tripCanceled = () => {return{type: TRIP_CANCELED}};
export const tripLoadStop = () => {return {type: TRIP_STOP_LISTEN_LOAD}};
export const tripCurrencyLoadStop = () => {return {type: TRIP_CURRENCY_STOP_LISTEN_LOAD}};
