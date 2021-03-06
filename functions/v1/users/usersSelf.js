const {db, admin} = require('../../firestore.js');
const functions = require('firebase-functions');
const moment = require("moment");
//const { google } = require('googleapis')
const rand = (min, max) => (Math.floor(Math.random() * (max - min + 1)) + min);
const genRandomDigits = (digits) => (rand(10 ** (digits - 1), (10 ** digits) - 1));
const {error, success, checkParams} = require("../../returnResult");
const {generateList} = require("../functions/lists");
const express = require("express");
const app = express();

app.get("/", async (req, res, next) => {
    //Get all users currently you've logged in
    const users = await db.doc(`accounts/${req.account.uid}`).get();
    if (!users.exists) {
        error(res, 404, "users_created", "You've not created first user.");
        return;
    }
    success(res, users.data());
    console.log(users.data());
    console.log(JSON.stringify(users.data().users[0].userDetail, null, 2))
    console.log("----------------------------------");
    console.log(users.data().users[0].userDetail)
    console.log(users.data().users[0].userDetail.toJSON())
    console.log((await users.data().users[0].userDetail.get()).data())
    return;
});


app.post("/", async (req, res, next) => {
    const users = await db.doc(`accounts/${req.account.uid}`).get();
    if (!checkParams(req, res, ["isMain"])) return;
    if (req.body.bio.length > 300) {
        error(res, 400, "too_long_bio");
        return;
    }
    const id = genRandomDigits(16);
    const listId = genRandomDigits(16);
    const postsListsId = genRandomDigits(16);
    if (!users.exists) {
        //Main account
        if (!checkParams(req, res, ["display_name", "bio"])) return;
        if (req.body.isMain !== "true") {
            error(res, 400, "main_not_exists");
            return;
        }
        console.log("-----");
        const display_id = req.googleAccount.email.match(/^(.*)@(.*)$/)[1];
        if (!(await db.collection("users").where("display_id", "==", display_id).get()).empty) {
            error(res, 400, "display_id_already_in_use");
            return;
        }
        let usersInfo = [
            {
                id,
                id_str: String(id),
                icon: req.googleAccount.photoURL,
                display_id,
                display_name: req.body.display_name,
                student: (req.googleAccount.email.match(new RegExp(`${functions.config().schooladdress.student}$`)) !== null),
                main: true,
                userDetail: db.doc(`users_detail/${id}`),
                follow: db.doc(`lists/${listId}`),
                posts: db.doc(`lists/${postsListsId}`)
            }
        ]
        const userInfo = {
            student: (req.googleAccount.email.match(new RegExp(`${functions.config().schooladdress.student}$`)) !== null),
            usersAvailable: true,
            admin: false,
            users: usersInfo
        }
        try {
            await admin.auth().setCustomUserClaims(req.account.uid, userInfo);
        } catch (e) {
            //console.error(e);
            const claimUserInfo = Object.assign({}, userInfo);
            claimUserInfo.users = false;
            claimUserInfo.usersAvailable = false;
            await admin.auth().setCustomUserClaims(req.account.uid, claimUserInfo);
        }
        userInfo.usersClaim = [];
        userInfo.usersClaim[0] = Object.assign({}, usersInfo[0]);
        const userDetail = {
            created_at: moment().format(),
            bio: req.body.bio,
            realName: req.googleAccount.displayName,
            topics: []
        }
        const followList = {
            id: listId,
            id_str: String(listId),
            scope_type: "secret"
        }
        await Promise.all([
            db.doc(`accounts/${req.account.uid}`).set(userInfo),
            db.doc(`users/${usersInfo[0].id}`).set(usersInfo[0]),
            usersInfo[0].userDetail.set(userDetail),
            generateList(listId, "secret", [id], [id]),
            generateList(postsListsId, "public", [id]),
            /*usersInfo[0].follow.set(followList),
            usersInfo[0].follow.collection("listUsers").doc(String(id)).set({
                id,
                listed_at: moment().format(),
                user_reference: db.doc(`users/${id}`)
            }),
            usersInfo[0].follow.collection("listScopeUsers").doc(String(id)).set({
                id,
                listed_at: moment().format(),
                user_reference: db.doc(`users/${id}`)
            }),*/
        ]);

        usersInfo[0].selected = true;
        usersInfo[0].userDetail = userDetail;

        success(res, {users: usersInfo});
        return;
    }
    //Sub-account
    if (req.body.isMain !== "false") {
        error(res, 409, "main_already_exists");
        return;
    }
    if (!checkParams(req, res, ["display_name", "bio", "display_id"])) return;
    if (req.body.bio.length > 300) {
        error(res, 400, "too_long_bio");
        return;
    }
    if (req.body.display_id.match(/(?=^[\w]{3,16})(?!^\d+$)^.+$/) === null) {
        error(res, 400, "invalid_display_id");
        return;
    }
    if (!(await db.collection("users").where("display_id", "==", req.body.display_id).get()).empty) {
        error(res, 400, "display_id_already_in_use");
        return;
    }
    const userInfo = (await db.doc(`accounts/${req.account.uid}`).get()).data();
    let usersInfo = {
        id,
        id_str: String(id),
        icon: false,
        display_id: req.body.display_id,
        display_name: req.body.display_name,
        student: false,
        main: false,
        userDetail: db.doc(`users_detail/${id}`),
        follow: db.doc(`lists/${listId}`)
    }
    userInfo.users.push(usersInfo)
    userInfo.usersClaim.push(Object.assign({}, usersInfo))

    const claimUserInfo = Object.assign({}, userInfo);
    claimUserInfo.users = claimUserInfo.usersClaim;
    claimUserInfo.usersClaim = null;
    try {
        await admin.auth().setCustomUserClaims(req.account.uid, claimUserInfo);
    } catch (e) {
        //console.error(e);
        claimUserInfo.users = false;
        claimUserInfo.usersAvailable = false;
        await admin.auth().setCustomUserClaims(req.account.uid, claimUserInfo);
    }
    const userDetail = {
        created_at: moment().format(),
        bio: req.body.bio
    }
    userInfo.users[0].follow = db.doc(`lists/${listId}`);
    const followList = {
        id: listId,
        id_str: String(listId),
        scope_type: "secret"
    }
    await Promise.all([
        db.doc(`accounts/${req.account.uid}`).set(userInfo),
        db.doc(`users/${usersInfo.id}`).set(usersInfo),
        usersInfo.userDetail.set(userDetail),
        usersInfo.follow.set(followList),
        usersInfo.follow.collection("listUsers").doc(String(id)).set({
            id,
            listed_at: moment().format(),
            user_reference: db.doc(`users/${id}`)
        }),
        usersInfo.follow.collection("listScopeUsers").doc(String(id)).set({
            id,
            listed_at: moment().format(),
            user_reference: db.doc(`users/${id}`)
        }),
    ])
    userInfo.users.slice(-1)[0].selected = true;
    success(res, {users: userInfo.users});
    return;
});


app.delete("/goodbye", (req, res, next) => {

});

module.exports = app;
