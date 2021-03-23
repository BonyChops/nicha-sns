const { db, admin } = require('../../firestore.js');
const { error, success, checkParams } = require("../../returnResult");
const express = require("express");
const app = express();


app.post("/register", (req, res, next) => {

});

app.post("/admin", async (req, res, next) => {
    const account = await db.doc(`accounts/${req.account.uid}`).get();
    if (account.data().admin) {
        await admin.auth().setCustomUserClaims(req.account.uid, { admin: true });
        success(res);
    } else {
        error(res, 403);
    }
    return;
})

app.delete("/goodbye", (req, res, next) => {

});

module.exports = app;
