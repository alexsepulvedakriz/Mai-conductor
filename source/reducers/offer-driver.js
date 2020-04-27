import {
    CONTRAOFERTAS_LOAD,
    CONTRAOFERTAS_LOADED,
    CONTRAOFERTAS_LOAD_FAILED,
    CONTRAOFERTAS_DECLINE,
    CONTRAOFERTAS_DECLINED,
    CONTRAOFERTAS_DECLINE_FAILED,
    CONTRAOFERTAS_CLEAN,
    CONTRAOFERTAS_ACCEPT,
    CONTRAOFERTAS_ACCEPTED,
    CONTRAOFERTAS_ACCEPT_FAILED
} from "../redux/actionTypes";

const initialState = {
        loading: false,
        loaded: false,
        error: false,
        contra_ofertas: []
}

export const offer_driver = (state = initialState, action) => {
    switch (action.type) {
        case CONTRAOFERTAS_LOAD: {return {...state, loading: true, loaded: false, error: false, ... action.payload}
        }
        case CONTRAOFERTAS_LOADED: {return {...state, loading: false, loaded: true, error: false,  ... action.payload}
        }
        case CONTRAOFERTAS_LOAD_FAILED: {return {...state, loading: false, loaded: false, error: true}
        }
        case CONTRAOFERTAS_DECLINE: {return {...state}
        }
        case CONTRAOFERTAS_DECLINED: {return {...state}
        }
        case CONTRAOFERTAS_DECLINE_FAILED: {return {...state, loading: false, loaded: false, error: true}
        }
        case CONTRAOFERTAS_ACCEPT: {return {...state, loading: true, loaded: false, error: false}
        }
        case CONTRAOFERTAS_ACCEPTED: {return {...state, loading: false, loaded: false, error: false}
        }
        case CONTRAOFERTAS_ACCEPT_FAILED: {return {...state, loading: false, loaded: false, error: true}
        }
        case CONTRAOFERTAS_CLEAN: {return initialState}
        default:
            return state;
    }
}
