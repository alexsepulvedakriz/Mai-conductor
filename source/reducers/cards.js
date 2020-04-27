import {
    CARD_ADD,
    CARD_ADD_FAILED,
    CARD_ADDED,
    CARD_DELETE,
    CARD_DELETE_FAILED,
    CARD_DELETED,
    CARD_LOAD,
    CARD_LOAD_FAILED,
    CARD_LOADED,
    CARD_CLEAN
} from "../redux/actionTypes";

const initialState = {
    loaded: false,
    loading: false,
    deleting: false,
    deleted: false,
    adding: false,
    added: false,
    error: false,
    cards: []
};

export const card = (state = initialState, action) => {
    switch (action.type) {
        case CARD_ADD: {return {...state, adding: true, added: false, error: false }}
        case CARD_ADD_FAILED: {return {...state, adding: false, added: false, error: true}}
        case CARD_ADDED: {return {...state, adding: false, added: true, error: false}}
        case CARD_DELETE: {return {...state, deleting: true, deleted: false, error: false}}
        case CARD_DELETE_FAILED: {return {...state, deleting: false, deleted: false, error: true}}
        case CARD_DELETED: {return {...state, deleting: false, deleted: true, error: false}}
        case CARD_LOAD: {return {...state, loading: true, loaded: false, error: false}}
        case CARD_LOADED: {return {...state, loading: false, loaded: true, error: false, ... action.payload}}
        case CARD_LOAD_FAILED: {return {...state, loading: false, loaded: false, error: true}}
        case CARD_CLEAN: { return initialState}
        default:
            return state;
    }
}
