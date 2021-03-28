const { db, admin } = require('../../firestore.js');
const moment = require("moment");
const rand = (min, max) => (Math.floor(Math.random() * (max - min + 1)) + min);
const genRandomDigits = (digits) => (rand(10 ** digits, (10 ** (digits + 1)) - 1));
const { error, success, checkParams } = require("../../returnResult");
const express = require("express");
const { user } = require('firebase-functions/lib/providers/auth');
const app = express();


app.get("/:id/profile", (req, res, next) => {
    const screenNameMode = (req.query.screen_id === "true");
    console.log(req.params);
    console.log(req.query);
});

app.post("/", async (req, res, next) => {
    if (!checkParams(req, res, ["members", "display_name", "type"])) { return };
    if (!(["full_controlled", "public", "secret"]).includes(req.body.type)) { error(res, 400, "invalid_type"); return; }
    const membersList = [...new Set(req.body.members.split(","))].filter(name => name !== "").map(name => String(name));
    if (!membersList.includes(req.user.id_str)) { membersList.push(req.user.id_str) };
    console.log(membersList);
    console.log(members);
    let id;
    do {
        id = genRandomDigits(16);
    } while (await db.doc(`lists/${id}`).get().exists);
    const list = {
        id,
        id_str: String(id),
        display_name: req.body.display_name,
        members,
        created_at: moment().format(),
        created_by: currentUserRef
    }
    await db.doc(`lists/${id}`).set(list);
    const members = [];
    let currentUserRef;
    for (const display_id in membersList) {
        const userRefs = db.doc(`users/${membersList[display_id]}`);
        if(membersList[display_id] === req.user.id_str) currentUserRef = userRefs;
        if ((await userRefs.get()).exists) {
            db.doc(`lists/${id}`).collection("listUsers").doc(String(display_id)).set({
                id: Number(display_id),
                listed_at: moment().format(),
                user_reference: userRefs
            })
        };
    }
    list.members = membersList;
    list.created_by = req.user.id;
    success(res, list);
})

module.exports = app;
