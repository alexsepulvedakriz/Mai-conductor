import {
    COMPLAINT_ADD,
    COMPLAINT_ADD_FAILED,
    COMPLAINT_ADDED, 
    COMPLAINT_CLEAN,
    COMPLAINT_LOAD,
    COMPLAINT_LOAD_FAILED,
    COMPLAINT_LOADED,
    COMPLAINT_STOP_LOAD
} from "../redux/actionTypes";

export const complaintAdd = (complaint) => {return {type: COMPLAINT_ADD, payload: complaint}};
export const complaintAdded = () => {return {type: COMPLAINT_ADDED}};
export const complaintAddFail = () => {return {type: COMPLAINT_ADD_FAILED}};
export const complaintLoad = (id_rider) => {return {type: COMPLAINT_LOAD, payload: id_rider}};
export const complaintLoaded = (complaint) => {return {type: COMPLAINT_LOADED, payload: complaint}};
export const complaintLoadFail = () => {return {type: COMPLAINT_LOAD_FAILED}};
export const complaintClean = () => {return {type: COMPLAINT_CLEAN}};
export const complaintLoadStop = () => {return {type: COMPLAINT_STOP_LOAD}};
