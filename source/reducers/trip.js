import {
    TRIP_LOAD,
    TRIP_LOAD_FAILED,
    TRIP_LOADED,
    TRIP_UPDATE,
    TRIP_UPDATED,
    TRIP_UPDATE_FAILED,
    TRIP_CURRENCY_LOADED,
    TRIP_CLEAN, TRIP_CURRENCY_LOAD,
    TRIP_CURRENCY_LOAD_FAILED, TRIP_FINISH, TRIP_FINISHED, TRIP_FINISH_FAILED
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
        case TRIP_LOAD: { return {...state, loading: true, loaded: false, error: false}
        }
        case TRIP_LOADED: {return {...state, loading: false, loaded: true, error: false, ... action.payload}
        }
        case TRIP_LOAD_FAILED: {return {...state, loading: false, loaded: false, error: true}
        }
        case TRIP_CURRENCY_LOAD: { return {...state, loading: true, loaded: false, error: false}
        }
        case TRIP_CURRENCY_LOADED: {return {...state, loading: false, loaded: true, error: false, ... action.payload}
        }
        case TRIP_CURRENCY_LOAD_FAILED: {return {...state, loading: false, loaded: false, error: true}
        }
        case TRIP_UPDATE: { return {...state, loading: true, loaded: false, error: false, ... action.payload}
        }
        case TRIP_UPDATED: {return {...state, loading: false, loaded: true, error: false}
        }
        case TRIP_UPDATE_FAILED: {return {...state, loading: false, loaded: false, error: true}
        }
        case TRIP_FINISH: {return {...state, end: true}
        }
        case TRIP_FINISHED: {return {...state, end: false, ended: true}
        }
        case TRIP_FINISH_FAILED: {return {...state, end: false, ended: false, error: true}
        }
        case TRIP_CLEAN: {return initialState}
        default:
            return state;
    }
}
