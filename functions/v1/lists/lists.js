const { db, admin } = require('../../firestore.js');
const moment = require("moment");
const rand = (min, max) => (Math.floor(Math.random() * (max - min + 1)) + min);
const genRandomDigits = (digits) => (rand(10 ** digits, (10 ** (digits + 1)) - 1));
const { error, success, checkParams } = require("../../returnResult");
const express = require("express");
const { user } = require('firebase-functions/lib/providers/auth');
const app = express();


app.get("/:id", async (req, res, next) => {
    const buf = [];
    const getUserData = async (ref) => {
        console.log(ref.path)
        const userId = ref.path.match(/^users\/(.*)$/)[1];
        if(buf.some(user => user.id_str === userId)){
            return buf.find(user => user.id_str === userId);
        }
        console.log("getData")
        const data = (await ref.get()).data();
        buf.push(data);
        return data;
    }
    const listRef = db.doc(`lists/${req.params.id}`);
    const list = await listRef.get();
    if (!list.exists) { error(res, 404, "lists", "List not found."); return; }
    if (
        list.data().scope_type === "secret"
        && !(await listRef.collection("listScopeUsers").doc(String(req.user.id)).get()).exists
    ) { error(res, 404, "lists"); return; }
    const result = {};
    if (req.query.posts === "true") {
        const postSnaps = await listRef.collection("listPosts").orderBy("id", "desc").limit(50).get();
        const posts = [];
        if (!postSnaps.empty) {
            for (let key in (postSnaps.docs)) {
                const post = await postSnaps.docs[key].data().post_reference.get()
                //if (!post.exists) continue;
                const postData = post.data();
                if (req.query.posts_author === "true") postData.author = await getUserData(postData.author);
                if (post.exists) posts.push(postData);
            }
        }
        result.posts = posts;
    }
    if (req.query.members === "true") {
        //
    }
    success(res, result);
    return;
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
        if (membersList[display_id] === req.user.id_str) currentUserRef = userRefs;
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
