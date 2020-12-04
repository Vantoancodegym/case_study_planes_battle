let flag = false;
let flagBonus = false;
let gameBoard = new GameBoard();
let allPlanes = [];
let allBullet = [];
let bonus = new Bonus(random(canvas.width-IMAGE_PLANE_SIZE, 0),random(canvas.height-IMAGE_PLANE_SIZE, 0))
gameBoard.buildPlanes();

function startGame(){
    run = setInterval(function (){
        gameBoard.clearRect();
        gameBoard.drawBackGround();
        bonus.drawBonus()
        gameBoard.autoMoveEnemyPlanes();
        gameBoard.drawAllPlanes();
        gameBoard.checkOutMap();
        gameBoard.increaseLevel()
        gameBoard.setMoveBullet();
        gameBoard.drawAllBullet();
        gameBoard.drawScore();
        gameBoard.drawLife();
        gameBoard.drawHp();
        bonus.checkEatBonus()
        gameBoard.checkEndGame()
    }, TIME_SETINTERVAL_DEFAULT);
    flag=true;
}
function pauseGame(){
    clearInterval(run);
    flag = false;
}


