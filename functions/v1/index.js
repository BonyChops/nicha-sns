const express = require("express");
const functions = require('firebase-functions');
const { db, admin } = require("../firestore");
const app = express();
const postRouter = require("./posts/posts");
const userSelfRouter = require("./users/usersSelf");
const userRouter = require("./users/users");
const accountsRouter = require("./accounts/accounts");
const { error, success, checkParams } = require("../returnResult");
const { errReport } = require("./errReport");
const rand = (min, max) => (Math.floor(Math.random() * (max - min + 1)) + min);

app.use(async (req, res, next) => {
    if (req.method !== "GET" && !(["application/json", "application/x-www-form-urlencoded"]).includes(req.headers["content-type"])) {
        error(res, 400, "content_type_wrong", `Content-type must be 'application/json' or 'application/x-www-form-urlencoded' but you sent as ${req.headers["content-type"]}`);
        return;
    }
    if (!(req.headers["authorization"] !== undefined || (req.method === "GET" && req.query.authorization !== undefined) || (req.method !== "GET" && req.body.authorization !== undefined))) {
        error(res, 401, "no_authorization_data");
        return;
    } else {
        let token = ([req.headers["authorization"], req.query.authorization, req.body.authorization]).find(token => token !== undefined);
        if (token.match(/^Bearer (.*)$/) !== null) token = token.match(/^Bearer (.*)$/)[1];
        const decodedToken = await new Promise((resolve, reject) => {
            admin.auth().verifyIdToken(token).then((decodedToken) => {
                resolve(decodedToken);
            }).catch((e) => {
                error(res, 401, "invalid_token");
                console.log(e);
                reject(e);
            });
        })
        const account = await new Promise((resolve, reject) => {
            admin.auth().getUser(decodedToken.uid)
                .then((userRecord) => {
                    resolve(userRecord);
                }).catch((e) => {
                    error(res, 501);
                    console.log(e);
                    reject(e);
                });
        })
        const googleAccount = account.providerData.find(data => data.providerId === "google.com");
        if (googleAccount === undefined) {
            error(res, 401, "not_allowed_account", "You've tried to login with invalid domain's account.");
            admin.auth().deleteUser(account.uid);
            return;
        }
        if (functions.config().schooladdress === undefined) { error(res, 500, "email_config_not_set"); return; }
        if (googleAccount.email.match(new RegExp(`${functions.config().schooladdress.student}$`)) === null) {
            error(res, 401, "not_allowed_account", "You've tried to login with invalid domain's account.");
            admin.auth().deleteUser(account.uid);
            return;
        }
        console.log(googleAccount);
        req.account = account;
        req.googleAccount = googleAccount;
        console.log(decodedToken);
        next();
    }
})

app.use("/teapot", (req, res, next) => {
    ({
        0: () => success(res, { mes: "Success to brew coffee with a teapot!" }),
        1: () => error(res, 418)
    })[rand(0, 1)]();

    next();
})

app.use('/users', userSelfRouter);

app.use(async (req, res, next) => {
    if (!checkParams(req, res, ["current_user"], "current_user_not_provided", "You have to provide current user's uid.")) return;
    const currentUser = (req.method === "GET" ? req.query.current_user : req.body.current_user);
    const account = await db.doc(`accounts/${req.account.uid}`).get();
    if (!account.exists) { error(res, 401, "users_not_created", "You've not created first user."); return; }
    const user = await account.data().users.find(user => user === currentUser);
    if (user === undefined) { error(res, 401, "current_user_not_found", "Uid you've provided is not valid."); return; }
    req.user = user;
    next();
})

app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/accounts', accountsRouter);
app.get("/err-report", (req, res, next) => {
    //
})
app.get("/status", (req, res, next) => {
    res.send({
        status: "ok"
    })
})

module.exports = app;