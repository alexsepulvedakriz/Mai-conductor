import {
    ACCIDENT_ADD,
    ACCIDENT_ADDED,
    ACCIDENT_ADD_FAIL,
    ACCIDENT_CLEAN,
} from "../redux/actionTypes";

const initialState = {
    adding: false,
    added: false,
    error_add: false,
}

export const accident = (state = initialState, action) => {
    switch (action.type) {
        case ACCIDENT_ADD: {return {...state, adding: true, added: false, error_add: false}}
        case ACCIDENT_ADDED: {return {...state, adding: false, added: true, error_add: false}}
        case ACCIDENT_ADD_FAIL: {return {...state, adding: false, added: false, error_add: true}}
        case ACCIDENT_CLEAN: {return initialState}
        default:
            return state;
    }
}
