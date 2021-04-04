const express = require("express");
const app = express();
const moment = require('moment');
const { checkParams, success } = require("../../returnResult");
require('moment-timezone');
moment.tz.setDefault('Asia/Tokyo'); //Doesn't required if you think it's not necessary
const request = require("request");
const functions = require("firebase-functions");

app.post("/feedback", async (req, res, next) => {
    if (!checkParams(req, res, ["content"])) return;
    request.post(functions.config().discord.feedback, {
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            username: `${req.googleAccount.displayName} (email:${req.googleAccount.email})`,
            content: req.body.content,
            avatar_url: req.googleAccount.photoURL
        })
    }, (error, res) => console.log(res.body))
    success(res);
})


module.exports = app;