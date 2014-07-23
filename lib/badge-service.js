"use strict";
var badge = require('gh-badges');
var Promise = require("bluebird");
function createBadgeURL(count) {
    return Promise.resolve("https://img.shields.io/badge/Vote:+1:-" + count + "-red.svg?style=flat");
}
/**
 *
 * @param count
 * @returns {Promise}
 */
function createSVGBadge(count) {
    return new Promise(function (resolve, reject) {
        badge({
            template: "flat",
            text: ["Vote++", String(count)],
            colorscheme: "green"
        }, function (svg) {
            resolve(svg);
        });
    });
}
module.exports = createSVGBadge;