const functions = require('firebase-functions');
const express = require("express");
const app = express();
const { success } = require("../../returnResult");

app.get("/:id", (req, res, next) => {

});

app.post("/", (req, res, next) => {
    console.log(req.body)
    success(res,req.body);
    return;
})

app.put("/:id", (req, res, next) => {

})

app.delete("/:id", (req, res, next) => {

})

module.exports = app;