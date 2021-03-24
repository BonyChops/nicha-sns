const admin = require('firebase-admin');
admin.firestore.DocumentReference.prototype.toJSON = function () {
    return this.path;
}
admin.firestore.DocumentReference.prototype.test = function () {
    console.log("test called");
}

admin.initializeApp();

exports.db = admin.firestore();
exports.admin = admin;
