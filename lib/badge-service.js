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
function createSVGBadge(count, style, label, color) {
    return new Promise(function (resolve, reject) {
		if (style == null) {
			style = "flat";
		}
		if (label == null) {
			label = "Vote++";
		}
		if (color == null) {
			color = "green";
		}
        badge({
            template: style,
            text: [label, String(count)],
            colorscheme: color
        }, function (svg) {
            resolve(svg);
        });
    });
}
module.exports = createSVGBadge;