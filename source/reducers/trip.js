import {
    VIAJES_LOAD,
    VIAJES_LOAD_FAILED,
    VIAJES_LOADED,
    VIAJES_UPDATE,
    VIAJES_UPDATED,
    VIAJES_UPDATE_FAILED,
    VIAJE_CURRENCY_LOADED,
    VIAJES_CLEAN, VIAJE_CURRENCY_LOAD,
    VIAJE_CURRENCY_LOAD_FAILED, VIAJE_END, VIAJE_ENDED, VIAJE_END_FAILED
} from "../redux/actionTypes";

const initialState = {
    loading: false,
    loaded: false,
    error: false,
    viajes: [],
    viajeActual: null,
    ended: false,
    end: false
}

export const trip = (state = initialState, action) => {
    switch (action.type) {
        case VIAJES_LOAD: { return {...state, loading: true, loaded: false, error: false}
        }
        case VIAJES_LOADED: {return {...state, loading: false, loaded: true, error: false, ... action.payload}
        }
        case VIAJES_LOAD_FAILED: {return {...state, loading: false, loaded: false, error: true}
        }
        case VIAJE_CURRENCY_LOAD: { return {...state, loading: true, loaded: false, error: false}
        }
        case VIAJE_CURRENCY_LOADED: {return {...state, loading: false, loaded: true, error: false, ... action.payload}
        }
        case VIAJE_CURRENCY_LOAD_FAILED: {return {...state, loading: false, loaded: false, error: true}
        }
        case VIAJES_UPDATE: { return {...state, loading: true, loaded: false, error: false, ... action.payload}
        }
        case VIAJES_UPDATED: {return {...state, loading: false, loaded: true, error: false}
        }
        case VIAJES_UPDATE_FAILED: {return {...state, loading: false, loaded: false, error: true}
        }
        case VIAJE_END: {return {...state, end: true}
        }
        case VIAJE_ENDED: {return {...state, end: false, ended: true}
        }
        case VIAJE_END_FAILED: {return {...state, end: false, ended: false, error: true}
        }
        case VIAJES_CLEAN: {return initialState}
        default:
            return state;
    }
}
