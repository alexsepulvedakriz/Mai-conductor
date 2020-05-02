import {
    SIGN_IN_USER_SUCCESS,
    SIGN_OUT_USER_SUCCESS,
    SIGN_UP_USER_SUCCESS,
    SIGN_UP_USER,
    SIGN_IN_USER,
    SIGN_IN_USER_FAILED,
    SIGN_UP_USER_FAILED,
    SIGN_OUT_USER,
    RESETTING_PASSWORD,
    RESETTING_PASSWORD_SUCCESS,
    RESETTING_PASSWORD_FAILED,
    UPDATE_NEW_USER_STATE,
    UPDATE_NEW_VEHICLE_STATE,
    UPDATE_NEW_DRIVER_STATE,
    AUTH_CLEAN_STORE, OFFERS_CLEAN
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
    type_licence: '',
    photo_driver_licence: '',
    file_criminal_record: null,
    photo_id_card: null,
    photo_driver: null,
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
        case SIGN_UP_USER: {return {...state, sing_up_loading: true, sing_up_loaded: false, sing_up_error: false }}
        case SIGN_UP_USER_FAILED: {return {...state,sing_up_loading: false, sing_up_loaded: false, sing_up_error: true }}
        case SIGN_UP_USER_SUCCESS: {return {...state, sing_up_loading: false, sing_up_loaded: true, sing_up_error: false }}
        // sign in
        case SIGN_IN_USER: {return {...state, sing_in_loading: true, sing_in_loaded: false, sing_in_error: false }}
        case SIGN_IN_USER_SUCCESS: {return {...state, sing_in_loading: false, sing_in_loaded: true, sing_in_error: false }}
        case SIGN_IN_USER_FAILED: {return {...state, sing_in_loading: false, sing_in_loaded: false, sing_in_error: true}}
        // sign out
        case SIGN_OUT_USER: {return {...state, sing_out_loading: true, sing_out_loaded: false}}
        case SIGN_OUT_USER_SUCCESS: {return initialState}
        // resette password
        case RESETTING_PASSWORD: {return {...state, reset_loading: true, reset_loaded: false, reset_error: false}}
        case RESETTING_PASSWORD_SUCCESS: {return {...state, reset_loading: false, reset_loaded: true, reset_error: false}}
        case RESETTING_PASSWORD_FAILED: {return {...state, reset_loading: false, reset_loaded: false, reset_error: true}}
        //
        case UPDATE_NEW_USER_STATE: { return {...state, new_user: {... state.new_user, ... action.payload }}}
        case UPDATE_NEW_VEHICLE_STATE: {return {...state, new_vehicle:  {... state.new_vehicle, ... action.payload }}}
        case UPDATE_NEW_DRIVER_STATE: {return {...state, new_driver:  {... state.new_driver, ... action.payload } }}
        //
        case AUTH_CLEAN_STORE: { return initialState}
        default:
            return state;
    }
}
