const functions = require('firebase-functions');
const {db, admin} = require('../../firestore.js');
const {success} = require("../../returnResult");

const getUser = async (id, screenNameMode) => {
    const user = !screenNameMode ?
        await db.doc(`users/${id}`).get() :
        await db.collection("users").where("display_id", "==", id).limit(1).get();
    console.log(id)

    // TODO Check User Scopes (ex. secret account)
    if (!screenNameMode ? !user.exists : user.empty) {
        console.log("not found")
        return false;
    }

    return !screenNameMode ? user.data() : user.docs[0].data();
}

exports.getUser = getUser;