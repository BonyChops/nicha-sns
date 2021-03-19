const { db, admin } = require('../../firestore.js');
const functions = require('firebase-functions');
//const { google } = require('googleapis')
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
    success(res, users.data());
    next();
});

app.get("")

app.post("/", async (req, res, next) => {
    const users = await db.doc(`accounts/${req.account.uid}`).get();
    if (!checkParams(req, res, ["isMain"])) return;
    if (req.body.bio.length > 300) { error(res, 400, "too_long_bio"); return; }
    const id = genRandomDigits(16);
    if (!users.exists) {
        //Main account
        if (!checkParams(req, res, ["display_name", "bio"])) return;
        if (req.body.isMain !== "true") { error(res, 400, "main_not_exists"); return; }
        console.log("GO");
        // Use Google People API
        /*  const auth = new google.auth.OAuth2(...Object.values(functions.config().googleapi));
        console.log(...Object.values(functions.config().googleapi));
        console.log(req.body.google_token)
        auth.setCredentials({ access_token: req.body.google_token });
        const service = google.people({ version: 'v1', auth })
        service.people.connections.list({
            resourceName: 'people/me',
            personFields: 'birthdays',
        }, (err, res) => {
            console.log("hello");
            if (err) return console.error(err);
            console.log("hello");
            console.log(res);
            const connections = res.data.connections;
            if (connections) {
                console.log('Connections:');
                connections.forEach((person) => {
                    if (person.names && person.names.length > 0) {
                        console.log(person.names[0].displayName);
                    } else {
                        console.log('No display name found for connection.');
                    }
                });
            } else {
                console.log('No connections found.');
            }
        }); */
        console.log("-----");
        let usersInfo = [
            {
                id,
                id_str: String(id),
                icon: req.googleAccount.photoURL,
                display_id: req.googleAccount.email.match(/^(.*)@(.*)$/)[1],
                display_name: req.body.display_name,
                student: (req.googleAccount.email.match(new RegExp(`${functions.config().schooladdress.student}$`)) !== null),
                main: true,
                //longData: "nawevnaewuvanwpoavwavniewvinaewinawpaeiuavevinvauawvepuioeavwpuivenivnvweinvnrvnpavwvaeaaaevinapaeavwanewpanwvaenpainanaavnaewapvnweanpiavnpwanerinpanvaweanvavananvapinrawenanvananavweavnanoaninpavwenaaevpanawavanvaneanpiavpiawpeanvvwaeponianpvaonppirnaoaoanvpionawpoanupaoeavepioaeaupvoiapoiuaapvawevnaewuvanwpoavwavniewvinaewinawpaeiuavevinvauawvepuioeavwpuivenivnvweinvnrvnpavwvaeaaaevinapaeavwanewpanwvaenpainanaavnaewapvnweanpiavnpwanerinpanvaweanvavananvapinrawenanvananavweavnanoaninpavwenaaevpanawavanvaneanpiavpiawpeanvvwaeponianpvaonppirnaoaoanvpionawpoanupaoeavepioaeaupvoiapoiuaapvawevnaewuvanwpoavwavniewvinaewinawpaeiuavevinvauawvepuioeavwpuivenivnvweinvnrvnpavwvaeaaaevinapaeavwanewpanwvaenpainanaavnaewapvnweanpiavnpwanerinpanvaweanvavananvapinrawenanvananavweavnanoaninpavwenaaevpanawavanvaneanpiavpiawpeanvvwaeponianpvaonppirnaoaoanvpionawpoanupaoeavepioaeaupvoiapoiuaapv"
            }
        ]
        const userInfo = {
            student: (req.googleAccount.email.match(new RegExp(`${functions.config().schooladdress.student}$`)) !== null),
            usersAvailable: true,
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
        usersInfo[0] = {
            ...usersInfo[0],
            followers: 0,
            follow: 0,
        }
        await Promise.all([db.doc(`accounts/${req.account.uid}`).set(userInfo), db.doc(`users/${usersInfo[0].id}`).set(usersInfo[0])])
        usersInfo[0].selected = true;
        success(res, { users: usersInfo });
        return;
    }
    //Sub-account
    if (req.body.isMain !== "false") { error(res, 409, "main_already_exists"); return; }
    if (!checkParams(req, res, ["display_name", "bio", "display_id"])) return;
    if (req.body.bio.length > 300) { error(res, 400, "too_long_bio"); return; }
    if (req.body.display_id.match(/^[\w]{3,16}$/) === null) { error(res, 400, "invalid_display_id"); return; }
    const userInfo = (await db.doc(`accounts/${req.account.uid}`).get()).data();
    let usersInfo = {
        id,
        id_str: String(id),
        icon: false,
        display_id: req.body.display_id,
        display_name: req.body.display_name,
        student: false,
        main: false
    }
    userInfo.users
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
    usersInfo = {
        ...usersInfo,
        followers: 0,
        follow: 0,
    }
    db.doc(`accounts/${req.account.uid}`).set(userInfo)
    await Promise.all([db.doc(`accounts/${req.account.uid}`).set(userInfo), db.doc(`users/${usersInfo.id}`).set(usersInfo)])
    userInfo.users.slice(-1)[0].selected = true;
    success(res, { users: userInfo.users });
    return;
});


app.delete("/goodbye", (req, res, next) => {

});

module.exports = app;
