import {
    POSITION_ADD,
    POSITION_ADD_FAILED,
    POSITION_ADDED,
    POSITION_CLEAN
} from "../redux/actionTypes";

const initialState = {
    adding: false,
    added: false,
    error: false,
    positions: []
};

export const position = (state = initialState, action) => {
    switch (action.type) {
        case POSITION_ADD: {return {...state, adding: true, added: false, error: false }}
        case POSITION_ADD_FAILED: {return {...state, adding: false, added: false, error: true}}
        case POSITION_ADDED: {return {...state, adding: false, added: true, error: false}}
        case POSITION_CLEAN: { return initialState}
        default:
            return state;
    }
}
