import {all, call, fork, put, takeEvery,select} from "redux-saga/effects";
import { firestore } from "../firebase/firebase";
import { PERFIL_LOAD } from "../redux/actionTypes";

const ruta = 'prueba';
const getToken = (state) => state.store;

const consultaPerfilFirestore = async () => {
    await  firestore.collection(ruta + '/').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            console.log(JSON.stringify(doc.data()));
        });
    }).catch( (error) => console.log(error));
}

function* consultarPerfil() {
    const token = yield select(getToken);
    console.log('holiiija' + token);
    try {
        const getPerfil = yield call(consultaPerfilFirestore);
        if (getPerfil.message) {
            console.log(message)
        } else {
        }
    } catch (error) {
        console.log("error");
    }
}

export function* escucharPerfil() {
    yield takeEvery(PERFIL_LOAD, consultarPerfil);
}

export default function* rootSaga() {
    yield all([fork(escucharPerfil)]);
}
