import {
    PROFILE_LOAD,
    PROFILE_UPDATED,
    PROFILE_LOAD_FAILED,
    PROFILE_UPDATE,
    PROFILE_LOADED,
    PROFILE_CLEAN,
    PROFILE_STOP_LISTEN_LOAD
} from '../redux/actionTypes';

export const profileLoad = (id_user) => {return {type: PROFILE_LOAD, payload: id_user}};
export const profileLoaded = (profile) => {return {type: PROFILE_LOADED, payload: profile}};
export const profileLoadFail = () => {return {type: PROFILE_LOAD_FAILED, payload: true}};
export const profileUpdate = (profile) => {return {type: PROFILE_UPDATE, payload: profile}};
export const profileUpdated = () => {return {type: PROFILE_UPDATED}};
export const profileUpdateFail = () => {return {type: PROFILE_LOAD_FAILED, payload: true}};
export const profileCleanStore = () => {return {type: PROFILE_CLEAN}};
export const profileLoadStop = () => {return {type: PROFILE_STOP_LISTEN_LOAD}};
