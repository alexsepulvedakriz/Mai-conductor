import {
    PERFIL_LOADED,
    PERFIL_LOANDING,
    PERFIL_LOANDING_FAILED,
    PERFIL_UPDATED,
    PERFIL_UPDATING,
    PERFIL_UPDATE_FAILED,
} from "../redux/actionTypes";

const initialState = {
    data: {
        loading: false,
        loaded: false,
        error: false,
        allRegData:"",
        apellido: '',
        email: '',
        evaluacion: '',
        fechaInicio: null,
        movil: '',
        nombre: ''
    }
}

export const profile = (state = initialState, action) => {
    switch (action.type) {
        case PERFIL_LOANDING: {return {...state, loading: true, loaded: false, error: false}
        }
        case PERFIL_LOADED: {return {...state, loading: false, loaded: true, error: false,...action.payload}
        }
        case PERFIL_LOANDING_FAILED: {return {...state, loading: false, loaded: false, error: true}
        }
        case PERFIL_UPDATING: {return {...state, loading: true, loaded: false, error: false}
        }
        case PERFIL_UPDATED: {return {...state, loading: false, loaded: true, authUser: action.payload, error: false}
        }
        case PERFIL_UPDATE_FAILED: {return {...state, loading: false, loaded: false, error: true}
        }
        default:
            return state;
    }
}
