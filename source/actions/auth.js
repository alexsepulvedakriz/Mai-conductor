import {
    SIGN_IN_USER,
    SIGN_IN_USER_SUCCESS,
    SIGN_IN_USER_FAILED,
    SIGN_OUT_USER,
    SIGN_OUT_USER_SUCCESS,
    SIGN_OUT_USER_FAILED,
    SIGN_UP_USER,
    SIGN_UP_USER_SUCCESS,
    SIGN_UP_USER_FAILED,
    RESETTING_PASSWORD,
    RESETTING_PASSWORD_SUCCESS,
    RESETTING_PASSWORD_FAILED,
    UPDATE_NEW_USER_STATE,
    UPDATE_NEW_VEHICLE_STATE,
    UPDATE_NEW_DRIVER_STATE,
    AUTH_CLEAN_STORE
} from "../redux/actionTypes";

export const userSignUp = (user) => {return {type: SIGN_UP_USER, payload: user};};
export const userSignUpSuccess = () => {return {type: SIGN_UP_USER_SUCCESS};};
export const userSignUpFailed = () => {return {type: SIGN_UP_USER_FAILED};};
export const userSignIn = (credentials) => {return {type: SIGN_IN_USER, payload: credentials};};
export const userSignInSuccess = (user) => {return {type: SIGN_IN_USER_SUCCESS, payload: user}};
export const userSignInFailed = (user) => {return {type: SIGN_IN_USER_FAILED, payload: user}};
export const userSignOut = () => {return {type: SIGN_OUT_USER};};
export const userSignOutSuccess = () => {return {type: SIGN_OUT_USER_SUCCESS,}};
export const userSignOutFailed = () => {return {type: SIGN_OUT_USER_FAILED,}};
export const resettingPassword = (email) => {return {type: RESETTING_PASSWORD, payload: email};};
export const resettingPasswordSuccess = () => {return {type: RESETTING_PASSWORD_SUCCESS};};
export const resettingPasswordFailed = () => {return {type: RESETTING_PASSWORD_FAILED};};
export const updateNewUserState = (new_user) => {return {type: UPDATE_NEW_USER_STATE, payload: new_user};};
export const updateNewDriverState = (new_driver) => {return {type: UPDATE_NEW_DRIVER_STATE, payload: new_driver};};
export const updateNewVehicleState = (new_vehicle) => {return {type: UPDATE_NEW_VEHICLE_STATE, payload: new_vehicle};};
export const authCleanStore = () => {return {type: AUTH_CLEAN_STORE};};

