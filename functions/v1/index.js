const express = require("express");
const { db, admin } = require("../firestore");
const app = express();
const postRouter = require("./posts/posts");
const userRouter = require("./users/users");
const accountsRouter = require("./accounts/accounts");
const { error, success } = require("../returnResult");
const { errReport } = require("./errReport");
const rand = (min, max) => (Math.floor(Math.random() * (max - min + 1)) + min);

app.use((req, res, next) => {
    if (req.method !== "GET" && !(["application/json", "application/x-www-form-urlencoded"]).includes(req.headers["content-type"])) {
        error(res, 400, false, `Content-type must be 'application/json' or 'application/x-www-form-urlencoded' but you sent as ${req.headers["content-type"]}`);
        return;
    }
    if (!(req.headers["authorization"] !== undefined || (req.method === "GET" && req.query.authorization !== undefined) || (req.method !== "GET" && req.body.authorization !== undefined))) {
        error(res, 401, "no_authorization_data");
        return;
    } else {
        let token = ([req.headers["authorization"], req.query.authorization, req.body.authorization]).find(token => token !== undefined);
        if(token.match(/^Bearer (.*)$/) !== null) token = token.match(/^Bearer (.*)$/)[1];
        admin.auth()
            .verifyIdToken(token)
            .then((decodedToken) => {
                req.user = decodedToken;
                console.log(decodedToken);
                next();
            })
            .catch((e) => {
                error(res, 401);
                console.log(e);
                return;
            });
    }
})

app.use("/teapot", (req, res, next) => {
    ({
        0: () => success(res, { mes: "Success to brew coffee with a teapot!" }),
        1: () => error(res, 418)
    })[rand(0, 1)]();

    next();
})
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

module.exports = app;