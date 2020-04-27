import {
    HIDE_MODAL_CHECK,
    HIDE_MODAL_RESET_PASSWORD, HIDE_MODAL_SOCIAL,
    SHOW_MODAL_CHECK,
    SHOW_MODAL_RESET_PASSWORD, SHOW_MODAL_SOCIAL
} from "../redux/actionTypes";

export const hideModalResetPassword = () => {return {type: HIDE_MODAL_RESET_PASSWORD};};
export const showModalResetPassword = () => {return {type: SHOW_MODAL_RESET_PASSWORD};};
export const hideModalCheck = () => {return {type: HIDE_MODAL_CHECK};};
export const showModalCheck = () => {return {type: SHOW_MODAL_CHECK};};
export const hideModalSocial = () => {return {type: HIDE_MODAL_SOCIAL};};
export const showModalSocial = () => {return {type: SHOW_MODAL_SOCIAL};};
