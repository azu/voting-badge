"use strict";
var levelup = require("levelup");
var db;
var levelIncr = require("level-incr");
var incrDB;
var api = {
    ready: ready,
    createDB: createDB,
    destroyDB: destroyDB,
    getKey: getKey,
    putKey: putKey,
    delKey: delKey,
    incrementKey: incrementKey
};
/**
 * is ready callback
 * @param callback
 * @returns {*}
 */
function ready(callback) {
    if (db == null) {
        return callback(new Error("DB is not initialized"));
    }
    callback(null, db);
}
/**
 * create db sync
 * @param filePath
 * @returns {{createDB: createDB, destroyDB: destroyDB, getKey: getKey, putKey: putKey, delKey: delKey, incrementKey: incrementKey}}
 */
function createDB(filePath) {
    db = levelup(filePath);
    incrDB = levelIncr(db, 0);
    return api;
}
function destroyDB(filePath, callback) {
    require("leveldown").destroy(filePath, callback);
}
function getKey(key, callback) {
    db.get(key, callback);
}
function putKey(key, value, callback) {
    db.put(key, value, callback);
}
function delKey(key, callback) {
    db.del(key, callback);
}
function incrementKey(key, callback) {
    incrDB.incr(key, callback);
}

module.exports = api;