class GameBoard {
    constructor() {
    this.score = 0;
    this.life=3;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    }
    drawBackGroundBegin() {
        this.image = document.getElementById("background-begin");
        this.ctx.beginPath();
        this.ctx.drawImage(this.image, 0, 0);
    };

    drawBackGround() {
        this.image = document.getElementById("background");
        this.ctx.beginPath();
        this.ctx.drawImage(this.image, 0, 0);
    };
    drawGameOver() {
        this.image = document.getElementById("gameOver");
        this.ctx.beginPath();
        this.ctx.drawImage(this.image, 0, 0);
    };

    drawScore() {
        this.ctx.beginPath();
        this.ctx.font = FONT;
        this.ctx.fillStyle = SCORE_DEFAULT_COLOR;
        this.ctx.fillText("Score: " + this.score, 10, 30);
    };
    drawLife(){
        this.ctx.beginPath();
        this.ctx.font = FONT;
        this.ctx.fillStyle = SCORE_DEFAULT_COLOR;
        this.ctx.fillText("Life: " + this.life, 500, 30);
    }
    drawHp() {
        this.ctx.beginPath();
        this.ctx.font = FONT;
        this.ctx.fillStyle = SCORE_DEFAULT_COLOR;
        this.ctx.fillText("HP: " + allPlanes[0].hp, 300, 30);
    };
    drawExplosive(x,y) {
        this.image = document.getElementById("explosive");
        this.ctx.beginPath();
        this.ctx.drawImage(this.image, x, y);
    };

    clearRect() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    buildPlanes() {
        for(let i=0; i<dataPlanes.length; i++){
            let plane = new Planes(dataPlanes[i][0], dataPlanes[i][1], dataPlanes[i][2], dataPlanes[i][3], dataPlanes[i][4]);
            allPlanes.push(plane);
        }
    };

    setMovePlane(index, orientation, coordinates, reverse) {
        allPlanes[index].setOrientation(orientation);
        if(coordinates=="horizontal"){
            allPlanes[index].x += reverse * allPlanes[index].speed;
        }else {
            allPlanes[index].y += reverse * allPlanes[index].speed;
        }
    };

    autoMoveEnemyPlanes() {
        for (let i = 0; i <= 4; i+=4) {
            this.setMovePlane(1+i, ORIENTATION_RIGHT, "horizontal", NONREVERSE);
            allPlanes[1+i].checkCollision()
            this.buildBullet(1+i, ORIENTATION_RIGHT, IMAGE_PLANE_SIZE, IMAGE_PLANE_SIZE/2);

            this.setMovePlane(2+i, ORIENTATION_UP, "vertical", REVERSE);
            allPlanes[2+i].checkCollision()
            this.buildBullet(2+i, ORIENTATION_UP, IMAGE_PLANE_SIZE/2, 0);

            this.setMovePlane(3+i, ORIENTATION_LEFT, "horizontal", REVERSE);
            allPlanes[3+i].checkCollision()
            this.buildBullet(3+i, ORIENTATION_LEFT, 0, IMAGE_PLANE_SIZE/2);

            this.setMovePlane(4+i, ORIENTATION_DOWN, "vertical", NONREVERSE);
            allPlanes[4+i].checkCollision()
            this.buildBullet(4+i, ORIENTATION_DOWN, IMAGE_PLANE_SIZE/2, IMAGE_PLANE_SIZE);
        }
        if(this.score%2==0){
            bossDenAudio.play();
        this.autoMoveBoss();
        allPlanes[9].drawPlane();}
    };

    drawAllPlanes() {
        for(let i=0; i<allPlanes.length-1; i++) {
            allPlanes[i].drawPlane();
        }
    };

    checkOutMap(){
        for (let i=1; i<allPlanes.length; i++){
            if(allPlanes[i].x < 0
                || allPlanes[i].x > canvas.width
                || allPlanes[i].y < 0
                || allPlanes[i].y > canvas.height){
                allPlanes[i].isDisapear = true;
                allPlanes[i].apear();
            }
        }
    };
    buildBullet(index, orientation, positionX, positionY) {
        if(allPlanes[index].orientation == orientation){
            let x = allPlanes[index].x + positionX;
            let y = allPlanes[index].y + positionY;
            let bullet = new Bullet(x, y, BULLET_DEFAULT_RADIUS, BULLET_DEFAULT_SPEED, BULLET_DEFAULT_DAMAGE, allPlanes[index]);
            allBullet.push(bullet);
        }
    };

    buildMyBulletCase() {
        if (!flagBonus){
        switch (allPlanes[0].orientation) {
            case ORIENTATION_UP:
                this.buildBullet(0, ORIENTATION_UP, IMAGE_PLANE_SIZE/2, 0);
                break;
            case ORIENTATION_DOWN:
                this.buildBullet(0, ORIENTATION_DOWN, IMAGE_PLANE_SIZE/2, IMAGE_PLANE_SIZE);
                break;
            case ORIENTATION_LEFT:
                this.buildBullet(0, ORIENTATION_LEFT, 0, IMAGE_PLANE_SIZE/2);
                break;
            case ORIENTATION_RIGHT:
                this.buildBullet(0, ORIENTATION_RIGHT, IMAGE_PLANE_SIZE, IMAGE_PLANE_SIZE/2);
                break;
        }
        }else {
            this.buildMyBulletCase2()
        }
    };
    buildMyBulletCase2(){
        switch (allPlanes[0].orientation) {
            case ORIENTATION_UP:
                this.buildBullet(0, ORIENTATION_UP, IMAGE_PLANE_SIZE*1/5, 0);
                this.buildBullet(0, ORIENTATION_UP, IMAGE_PLANE_SIZE*4/5, 0);
                break;
            case ORIENTATION_DOWN:
                this.buildBullet(0, ORIENTATION_DOWN, IMAGE_PLANE_SIZE*1/5, IMAGE_PLANE_SIZE);
                this.buildBullet(0, ORIENTATION_DOWN, IMAGE_PLANE_SIZE*4/5, IMAGE_PLANE_SIZE);
                break;
            case ORIENTATION_LEFT:
                this.buildBullet(0, ORIENTATION_LEFT, 0, IMAGE_PLANE_SIZE*1/5);
                this.buildBullet(0, ORIENTATION_LEFT, 0, IMAGE_PLANE_SIZE*4/5);
                break;
            case ORIENTATION_RIGHT:
                this.buildBullet(0, ORIENTATION_RIGHT, IMAGE_PLANE_SIZE, IMAGE_PLANE_SIZE*1/5);
                this.buildBullet(0, ORIENTATION_RIGHT, IMAGE_PLANE_SIZE, IMAGE_PLANE_SIZE*4/5);
                break;
        }

    }
    buildBossBullet(){
        this.buildBullet(9,ORIENTATION_DOWN,BOSS_SIZE*1/5,0);
        this.buildBullet(9,ORIENTATION_DOWN,BOSS_SIZE*4/5,0);

    }
    autoMoveBoss(){
        this.setMovePlane(9, ORIENTATION_DOWN, "horizontal", NONREVERSE);
        allPlanes[9].checkCollision();
        this.buildBossBullet();
    }

    setMoveBullet() {
        for (let i=0; i<allBullet.length; i++){
            switch (allBullet[i].orientation) {
                case ORIENTATION_UP:
                    allBullet[i].y -= allBullet[i].speed;
                    allBullet[i].checkCollision();
                    // allBullet[i].checkCollisionBullet();
                    break;
                case ORIENTATION_DOWN:
                    allBullet[i].y += allBullet[i].speed;
                    allBullet[i].checkCollision();
                    // allBullet[i].checkCollisionBullet();
                    break;
                case ORIENTATION_LEFT:
                    allBullet[i].x -= allBullet[i].speed;
                    allBullet[i].checkCollision();
                    // allBullet[i].checkCollisionBullet();
                    break;
                case ORIENTATION_RIGHT:
                    allBullet[i].x += allBullet[i].speed;
                    allBullet[i].checkCollision();
                    // allBullet[i].checkCollisionBullet();
                    break;
            }
        }
    };

    drawAllBullet() {
        for(let i=0; i<allBullet.length; i++){
            randomColor();
            allBullet[i].drawBullet();
        }
    };
    checkDie(){
        if(this.life>0){
        toangAudio.play();
        allPlanes[0].x = 200;
        allPlanes[0].y = 200;
        allPlanes[0].hp=100;
        this.life--
         flagBonus=false;
        }
    }

    checkEndGame() {
        if(this.life==0){
            gameOverAudio.play();
            pauseGame();
            this.drawGameOver()
            if (confirm("Do you want to replay?")) {
                window.location.reload();
            }
        }
    }
    increaseLevel(){
        if (this.score==20){
            for (let i = 1; i < 9; i++) {
                allPlanes[i].speed=6;
            }
        }else if (this.score==40){
            for (let i = 1; i < 9; i++) {
                allPlanes[i].speed=9;
            }
        }

    }
};

