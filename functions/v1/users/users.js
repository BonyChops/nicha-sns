const express = require("express");
const app = express();

app.get("/", (req, res, next) => {
    //Get all users currently you've logged in
});

app.post("/", (req, res, next) => {

});

app.get("/:id/profile", (req, res, next) => {
    const screenNameMode = (req.query.screen_name === "true");
    console.log(req.params);
    console.log(req.query);
});

app.put("/:id/profile")


app.delete("/goodbye", (req, res, next) => {

});

module.exports = app;
