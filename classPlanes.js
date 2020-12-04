class Planes{
    constructor(x, y, speed, hp, color) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.hp = hp;
    this.color = color;
    this.isDisapear = false;
    this.orientation = ORIENTATION_DEFAULT;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    }
    setOrientation(orientation){
        this.orientation=orientation;
    }

    takeDamage(bullet) {
            if(this.hp <= bullet.damage){
                this.hp = 0;
                if(this == allPlanes[0]){
                    gameBoard.checkDie();
                }else {
                    gameBoard.drawExplosive(this.x,this.y)
                    explosionAudio.play();
                    gameBoard.score ++;
                    this.isDisapear=true;
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
                && (allPlanes[0].y-IMAGE_PLANE_SIZE/2<=allPlanes[i].y&& allPlanes[0].y+IMAGE_PLANE_SIZE/2>=allPlanes[i].y))){
                 gameBoard.checkDie();
            }
        }
    }

    apear() {
        if(this.isDisapear){
                    this.x = random(this.canvas.width-IMAGE_PLANE_SIZE, 0);
                    this.y = random(this.canvas.height-IMAGE_PLANE_SIZE, 0);
            }
            this.isDisapear= false;
            this.hp = ENEMY_HP;
        }

    };
