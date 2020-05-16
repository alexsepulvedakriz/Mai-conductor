import {
    PENALTIES_CLEAN,
    PENALTIES_LOAD,
    PENALTIES_LOAD_FAIL,
    PENALTIES_LOADED
} from "../redux/actionTypes";

const penalty = {
    init_date: null,
    end_date: null,
    description: '',
    warnings: ''
};

const initialState = {
    loading: false,
    loaded: false,
    error_load: false,
    penalties: [],
    penalty: penalty
};

export const penalties = (state = initialState, action) => {
    switch (action.type) {
        case PENALTIES_LOAD: {return {...state, loading: true, loaded: false, error_load: false}}
        case PENALTIES_LOADED: {return {...state, loading: false, loaded: true, error_load: false, penalties: action.payload}}
        case PENALTIES_LOAD_FAIL: {return {...state, loading: false, loaded: false, error_load: true}}
        case PENALTIES_CLEAN: { return initialState}
        default:
            return state;
    }
};
