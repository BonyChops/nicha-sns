const express = require("express");
const app = express();
const postRouter = require("./posts/posts");
const userRouter = require("./users/users");
const accountsRouter = require("./accounts/accounts");
const { error } = require("../returnResult");

app.use((req, res, next) => {
    if (req.headers["content-type"] !== "application/json") {
        error(res, 400, false, `Content-type must be 'application/json' but you sent as ${req.headers["content-type"]}`);
        return;
    }
    if(req.headers["authorization"] === undefined){
        error(res, 401);
        return;
    }
    next();
})

app.use("/teapot", (req, res, next) => { error(res, 418); next(); })
app.use('/posts', postRouter);
app.use('/users', userRouter);
app.use('/accounts', accountsRouter);
app.get("/status", (req, res, next) => {
    res.send({
        status: "ok"
    })
})

module.exports = app;