import {
    SIGNIN_USER,
    SIGNIN_USER_SUCCESS,
    SIGNIN_USER_FAILED,
    SIGNOUT_USER,
    SIGNOUT_USER_SUCCESS,
    SIGNOUT_USER_FAILED,
    SIGNUP_USER,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAILED,
    RESETTING_PASSWORD,
    RESETTING_PASSWORD_SUCCESS,
    RESETTING_PASSWORD_FAILED,
} from "../redux/actionTypes";

export const userSignUp = (user) => {return {type: SIGNUP_USER, payload: user};};
export const userSignUpSuccess = () => {return {type: SIGNUP_USER_SUCCESS};};
export const userSignUpFailed = () => {return {type: SIGNUP_USER_FAILED};};
export const userSignIn = (credentials) => {return {type: SIGNIN_USER, payload: credentials};};
export const userSignInSuccess = (authUser) => {return {type: SIGNIN_USER_SUCCESS, payload: authUser}};
export const userSignInFailed = (authUser) => {return {type: SIGNIN_USER_FAILED, payload: authUser}};
export const userSignOut = () => {return {type: SIGNOUT_USER};};
export const userSignOutSuccess = () => {return {type: SIGNOUT_USER_SUCCESS,}};
export const userSignOutFailed = () => {return {type: SIGNOUT_USER_FAILED,}};
export const resettingPassword = (email) => {return {type: RESETTING_PASSWORD, payload: email};};
export const resettingPasswordSuccess = () => {return {type: RESETTING_PASSWORD_SUCCESS};};
export const resettingPasswordFailed = () => {return {type: RESETTING_PASSWORD_FAILED};};

