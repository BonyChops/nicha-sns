const {db, admin} = require('../../firestore.js');
const rand = (min, max) => (Math.floor(Math.random() * (max - min + 1)) + min);
const genRandomDigits = (digits) => (rand(10 ** digits, (10 ** (digits + 1)) - 1));
const {error, success, checkParams} = require("../../returnResult");
const {getUser} = require("../functions/users");
const express = require("express");
const app = express();


app.get("/:id/profile", async(req, res, next) => {
    const screenNameMode = (req.query.screen_id === "true");
    console.log(screenNameMode);
    console.log(req.params);
    console.log(req.query);
    const user = await getUser(req.params.id, screenNameMode);
    if(!user) {
        error(res, 404, "user");
        return;
    }
    success(res, user);
    return;
});

app.put("/:id/profile");

module.exports = app;
