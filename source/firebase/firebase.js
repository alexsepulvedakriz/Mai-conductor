import * as firebase from 'firebase';
import 'firebase/firestore';

const googleDirectionsAPI = {
    key: 'AIzaSyDl3WK-NQNDqGJwbqH71FIYYtnlx5JwtDY', //Copy paste your Google Directions API key here
};

// Initialize Firebase
const config = {
    apiKey: "AIzaSyDGadAywKjmZsqxmIPOe2Hw-MqjRkmggzE",
    authDomain: "mai-desarrollo.firebaseapp.com",
    databaseURL: "https://mai-desarrollo.firebaseio.com",
    projectId: "mai-desarrollo",
    storageBucket: "mai-desarrollo.appspot.com",
    messagingSenderId: "742064456121",
    appId: "1:742064456121:web:acbd7218818734c76e3668"
};

const firebaseAplication = firebase.initializeApp(config);
const auth = firebase.auth();
const database = firebase.database();
const firestore = firebase.firestore();
const storage = firebase.storage();
export {
    auth,
    firestore,
    database,
    storage,
    googleDirectionsAPI
};
