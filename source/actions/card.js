import {
    CARD_ADD,
    CARD_ADD_FAILED,
    CARD_ADDED, CARD_CLEAN,
    CARD_DELETE,
    CARD_DELETE_FAILED,
    CARD_DELETED,
    CARD_LOAD,
    CARD_LOAD_FAILED,
    CARD_LOADED
} from "../redux/actionTypes";

export const CardAdd = (card) => {return {type: CARD_ADD, payload: card}};
export const CardAdded = () => {return {type: CARD_ADDED}};
export const CardAddFail = () => {return {type: CARD_ADD_FAILED}};
export const CardDelete = (card) => {return {type: CARD_DELETE, payload: card}};
export const CardDeleted = () => {return {type: CARD_DELETED}};
export const CardDeleteFail = () => {return {type: CARD_DELETE_FAILED}};
export const CardLoad = (card) => {return {type: CARD_LOAD, payload: card}};
export const CardLoaded = (card) => {return {type: CARD_LOADED, payload: card}};
export const CardLoadFail = () => {return {type: CARD_LOAD_FAILED}};
export const CardClean = () => {return {type: CARD_CLEAN}};
