"use strict";
var currentBackEnd = null;
function leveldbSetup() {
    var filePath = "./db.db";
    var leveldb = require("./leveldb-backend");
    return leveldb.createDB(filePath);
}
function redisSetup() {
    var redis = require("./redis-backend");
    return redis.createDB();
}
function switchBackEnd(name) {
    switch (true) {
        case name === "leveldb":
            currentBackEnd = leveldbSetup();
            break;
        case name === "redis":
            currentBackEnd = redisSetup();
            break;
        default:
            currentBackEnd = leveldbSetup();
            break;
    }
    return currentBackEnd;
}
module.exports.currentBackEnd = switchBackEnd("redis");
module.exports.switchBackEnd = switchBackEnd;