"use strict";
var currentBackEnd = null;
function leveldbSetup() {
    var filePath = "./db.db";
    var leveldb = require("./leveldb-backend");
    return leveldb.createDB(filePath);
}
function switchBackEnd(name) {
    switch (true) {
        case name === "leveldb":
            currentBackEnd = leveldbSetup();
            break;
        case name === "redis":
            break;
        default:
            currentBackEnd = leveldbSetup();
            break;
    }
    return currentBackEnd;
}
module.exports.currentBackEnd = switchBackEnd();
module.exports.switchBackEnd = switchBackEnd;