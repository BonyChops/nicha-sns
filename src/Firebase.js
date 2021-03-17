import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";
import firebaseConfig from './key';
import { useLocation } from 'react';
firebase.initializeApp(firebaseConfig);
if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.hostname === "") {
    console.log("Nicha service launched in local environment!");
    firebase.auth().useEmulator("http://localhost:9099");
}

const getIdToken = async () => {
    return await firebase.auth().currentUser.getIdToken();
}


export { getIdToken };
export default firebase;