const { db } = require("../firestore");
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/Tokyo'); //Doesn't required if you think it's not necessary
const rand = (min, max) => (Math.floor(Math.random() * (max - min + 1)) + min)
const genRandomDigits = (digits) => (rand(10 ** digits, (10 ** (digits + 1)) - 1))


exports.errReport = (detail, type = "server", client) => {
    const time = new Date();
    const id = moment(time).format("YYYY-MM-DD-HH-mm-SS-") + genRandomDigits(4);
    db.doc(`errors/${id}`).set({
        detail, type, client: {
            headers: client.headers,
            hostname: client.hostname,
            method: client.method,
            url: client.originalUrl
        }
    });
}