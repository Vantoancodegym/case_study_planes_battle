class Bonus{
    constructor(x,y,) {
        this.x=x;
        this.y=y;
        this.count=0;
        this.isdisapear=true;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
    }
    checkEatBonus(){
        if(((this.x-IMAGE_PLANE_SIZE/2<=allPlanes[0].x&& this.x+IMAGE_PLANE_SIZE/2>=allPlanes[0].x)
            && (this.y-IMAGE_PLANE_SIZE/2<=allPlanes[0].y&& this.y+IMAGE_PLANE_SIZE/2>=allPlanes[0].y))){
            bonusAudio.play();
            if (gameBoard.life<=6){
                gameBoard.life++
            }
            gameBoard.score+=2;
            flagBonus=true;
            this.isdisapear=true;
            this.apear();
        }
    }
    updateCount(){
        if(this.count < 5) {
            this.count++;
        }else{
            this.count = 0;
        }
    }
    drawBonus(){
        this.updateCount();
        this.img=document.getElementById("bonus");
        this.ctx.beginPath();
        this.ctx.drawImage(this.img,40*this.count , 0, 40, 40,this.x,this.y,40,40)
    }
    apear(){
        if (this.isdisapear){
        this.x = random(this.canvas.width-IMAGE_PLANE_SIZE, 0);
        this.y = random(this.canvas.height-IMAGE_PLANE_SIZE, 0);
        this.isdisapear=false
        }
    }
}