import {
    VIAJES_LOAD,
    VIAJES_LOADED,
    VIAJES_LOAD_FAILED,
    VIAJES_UPDATE,
    VIAJES_UPDATED,
    VIAJES_UPDATE_FAILED,
    VIAJES_CLEAN,
    VIAJE_CURRENCY_LOADED,
    VIAJE_CURRENCY_LOAD,
    VIAJE_CURRENCY_LOAD_FAILED, VIAJE_END, VIAJE_ENDED, VIAJE_END_FAILED
} from "../redux/actionTypes";

export const tripLoad = (info) => {return {type: VIAJES_LOAD, payload: info}};
export const tripLoaded = (trip) => {return {type: VIAJES_LOADED, payload: trip}};
export const tripLoadFailed = () => {return {type: VIAJES_LOAD_FAILED}};
export const tripCurrencyLoad = (info) => {return {type: VIAJE_CURRENCY_LOAD, payload: info}};
export const tripCurrencyLoaded = (trip) => {return {type: VIAJE_CURRENCY_LOADED, payload: trip}};
export const tripCurrencyLoadFailed = () => {return {type: VIAJE_CURRENCY_LOAD_FAILED}};
export const tripUpdate = (trip) => {return {type: VIAJES_UPDATE, payload: trip}};
export const tripUpdated = (trip) => {return {type: VIAJES_UPDATED, payload: trip }};
export const tripUpdateFailed = () => {return {type: VIAJES_UPDATE_FAILED}};
export const tripEnd = (trip) => {return{type: VIAJE_END,payload: trip}};
export const tripEnded = () => {return{type: VIAJE_ENDED}};
export const tripEndFail = () => {return{type: VIAJE_END_FAILED}};
export const tripCleanStore = () => {return {type: VIAJES_CLEAN}};
