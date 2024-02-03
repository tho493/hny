"use strict";

function shuffle(t) {
    let r = t.length;
    for (; r > 0;) {
        let e = Math.floor(Math.random() * r);
        r--, [t[r], t[e]] = [t[e], t[r]]
    }
    return t
}
const typeWriterElement = document.getElementById("typewriter"),
    textArray = [shuffle(arrayList)[0]];

function delWriter(t, r, e) {
    r >= 0 ? (typeWriterElement.innerHTML = t.substring(0, r--), setTimeout(function() {
        delWriter(t, r, e)
    }, 10 + 100 * Math.random())) : "function" == typeof e && setTimeout(e, TIME_WRITER)
}

function typeWriter(t, r, e) {
    r < t.length + 1 ? (typeWriterElement.innerHTML = t.substring(0, r++), setTimeout(function() {
        typeWriter(t, r++, e)
    }, 250 - 100 * Math.random())) : r === t.length + 1 && setTimeout(function() {
        delWriter(t, r, e)
    }, TIME_WRITER)
}

function StartWriter(t) {
    void 0 === textArray[t] ? setTimeout(function() {
        StartWriter(0)
    }, TIME_WRITER) : t < textArray[t].length + 1 && typeWriter(textArray[t], 0, function() {
        StartWriter(t + 1)
    })
}
setTimeout(function() {
    StartWriter(0)
}, TIME_WRITER);