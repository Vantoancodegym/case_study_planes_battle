class Planes{
    constructor(x, y, speed, hp, color) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.hp = hp;
    this.color = color;
    this.isAlive = true;
    this.isDisapear = false;
    this.orientation = ORIENTATION_DEFAULT;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    }

    takeDamage(bullet) {
            if(this.hp <= bullet.damage){
                this.hp = 0;
                this.isAlive = false;
                if(this == allPlanes[0]){
                    gameBoard.die();
                    // gameBoard.score = 0;
                }else {
                    gameBoard.score ++;
                    this.disapear();
                    this.apear();
                }
            }else {
                this.hp -= bullet.damage;
            }
    };
    drawPlane() {
        this.image = document.getElementById("plane-" + this.orientation + "-" + this.color);
        this.ctx.beginPath();
        this.ctx.drawImage(this.image, this.x, this.y);
    };
    checkCollision(){
        for (let i = 1; i <allPlanes.length ; i++) {
            if(((allPlanes[0].x-IMAGE_PLANE_SIZE/2<=allPlanes[i].x&& allPlanes[0].x+IMAGE_PLANE_SIZE/2>=allPlanes[i].x)
                &&(allPlanes[0].y==allPlanes[i].y))||
                ((allPlanes[0].x==allPlanes[i].x)&&
                 (allPlanes[0].y-IMAGE_PLANE_SIZE/2<=allPlanes[i].y&& allPlanes[0].y+IMAGE_PLANE_SIZE/2>=allPlanes[i].y))){
                 gameBoard.die();
            }
        }
    }

    disapear() {
        if(this.isAlive == false) {
            this.isDisapear = true;
        }
    };

    apear() {
        if(this.isDisapear){ //clean được
                    this.x = random(this.canvas.width-IMAGE_PLANE_SIZE, 0);
                    this.y = random(this.canvas.height-IMAGE_PLANE_SIZE, 0);
            }
            this.isAlive = true;
            this.hp = ENEMY_HP;
        }

    };
