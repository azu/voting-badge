"use strict";
var redis = require("redis");
var client = null;
var api = {
    ready: ready,
    createDB: createDB,
    destroyDB: destroyDB,
    getKey: getKey,
    putKey: putKey,
    delKey: delKey,
    incrementKey: incrementKey
};
function ready(callback) {
    if (client == null) {
        return callback(new Error("DB is not initialized"));
    }
    if (createDB.initilized) {
        callback(null, client);
    } else {
        client.on("ready", function (error) {
            if (error) {
                callback(error);
            } else {
                callback(null, client);
            }
        });
    }
}
/**
 * create db sync
 * @param filePath
 * @returns {{createDB: createDB, destroyDB: destroyDB, getKey: getKey, putKey: putKey, delKey: delKey, incrementKey: incrementKey}}
 */
function createDB(filePath) {
    client = redis.createClient();
    client.on("error", function (err) {
        console.log("Error " + err);
    });
    createDB.initilized = false;
    client.on("ready", function (err) {
        createDB.initilized = true;
    });
    return api;
}
function destroyDB(filePath, callback) {
    throw new Error("not");
}
function getKey(key, callback) {
    client.get(key, function (error, value) {
        if (value == null) {
            var err = new Error("key is not found");
            err.notFound = true;
            return callback(err);
        }
        callback(error, value);
    });
}
function putKey(key, value, callback) {
    client.set(key, value, callback);
}
function delKey(key, callback) {
    client.del(key, callback);
}
function incrementKey(key, callback) {
    client.incr(key, callback);
}

module.exports = api;