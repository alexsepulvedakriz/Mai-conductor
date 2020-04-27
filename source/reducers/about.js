import {
    ABOUT_LOADED,
    ABOUT_LOAD,
    ABOUT_LOAD_FAILED,
    ABOUT_CLEAN
} from "../redux/actionTypes";

const initialState = {
        loading: false,
        loaded: false,
        error: false,
        descripcion: '',
        historial: '',
        telefono: '',
        email: ''
}

export const about = (state = initialState, action) => {
    switch (action.type) {
        case ABOUT_LOAD: {return {...state, loading: true, loaded: false, error: false}
        }
        case ABOUT_LOADED: {return {...state, loading: false, loaded: true, error: false,...action.payload}
        }
        case ABOUT_LOAD_FAILED: {return {...state, loading: false, loaded: false, error: true}
        }
        case ABOUT_CLEAN: {return initialState}
        default:
            return state;
    }
}

