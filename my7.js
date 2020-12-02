let flag = true;
let gameBoard = new GameBoard();
let allPlanes = [];
let allBullet = [];
gameBoard.buildPlane();

function startGame(){
    run = setInterval(function (){
        gameBoard.clearRect();
        gameBoard.drawBackGround();
        gameBoard.drawAllPlanes();
        gameBoard.autoMoveEnemyPlanes();
        gameBoard.checkOutMap();
        gameBoard.setMoveBullet();
        gameBoard.drawAllBullet();
        gameBoard.drawScore();
        gameBoard.increaseLevel()
        gameBoard.drawLife();
        gameBoard.drawHp();
    }, TIME_SETINTERVAL_DEFAULT);
    flag=true;
}
function pauseGame(){
    clearInterval(run);
    flag = false;
}
startGame();


