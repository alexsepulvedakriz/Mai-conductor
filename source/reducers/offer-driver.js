import {
    OFFER_DRIVER_CLEAN,
    OFFER_DRIVER_ADD,
    OFFER_DRIVER_ADDED,
    OFFER_DRIVER_ADD_FAIL,
    OFFER_DRIVER_UPDATE,
    OFFER_DRIVER_UPDATE_FAIL,
    OFFER_DRIVER_UPDATED,
} from "../redux/actionTypes";

const offer_driver_detail = {};

const initialState = {
        adding: false,
        added: false,
        error_add: false,
        updating: false,
        updated: false,
        error_update: false,
        offers_driver: offer_driver_detail
}

export const offer_driver = (state = initialState, action) => {
    switch (action.type) {
        case OFFER_DRIVER_ADD: {return {...state, adding: true, added: false, error_add: false}}
        case OFFER_DRIVER_ADDED: {return {...state, adding: true, added: false, error_add: false}}
        case OFFER_DRIVER_ADD_FAIL: {return {...state, adding: true, added: false, error_add: false}}
        case OFFER_DRIVER_UPDATE: {return {...state, updating: true, updated: false, error_update: false, offers_driver: action.payload}}
        case OFFER_DRIVER_UPDATED: {return {...state, updating: true, updated: false, error_update: false}}
        case OFFER_DRIVER_UPDATE_FAIL: {return {...state, updating: true, updated: false, error_update: false}}
        case OFFER_DRIVER_CLEAN: {return initialState}
        default:
            return state;
    }
}
