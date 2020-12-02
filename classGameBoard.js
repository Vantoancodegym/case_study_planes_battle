class GameBoard {
    constructor() {
    this.score = 0;
    this.life=3;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    }

    drawBackGround() {
        this.image = document.getElementById("background");
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
        this.ctx.fillText("Live: " + this.life, 500, 30);
    }
    drawHp() {
        this.ctx.beginPath();
        this.ctx.font = FONT;
        this.ctx.fillStyle = SCORE_DEFAULT_COLOR;
        this.ctx.fillText("HP: " + allPlanes[0].hp, 300, 30);
    };

    clearRect() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
    };

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
            allBullet[i].drawBullet();
        }
    };

    buildPlane() {
        for(let i=0; i<dataPlanes.length; i++){
            let plane = new Planes(dataPlanes[i][0], dataPlanes[i][1], dataPlanes[i][2], dataPlanes[i][3], dataPlanes[i][4]);
            allPlanes.push(plane);
        }
    };

    setMovePlane(index, orientation, coordinates, reverse) {
        allPlanes[index].orientation = orientation;
        if(coordinates){
            allPlanes[index].x += reverse * allPlanes[index].speed;
        }else {
            allPlanes[index].y += reverse * allPlanes[index].speed;
        }
    };

    autoMoveEnemyPlanes() {
        for (let i = 0; i <= 4; i+=4) {
            this.setMovePlane(1+i, ORIENTATION_RIGHT, true, NONREVERSE);
            allPlanes[1+i].checkCollision()
            this.buildBullet(1+i, ORIENTATION_RIGHT, IMAGE_PLANE_SIZE, IMAGE_PLANE_SIZE/2);

            this.setMovePlane(2+i, ORIENTATION_UP, false, REVERSE);
            allPlanes[2+i].checkCollision()
            this.buildBullet(2+i, ORIENTATION_UP, IMAGE_PLANE_SIZE/2, 0);

            this.setMovePlane(3+i, ORIENTATION_LEFT, true, REVERSE);
            allPlanes[3+i].checkCollision()
            this.buildBullet(3+i, ORIENTATION_LEFT, 0, IMAGE_PLANE_SIZE/2);

            this.setMovePlane(4+i, ORIENTATION_DOWN, false, NONREVERSE);
            allPlanes[4+i].checkCollision()
            this.buildBullet(4+i, ORIENTATION_DOWN, IMAGE_PLANE_SIZE/2, IMAGE_PLANE_SIZE);
        }
    };

    drawAllPlanes() {
        for(let i=0; i<allPlanes.length; i++) {
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
    die(){
        if(this.life>1){
        allPlanes[0].x = 200;
        allPlanes[0].y = 200;
        allPlanes[0].hp=100;
        this.life--}else {
            this.endGame()
        }
    }

    endGame() {
        if (confirm("Do you want to replay?")) {
            location.replace("PlanesBattle.html");
        } else {
            allPlanes[0].x = this.canvas.width;
            allPlanes[0].y = this.canvas.height;
            for (let i = 0; i < allPlanes.length; i++) {
                allPlanes[i].speed = 0;
                allBullet[i].speed = 0;
            }
        }
    }
    increaseLevel(){
        if (this.score==30){
            for (let i = 1; i < 9; i++) {
                allPlanes[i].speed=10;
            }
        }else if (this.score==60){
            for (let i = 1; i < 9; i++) {
                allPlanes[i].speed==60;
            }
        }

    }
};

