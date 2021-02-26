import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";
import firebaseConfig from './key';
firebase.initializeApp(firebaseConfig);

//export const db = firebase.firestore();
export default firebase;