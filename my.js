let canvas = document.getElementById("myCanvas");
function random(x, y) {
    return Math.floor((Math.random()*x)+y);
}
function doReady() {
    window.addEventListener("keydown", moveSelection);
}
