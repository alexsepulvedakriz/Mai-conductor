import {
    OFFERS_CLEAN,
    OFFERS_LOAD,
    OFFERS_LOAD_FAILED,
    OFFERS_LOADED
} from "../redux/actionTypes";

const offer_detail = {
    // estado
    active: true,
    cancel: false,
    // ruta
    latitude_init: null,
    longitude_init: null,
    latitude_end: null,
    longitude_end: null,
    address_from: '',
    address_to: '',
    // precio
    price: '',
    cash: false,
    webpay: false,
    transfer: false,
    // viaje
    type_truck: 0,
    drivers_block: [],
    description: '',
    weight: '',
    // photos
    photo: null,
    // rider
    distance: '',
    name_rider: '',
    last_name_rider: '',
    review_rider: '',
    mobile_rider: '',
    id_rider: '',
    date: null,
    // camion normal
    aditional_help: false,
    driver_help: false,
    rider_travel: false,
    rider_help: false,
    // otro destinatario
    name_addressee: '',
    mobile_addressee: '',
    // camion remolque
    car_make: '',
    model: '',
    // agendado
    schedule: false,
    date_schedule: null,
    hour_schedule: null
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
