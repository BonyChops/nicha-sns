const functions = require('firebase-functions');
const {db, admin} = require('../../firestore.js');
const {success} = require("../../returnResult");

const getUser = async (id, screenNameMode, requiredInfo) => {
    const userRef = !screenNameMode ?
        await db.doc(`users/${id}`).get() :
        await db.collection("users").where("display_id", "==", id).limit(1).get();
    console.log(id)

    // TODO Check User Scopes (ex. secret account)
    if (!screenNameMode ? !userRef.exists : userRef.empty) {
        console.log("not found")
        return false;
    }

    const user = !screenNameMode ? userRef.data() : userRef.docs[0].data();

    // TODO
    await Promise.all(
        requiredInfo.filter(key => (([/*"follow", "posts", */"userDetail"]).includes(key)))
            .map(key => {
                return new Promise((resolve, reject) => {
                    (user[key]).get().then(data => {
                        user[key] = data.data();
                        resolve();
                    }).catch(e => {
                        reject(e);
                    })
                })
            })
        )

    return user;
}

exports.getUser = getUser;