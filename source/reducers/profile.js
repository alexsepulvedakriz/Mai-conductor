import {
    PROFILE_LOADED,
    PROFILE_LOAD,
    PROFILE_LOAD_FAILED,
    PROFILE_UPDATED,
    PROFILE_UPDATE,
    PROFILE_UPDATE_FAILED,
    PROFILE_CLEAN,
} from "../redux/actionTypes";

const profile_detail = {
    id_driver: '',
    name: '',
    last_name: '',
    email: '',
    review: '',
    movil: '',
    language: '',
    ref_photo: '',
    photo: null,
    rut: '',
    active: false,
}

const initialState = {
    loading: false,
    loaded: false,
    error_load: false,
    updating: false,
    updated: false,
    error_update: false,
    profile: profile_detail
}

export const profile = (state = initialState, action) => {
    switch (action.type) {
        case PROFILE_LOAD: {return {...state, loading: true, loaded: false, error_load: false}}
        case PROFILE_LOADED: {return {...state, loading: false, loaded: true, error_load: false, profile: {profile_detail, ...action.payload}}}
        case PROFILE_LOAD_FAILED: {return {...state, loading: false, loaded: false, error_load: true}}
        case PROFILE_UPDATE: {return {...state, updating: true, updated: false, error_update: false}}
        case PROFILE_UPDATED: {return {...state, updating: false, updated: true, error_update: false}}
        case PROFILE_UPDATE_FAILED: {return {...state, updating: false, updated: false, error_update: true}}
        case PROFILE_CLEAN: {return initialState}
        default:
            return state;
    }
}
