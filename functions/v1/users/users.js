const { db, admin } = require('../../firestore.js');
const { error, success } = require("../../returnResult");
const express = require("express");
const app = express();

app.get("/", async (req, res, next) => {
    //Get all users currently you've logged in
    const users = await db.doc(`accounts/${req.user.uid}`).get();
    if (!users.exists) {
        error(res, 404, "users_created", "You've not created first user.");
        return;
    }
    success(res, post.data());
    next();
});

app.post("/", (req, res, next) => {

});

app.get("/:id/profile", (req, res, next) => {
    const screenNameMode = (req.query.screen_name === "true");
    console.log(req.params);
    console.log(req.query);
});

app.put("/:id/profile")


app.delete("/goodbye", (req, res, next) => {

});

module.exports = app;
