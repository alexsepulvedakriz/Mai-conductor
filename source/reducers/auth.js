import {
    SIGNIN_USER_SUCCESS,
    SIGNOUT_USER_SUCCESS,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER,
    SIGNIN_USER,
    SIGNIN_USER_FAILED,
    SIGNUP_USER_FAILED,
    SIGNOUT_USER,
    RESETTING_PASSWORD,
    RESETTING_PASSWORD_SUCCESS,
    RESETTING_PASSWORD_FAILED
} from "../redux/actionTypes";
const new_user = {
    name: '',
    last_name: '',
    email: '',
    review: '',
    movil: '',
    language: '',
    ref_photo: '',
    rut: '',
    active: false,
    password: '',
    conf_password: '',
};
const new_driver = {

};
const new_vehicle = {};

const initialState = {
    sing_in_loading: false,
    sing_in_loaded: false,
    sing_in_error: false,
    error_loading: false,
    sing_up_loading: false,
    sing_up_loaded: false,
    sing_up_error: false,
    reset_loading: false,
    reset_loaded: false,
    reset_error: false,
    sing_out_loading: false,
    sing_out_loaded: false,
    new_user: new_user,
    new_driver: new_driver,
    new_vehicle: new_vehicle
}

export const auth = (state = initialState, action) => {
    switch (action.type) {
        // sign up
        case SIGNUP_USER: {return {...state, sing_up_loading: true, sing_up_loaded: false, sing_up_error: false }}
        case SIGNUP_USER_FAILED: {return {...state,sing_up_loading: false, sing_up_loaded: false, sing_up_error: true }}
        case SIGNUP_USER_SUCCESS: {return {...state, sing_up_loading: false, sing_up_loaded: true, sing_up_error: false }}
        // sign in
        case SIGNIN_USER: {return {...state, sing_in_loading: true, sing_in_loaded: false, sing_in_error: false }}
        case SIGNIN_USER_SUCCESS: {return {...state, sing_in_loading: false, sing_in_loaded: true, sing_in_error: false }}
        case SIGNIN_USER_FAILED: {return {...state, sing_in_loading: false, sing_in_loaded: false, sing_in_error: true}}
        // sign out
        case SIGNOUT_USER: {return {...state, sing_out_loading: true, sing_out_loaded: false}}
        case SIGNOUT_USER_SUCCESS: {return initialState}
        // resette password
        case RESETTING_PASSWORD: {return {...state, reset_loading: true, reset_loaded: false, reset_error: false}}
        case RESETTING_PASSWORD_SUCCESS: {return {...state, reset_loading: false, reset_loaded: true, reset_error: false}}
        case RESETTING_PASSWORD_FAILED: {return {...state, reset_loading: false, reset_loaded: false, reset_error: true}}
        default:
            return state;
    }
}
