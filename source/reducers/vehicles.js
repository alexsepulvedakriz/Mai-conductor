import {
    VEHICLES_ADD,
    VEHICLES_ADD_FAIL,
    VEHICLES_ADDED,
    VEHICLES_CLEAN,
    VEHICLES_LOAD,
    VEHICLES_LOAD_FAILED,
    VEHICLES_LOADED
} from "../redux/actionTypes";

const initialState = {
    adding: false,
    added: false,
    error_add: false,
    loading: false,
    loaded: false,
    error_load: false,
    vehicles: []
}

export const vehicles = (state = initialState, action) => {
    switch (action.type) {
        case VEHICLES_LOAD: {return {...state, loading: true, loaded: false, error_load: false}}
        case VEHICLES_LOADED: {return {...state, loading: false, loaded: true, error_load: false, vehicles: action.payload}}
        case VEHICLES_LOAD_FAILED: {return {...state, loading: false, loaded: false, error_load: true}}
        case VEHICLES_ADD: {return {...state, adding: true, added: false, error_add: false}}
        case VEHICLES_ADDED: {return {...state, adding: false, added: true, error_add: false}}
        case VEHICLES_ADD_FAIL: {return {...state, adding: false, added: false, error_add: true}}
        case VEHICLES_CLEAN: {return initialState}
        default:
            return state;
    }
}
