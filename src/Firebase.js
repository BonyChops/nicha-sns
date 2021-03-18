import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";
import firebaseConfig from './key';
import { useLocation } from 'react';
import Swal from 'sweetalert2/src/sweetalert2.js';
import '@sweetalert2/themes/dark';

firebase.initializeApp(firebaseConfig);
if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.hostname === "") {
    console.log("Nicha service launched in local environment!");
    firebase.auth().useEmulator("http://localhost:9099");
}

const getIdToken = async (forceRefresh = false) => {
    return await new Promise((resolve, reject) => {
        firebase.auth().currentUser.getIdToken(forceRefresh)
            .then(result => resolve(result))
            .catch(e => {
                Swal.fire({
                    icon: 'error',
                    title: '再ログインが必要です',
                    text: 'ログイントークンを取得できませんでした．ログインし直してください...',
                    confirmButtonText: `ログアウト`,
                }).then(() => firebase.auth().signOut())
                reject(e);
            })
    })
}


export { getIdToken };
export default firebase;