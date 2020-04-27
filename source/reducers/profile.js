import {
    PERFIL_LOADED,
    PERFIL_LOAD,
    PERFIL_LOAD_FAILED,
    PERFIL_UPDATED,
    PERFIL_UPDATE,
    PERFIL_UPDATE_FAILED,
    PERFIL_CLEAN,
} from "../redux/actionTypes";

const initialState = {
    data: {
        loading: false,
        loaded: false,
        error: false,
        allRegData:"",
        id_pasajero: '',
        apellido: '',
        email: '',
        evaluacion: '',
        fechaInicio: null,
        movil: '',
        nombre: '',
        conductores_bloqueados: []
    }
}

export const profile = (state = initialState, action) => {
    switch (action.type) {
        case PERFIL_LOAD: {return {...state, loading: true, loaded: false, error: false}
        }
        case PERFIL_LOADED: {return {...state, loading: false, loaded: true, error: false,...action.payload}
        }
        case PERFIL_LOAD_FAILED: {return {...state, loading: false, loaded: false, error: true}
        }
        case PERFIL_UPDATE: {return {...state, loading: true, loaded: false, error: false}
        }
        case PERFIL_UPDATED: {return {...state, loading: false, loaded: true, error: false}
        }
        case PERFIL_UPDATE_FAILED: {return {...state, loading: false, loaded: false, error: true}
        }
        case PERFIL_CLEAN: {return initialState}
        default:
            return state;
    }
}
