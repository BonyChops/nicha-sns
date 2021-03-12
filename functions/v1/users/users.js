const express = require("express");
const app = express();

app.get("/", (req, res, next) => {
    //Get all users currently you've logged in
});

app.get("/:id", (req, res, next) => {
    //Search by id not screen_name
});



app.post("/register", (req, res, next) => {

});

app.delete("/goodbye", (req, res, next) => {

});

module.exports = app;
