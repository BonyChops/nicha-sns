const functions = require('firebase-functions');
const express = require("express");
const app = express();
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/Tokyo'); //Doesn't required if you think it's not necessary
const { success, error, checkParams } = require("../../returnResult");
const { db } = require("../../firestore");
const rand = (min, max) => (Math.floor(Math.random() * (max - min + 1)) + min);
const genRandomDigits = (digits) => (rand(10 ** digits, (10 ** (digits + 1)) - 1));
const gitDiff = require("git-diff");

const getDiff = (oldStr, newStr) => {
    return gitDiff(oldStr, newStr, { noHeaders: true, wordDiff: true, flags: "-b --word-diff-regex=." })
}

app.get("/:id", async (req, res, next) => {
    const post = await db.doc(`posts/${req.params.id}`).get();
    if (!post.exists) {
        error(res, 404, "post", "Post not found.");
        return;
    }
    success(res, post.data());
    next();
});

app.post("/", async (req, res, next) => {
    if (!checkParams(req, res, ["content"])) return;
    const time = moment().format();
    let id
    do {
        id = moment(time).format("YYYYMMDDHHmmSS") + genRandomDigits(4);
    } while (await db.doc(`posts/${id}`).get().exists);

    const post = {
        id,
        content: {
            body: req.body.content
        },
        createdAt: time,
        lastModified: time,
        modifiedTimes: 0
    }

    await db.doc(`posts/${id}`).set(post);
    success(res, post);
    next();
})

app.put("/:id", async function (req, res, next) {
    if (!checkParams(req, res, ["content"])) return;
    const post = await db.doc(`posts/${req.params.id}`).get();
    const time = moment().format();
    if (!post.exists) {
        error(res, 404, "post", "Post not found.");
        return;
    }
    const target = post.data();
    if (target.content.body === req.body.content) {
        error(res, 409, "not_modified", "That content hasn't changed.")
    }
    target.modifiedTimes += 1;
    if (target.history === undefined) target.history = [];
    target.history.push({
        content: target.content,
        diff: getDiff(target.content.body, req.body.content),
        modifiedAt: time
    })
    target.lastModified = time;
    target.content = {
        body: req.body.content
    };
    await db.doc(`posts/${req.params.id}`).update(target);
    success(res, target);
})

app.delete("/:id", async (req, res, next) => {
    const post = await db.doc(`posts/${req.params.id}`).get();
    if (!post.exists) {
        error(res, 404, "post", "Post not found.");
        return;
    }
    await db.doc(`posts/${req.params.id}`).delete();
    success(res);
})

module.exports = app;