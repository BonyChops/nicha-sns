const {db, admin} = require('../../firestore.js');
const rand = (min, max) => (Math.floor(Math.random() * (max - min + 1)) + min);
const genRandomDigits = (digits) => (rand(10 ** digits, (10 ** (digits + 1)) - 1));
const {error, success, checkParams} = require("../../returnResult");
const express = require("express");
const app = express();


app.get("/:id/profile", (req, res, next) => {
    const screenNameMode = (req.query.screen_id === "true");
    console.log(req.params);
    console.log(req.query);
});

app.put("/:id/profile")

module.exports = app;
