const express = require("express");
const app = express();
const postRouter = require("./posts/posts");
const userRouter = require("./users/users");
const accountsRouter = require("./accounts/accounts");

app.use('/posts', postRouter);
app.use('/users', userRouter);
app.use('/accounts', accountsRouter);
app.get("/status", (req, res, next) => {
    res.send({
        status: "ok"
    })
})

module.exports = app;