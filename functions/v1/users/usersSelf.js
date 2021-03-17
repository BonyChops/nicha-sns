const { db, admin } = require('../../firestore.js');
const functions = require('firebase-functions');
const rand = (min, max) => (Math.floor(Math.random() * (max - min + 1)) + min);
const genRandomDigits = (digits) => (rand(10 ** digits, (10 ** (digits + 1)) - 1));
const { error, success, checkParams } = require("../../returnResult");
const express = require("express");
const app = express();

app.get("/", async (req, res, next) => {
    //Get all users currently you've logged in
    const users = await db.doc(`accounts/${req.account.uid}`).get();
    if (!users.exists) {
        error(res, 404, "users_created", "You've not created first user.");
        return;
    }
    success(res, post.data());
    next();
});

app.post("/", async (req, res, next) => {
    const users = await db.doc(`accounts/${req.account.uid}`).get();
    if (!users.exists) {
        //Main account
        console.log(req.account)
        if (!checkParams(req, res, ["display_name", "bio"])) return;
        if (req.body.bio.length > 300) { error(res, 400, "too_long_bio"); return; }
        const id = genRandomDigits(16);
        admin.auth().setCustomUserClaims(uid, {
            users: [
                {
                    id,
                    id_str: String(id),
                    icon: req.googleAccount.photoURL,

                    student: (req.googleAccount.email.match(new RegExp(`${functions.config().schooladdress.student}$`)) !== null)

                }
            ]
        })

    }
    //Sub-account
});


app.delete("/goodbye", (req, res, next) => {

});

module.exports = app;
