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
const partsRouter = require("./parts/parts");
const kuromojin = require("kuromojin");
const analyze = require("negaposi-analyzer-ja");

const getDiff = (oldStr, newStr) => {
    return gitDiff(oldStr, newStr, { noHeaders: true, wordDiff: true, flags: "-b --word-diff-regex=." })
}

app.get("/:id", async (req, res, next) => {
    const postSnap = await db.doc(`posts/${req.params.id}`).get();
    if (!postSnap.exists) {
        error(res, 404, "post", "Post not found.");
        return;
    }
    const post = postSnap.data();
    post.author = (await post.author.get()).data();
    if (post.secret !== undefined) {
        if (post.secret.expired_at !== undefined && moment(moment()).isAfter(post.secret.expired_at)) {
            console.log("expired");
            error(res, 404, "post", "Post not found.");
            return;
        }
        delete post.secret;
    }
    success(res, post);
    return;
});

app.post("/", async (req, res, next) => {
    const postLimits = 2000;
    if (!checkParams(req, res, ["content"])) return;
    if (req.body.content.length > 2000) { error(res, 400, "too_long_content"); return; }
    const time = moment().format();
    let id
    do {
        id = moment(time).format("YYYYMMDDHHmmSS") + genRandomDigits(4);
    } while (await db.doc(`posts/${id}`).get().exists);
    console.log(req.body.content);
    const post = {
        id,
        content: {
            body: req.body.content
        },
        author: db.doc(`users/${req.user.id}`),
        createdAt: time,
        lastModified: time,
        modifiedTimes: 0,
        feeling: analyze(await kuromojin(req.body.content)),
    };

    if (req.body.expired_at !== undefined && moment(req.body.expired_at).isValid) {
        post.secret = {};
        post.secret.expired_at = moment(req.body.expired_at).format();
    }

    //Lists Search
    const targetLists = await db.collectionGroup("listUsers").where("id", "==", req.user.id).get();
    if (!targetLists.empty) {
        console.log("Matched");
        targetLists.forEach(async (list) => {
            console.log(list.parent);
        })
    }

    await db.doc(`posts/${id}`).set(post);
    success(res, post);
    return;
});

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

app.use("/", partsRouter);

module.exports = app;