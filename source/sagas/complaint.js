import { all, fork, put, takeEvery, take, call} from "redux-saga/effects";
import { firestore} from "../firebase/firebase";
import { eventChannel} from 'redux-saga';
import {COMPLAINT_LOAD, COMPLAINT_ADD} from "../redux/actionTypes";
import {complaintAdded, complaintLoaded, complaintAddFail, complaintLoadFail} from "../actions/complaint";

const addComplaintFirestore  = (Complaint) => eventChannel(emitter => {
    const { id_user} = Complaint;
    firestore.collection('drivers/' + id_user + '/complaints').doc().set(Complaint)
        .then(_=> {emitter({
            data: {cambiado: true}})})
        .catch( error => {
            console.log(error);
            emitter({
                data: {cambiado: false}})});
    return () => unsubscribe();
});

const loadComplaintFirestore  = (id_rider) => eventChannel(emitter => {
    const unsubscribe = firestore.collection('drivers/' + id_rider + '/complaints').onSnapshot(snapshot => {
        const Complaints = [];
        snapshot.forEach((change) => {
            console.log(change.data())
            Complaints.push({...change.data(), id_complaint: change.id, id_rider: id_rider});
        });
        emitter({
            data: Complaints
        })
    });
    return () => unsubscribe();
});

function* addComplaint({payload}) {
    try {
        const todosChannel = addComplaintFirestore(payload);
        yield takeEvery(todosChannel, function*() {
            yield put(complaintAdded());
        });
        yield take('UNWATCH-TODOS');
        todosChannel.close();
    } catch (error) {
        yield put(complaintAddFail());
    }
}

function* loadComplaint({payload}) {
    try {
        const todosChannel = loadComplaintFirestore(payload);
        yield takeEvery(todosChannel, function*(action) {
            yield put(complaintLoaded(action.data));
        });
        yield take('UNWATCH-TODOS');
        todosChannel.close();
    } catch (error) {
        yield put(complaintLoadFail());
    }
}


export function* triggerAddComplaint() {
    yield takeEvery(COMPLAINT_ADD, addComplaint);
}

export function* triggerLoadComplaint() {
    yield takeEvery(COMPLAINT_LOAD, loadComplaint);
}

export default function* rootSaga() {
    yield all([fork(triggerAddComplaint), fork(triggerLoadComplaint)]);
}
