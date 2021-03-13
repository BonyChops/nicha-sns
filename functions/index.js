const functions = require("firebase-functions");
const express = require('express');
const cookieParser = require('cookie-parser')();
const cors = require('cors')(/* { origin: true } */);
const app = express();
const v1Router = require("./v1/index");
const { error } = require("./returnResult");
const timeoutSec = 3;

const runtimeOpts = {
    timeoutSeconds: timeoutSec + 1,
}

exports.api = functions.runWith(runtimeOpts).https.onRequest(app);

app.use(cors);
app.use((req, res, next) => {
    res.setTimeout(timeoutSec * 1000, () => {
        error(res, 503);
        return;
    });
    next();
});
app.use("/v1", v1Router);

app.use("*", (req, res, next) => {
    error(res, 404);
    next();
})
