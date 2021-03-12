const functions = require('firebase-functions');
const express = require("express");
const app = express();
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/Tokyo'); //Doesn't required if you think it's not necessary
const { success, error, checkParams } = require("../../returnResult");
const { db } = require("../../firestore");
const rand = (min, max) => (Math.floor(Math.random() * (max - min + 1)) + min)
const genRandomDigits = (digits) => (rand(10 ** digits, (10 ** (digits + 1)) - 1))

app.get("/:id", async(req, res, next) => {
    const post = await db.doc(`posts/${req.params.id}`).get();
    if(!post.exists){
        error(res, 404, "post", "Post not found.");
        return;
    }
});

app.post("/", async(req, res, next) => {
    checkParams(req, res, ["content"]);
    const time = new Date();
    let id
    do {
        id = moment(time).format("YYYYMMDDHHmmSS") + genRandomDigits(4);
    } while (await db.doc(`posts/${id}`).get().exists);

    const post = {
        id,
        content: req.body.content,
        timestamp: time,
        editedTimes: 0
    }

    await db.doc(`posts/${id}`).set(post);
    success(res, post);
    return;
})

app.put("/:id", async(req, res, next) => {
    const post = await db.doc(`posts/${req.params.id}`).get();
    if(!post.exists){
        error(res, 404, "post", "Post not found.");
        return;
    }
})

app.delete("/:id", async(req, res, next) => {
    const post = await db.doc(`posts/${req.params.id}`).get();
    if(!post.exists){
        error(res, 404, "post", "Post not found.");
        return;
    }
    await db.doc(`posts/${req.params.id}`).delete();
    success(res);
})

module.exports = app;