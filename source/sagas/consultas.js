import {all, call, fork, put, takeEvery,select} from "redux-saga/effects";
import { firestore } from "../firebase/firebase";
import { PERFIL_LOANDING } from "../redux/actionTypes";

const consultaPerfilFirestore = async (idPasajero) => {
    await  firestore.collection( 'pasajeros/' + idPasajero + '/consultas').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            console.log(JSON.stringify(doc.data()));
        });
    }).catch( (error) => console.log(error));
}

function* consultarPerfil({payload}) {
    const idPasajero = payload;
    try {
        const getPerfil = yield call(consultaPerfilFirestore, idPasajero);
        if (getPerfil.message) {
            console.log(message)
        } else {
        }
    } catch (error) {
        console.log("error");
    }
}

export function* escucharPerfil() {
    yield takeEvery(PERFIL_LOANDING, consultarPerfil);
}

export default function* rootSaga() {
    yield all([fork(escucharPerfil)]);
}
