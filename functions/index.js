const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();
const express = require('express');
const cookieParser = require('cookie-parser')();
const cors = require('cors')(/* { origin: true } */);
const app = express();
const v1Router = require("./v1/index");
const {error} = require("./returnResult");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
});

exports.api = functions.https.onRequest(app);

app.use(cors);
app.use("/v1", v1Router);
app.use("*", (req, res, next) => {
    error(res, 404);
    return;
})