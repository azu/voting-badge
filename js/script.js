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
function updateOutput() {
    var url = input.value;
    console.log(url);
    output.value = convertURL(url);
}
input.addEventListener("keyup", function (evt) {
    updateOutput();
});
input.addEventListener("paste", function (evt) {
    setTimeout(updateOutput, 0);
});
