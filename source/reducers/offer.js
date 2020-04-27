import {
    OFERTAS_ADD,
    OFERTAS_ADD_FAILED,
    OFERTAS_ADDED,
    OFERTAS_UPDATE,
    OFERTAS_UPDATED,
    OFERTAS_UPDATE_FAILED,
    OFERTAS_CLEAN, OFERTAS_CANCEL, OFERTAS_CANCELED, OFERTAS_CANCEL_FAILED
} from "../redux/actionTypes";



//todo lompiar initial state
const initialState = {
        loading: false,
        loaded: false,
        error: false,
        id_pasajero: '',
        // estado
        activo: true,
        cancelado: false,
        // ruta
        geohash_inicio: '',
        geohash_fin: '',
        latitude_inicio: null,
        longitude_inicio: null,
        latitude_fin: null,
        longitude_fin: null,
        direccion_inicio: '',
        direccion_fin: '',
        // precio
        precio: '',
        efectivo: false,
        webpay: false,
        transferencia: false,
        // viaje
        km: '0',
        tipo_camion: 0,
        conductores_bloqueados: [],
        ayuda_chofer: false,
        ayuda_adicional: false,
        viajar_pasajero_vehiculo: false,
        ayudaras_en_flete: false,
        distancia: '',
        nombre_pasajero: '',
        evaluacion_pasajero: '',
        movil_pasajero: '',
        fecha: null,
        // paquete
        descripcion: '',
        largo: '',
        ancho: '',
        alto: '',
        peso: '0-10 kg',
        // photos
        foto: null
}

export const offer = (state = initialState, action) => {
    switch (action.type) {
        case OFERTAS_ADD: {return {...state, loading: true, loaded: false, error: false, ... action.payload}
        }
        case OFERTAS_ADDED: {return {...state, loading: false, loaded: true, error: false}
        }
        case OFERTAS_CANCEL: {return {...state, ... action.payload}
        }
        case OFERTAS_CANCELED: {return {...state, loading: false, loaded: false, error: false}
        }
        case OFERTAS_CANCEL_FAILED: {return {...state, error: true}
        }
        case OFERTAS_ADD_FAILED: {return {...state, error: true}
        }
        case OFERTAS_UPDATE: {return {...state, ... action.payload}
        }
        case OFERTAS_UPDATED: {return {...state}
        }
        case OFERTAS_UPDATE_FAILED: {return {...state, error: true}
        }
        case OFERTAS_CLEAN: { return initialState}
        default:
            return state;
    }
}
