const express = require("express");
const app = express();
const postRouter = require("./posts/posts");
const userRouter = require("./users/users");
const accountsRouter = require("./accounts/accounts");
const { error } = require("../returnResult");
const { errReport } = require("./errReport");

app.use((req, res, next) => {
    console.log(req.method);
    if (req.method !== "GET" &&  req.headers["content-type"] !== "application/json") {
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
app.get("/err-report", (req, res, next) => {
    //
})
app.get("/status", (req, res, next) => {
    res.send({
        status: "ok"
    })
})

app.use((err, req, res, next) => {
    error(res, 503, "handled", false, err.stack.split("\n").slice(0, 2).join("\n"));
    errReport(err.stack.split("\n").slice(0, 2).join("\n"), "server", req);
});

module.exports = app;