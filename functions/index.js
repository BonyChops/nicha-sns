const functions = require("firebase-functions");
const express = require('express');
require("express-async-errors");
const cookieParser = require('cookie-parser')();
const app = express();
const v1Router = require("./v1/index");
const { error } = require("./returnResult");
const whitelist = ['http://localhost']
/* const corsOptions = {
    origin: function (origin, callback) {
        console.log(origin);
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
} */
const corsOptions = {}
const cors = require('cors');
const timeoutSec = 3;

const runtimeOpts = {
    timeoutSeconds: timeoutSec + 1,
}

exports.api = functions.region('asia-northeast1').runWith(runtimeOpts).https.onRequest(app);

app.use((err, req, res, next) => {
    error(res, 500, "handled", false, err.stack.split("\n").slice(0, 2).join("\n"));
    errReport(err.stack.split("\n").slice(0, 2).join("\n"), "server", req);
});
app.use(cors(corsOptions));
app.use((req, res, next) => {
    res.setTimeout(timeoutSec * 1000, () => {
        error(res, 503, "timedout");
        return;
    });
    next();
});
app.use("/v1", v1Router);

app.use("*", (req, res, next) => {
    error(res, 404);
    next();
})
