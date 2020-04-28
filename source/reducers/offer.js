import {
    OFFERS_CLEAN,
    OFFERS_LOAD,
    OFFERS_LOAD_FAILED,
    OFFERS_LOADED
} from "../redux/actionTypes";

const offer_detail = {
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
};

const initialState = {
        loading: false,
        loaded: false,
        error_load: false,
        offers: []
}

export const offer = (state = initialState, action) => {
    switch (action.type) {
        case OFFERS_LOAD: {return {...state, loading: true, loaded: false, error_load: false}}
        case OFFERS_LOADED: {return {...state, loading: false, loaded: true, error_load: false, offers: action.payload}}
        case OFFERS_LOAD_FAILED: {return {...state, loading: false, loaded: false, error_load: true}}
        case OFFERS_CLEAN: { return initialState}
        default:
            return state;
    }
}
