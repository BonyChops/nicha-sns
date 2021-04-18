const {db} = require("../../firestore");
const moment = require("moment");
require('moment-timezone');
moment.tz.setDefault('Asia/Tokyo');
const generateList = async (listId, scope_type = "secret", listUsers, listScopeUsers = []) => {
    const options = {
        id: listId,
        id_str: String(listId),
        scope_type
    }
    if ((await db.doc(`lists/${listId}`).get()).exists) {
        console.error("List duplicated");
        return false;
    }
    const ref = db.doc(`lists/${listId}`);
    return await Promise.all([
        ref.set(options),
        Promise.all(listUsers.map(id => (ref.collection("listUsers").doc(String(id)).set({
            id,
            listed_at: moment().format(),
            user_reference: db.doc(`users/${id}`)
        })))),
        Promise.all(listScopeUsers.map(id => (ref.collection("listScopeUsers").doc(String(id)).set({
            id,
            listed_at: moment().format(),
            user_reference: db.doc(`users/${id}`)
        })))),
    ])
}

exports.generateList = generateList;
