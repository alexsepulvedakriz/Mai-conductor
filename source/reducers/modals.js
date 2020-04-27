import {
    SHOW_MODAL_RESET_PASSWORD,
    HIDE_MODAL_RESET_PASSWORD,
    HIDE_MODAL_CHECK,
    SHOW_MODAL_CHECK,
    SHOW_MODAL_SOCIAL,
    HIDE_MODAL_SOCIAL
} from "../redux/actionTypes";

const initialState = {
        showModalResetPassword: false,
        showModalCheck: false,
        showModalSocial: false
}

export const modal = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_MODAL_RESET_PASSWORD: {return {...state, showModalResetPassword: true}}
        case HIDE_MODAL_RESET_PASSWORD: {return {...state, showModalResetPassword: false}}
        case SHOW_MODAL_CHECK: {return {...state, showModalCheck: true}}
        case HIDE_MODAL_CHECK: {return {...state, showModalCheck: false}}
        case SHOW_MODAL_SOCIAL: {return {...state, showModalSocial: true}}
        case HIDE_MODAL_SOCIAL: {return {...state, showModalSocial: false}}
        default:
            return state;
    }
}
