let canvas = document.getElementById("myCanvas");
function random(x, y) {
    return Math.floor((Math.random()*x)+y);
}
function doReady() {
    window.addEventListener("keydown", moveSelection);
}
let chiuAudio = document.getElementById("chiu");
let explosionAudio = document.getElementById("explosion");
let gameOverAudio = document.getElementById("gameOverAudio");
let toangAudio = document.getElementById("toang");
let bossDenAudio = document.getElementById("bossDen");
let bonusAudio = document.getElementById("bonusAudio");