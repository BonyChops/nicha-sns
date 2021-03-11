const express = require("express");
const app = express();
const postRouter = require("./post");

app.use('/post', postRouter);
app.get("/status", (req, res, next) => {
    res.send({
        status: "ok"
    })
})

module.exports = app;