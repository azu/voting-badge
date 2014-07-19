"use strict";
var input = document.getElementById("js-url");
var output = document.getElementById("js-copy-box");
function convertURL(url) {
    return "[![Vote](http://voting-badge.herokuapp.com/img?url="
        + url
        + ")](http://voting-badge.herokuapp.com/vote?url="
        + url
        + ")"
}
input.addEventListener("input", function (evt) {
    var url = input.value;
    console.log(url);
    output.value = convertURL(url);
});
