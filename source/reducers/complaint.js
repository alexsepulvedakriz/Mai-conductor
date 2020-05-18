import {
    COMPLAINT_ADD,
    COMPLAINT_ADD_FAILED,
    COMPLAINT_ADDED,
    COMPLAINT_LOAD,
    COMPLAINT_LOAD_FAILED,
    COMPLAINT_LOADED,
    COMPLAINT_CLEAN,
} from "../redux/actionTypes";

const initialState = {
    loaded: false,
    loading: false,
    adding: false,
    added: false,
    error: false,
    complaints: []
};

export const complaints = (state = initialState, action) => {
    switch (action.type) {
        case COMPLAINT_ADD: {return {...state, adding: true, added: false, error: false }}
        case COMPLAINT_ADD_FAILED: {return {...state, adding: false, added: false, error: true}}
        case COMPLAINT_ADDED: {return {...state, adding: false, added: true, error: false}}
        case COMPLAINT_LOAD: {return {...state, loading: true, loaded: false, error: false}}
        case COMPLAINT_LOADED: {return {...state, loading: false, loaded: true, error: false, complaints: action.payload}}
        case COMPLAINT_LOAD_FAILED: {return {...state, loading: false, loaded: false, error: true}}
        case COMPLAINT_CLEAN: { return initialState}
        default:
            return state;
    }
}
