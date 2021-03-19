const functions = require('firebase-functions');
const { db, admin } = require('../../firestore.js');


const accessClaims = async (req) => {
    return await new Promise((resolve, reject) => {
        req.account.getIdTokenResult()
            .then((idTokenResult) => {
                resolve(idTokenResult.claims);
            })
            .catch(e => {
                reject(e);
            })
    })
}

const userClaims = async (req) => {
    const claims = await accessClaims(req);
    if (claims.usersAvailable) return claims.users.find(user => user.id === req.current_user);
    return (await db.doc(`accounts/${req.account.uid}`).get().data()).usersClaim.find(user => user.id === req.current_user);
}

export { accessClaims, userClaims }