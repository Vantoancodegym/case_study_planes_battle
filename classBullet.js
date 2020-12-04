class Bullet {
    constructor(x, y, radius, speed, damage, plane) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
    this.damage = damage;
    this.plane = plane;
    this.orientation = plane.orientation;
    this.isCollision = false;

    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    }

    drawBullet() {
        this.ctx.beginPath();
        this.ctx.fillStyle = bullet_color;
        this.ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        this.ctx.fill();
    };
    checkCollision() {
        if(this.plane == allPlanes[0]){
            for (let i=1; i<allPlanes.length; i++){
                if(allPlanes[i].x < this.x && this.x < allPlanes[i].x + IMAGE_PLANE_SIZE
                    && allPlanes[i].y < this.y && this.y < allPlanes[i].y + IMAGE_PLANE_SIZE){
                    this.isCollision = true;
                    this.disapear();
                    allPlanes[i].takeDamage(this);
                }
            }
        }else {
            if(allPlanes[0].x < this.x && this.x < allPlanes[0].x + IMAGE_PLANE_SIZE
                && allPlanes[0].y < this.y && this.y < allPlanes[0].y + IMAGE_PLANE_SIZE){
                this.isCollision = true;
                this.disapear();
                allPlanes[0].takeDamage(this);
            }
        }
    };
    // checkCollisionBullet(){
    //     if (this.plane==allPlanes[0]){
    //     for (let i = 0; i < allBullet.length; i++) {
    //        if (this!=allBullet[i]){
    //            if (this.x==allBullet[i].x&&this.y==allBullet[i].y){
    //                allBullet[i].isCollision=true;
    //                this.isCollision=true;
    //                this.disapear();
    //                allBullet[i].disapear();
    //            }
    //         }
    //     }
    //     }
    // }


    disapear() {
        for (let i=0; i<allBullet.length; i++){
            if(allBullet[i].isCollision == true
                || allBullet[i].x < 0
                || allBullet[i].x > this.canvas.width
                || allBullet[i].y < 0
                || allBullet[i].y > this.canvas.height){
                allBullet.splice(i, 1);
            }
        }
    };
};