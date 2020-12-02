function moveSelection(evt) {
    if(flag){
    switch (evt.keyCode) {
        case 80:
            pauseGame();
            break;
        case 32://space
            gameBoard.buildMyBulletCase();
            break;
        case 37://left
            if(allPlanes[0].x>=0){
            gameBoard.setMovePlane(0, ORIENTATION_LEFT, true, REVERSE);}
            allPlanes[0].checkCollision()
            break;
        case 39://right
            if(allPlanes[0].x<=canvas.width-IMAGE_PLANE_SIZE){
            gameBoard.setMovePlane(0, ORIENTATION_RIGHT, true, NONREVERSE);}
            allPlanes[0].checkCollision()
            break;
        case 38://up
            if(allPlanes[0].y>=0){
            gameBoard.setMovePlane(0, ORIENTATION_UP, false, REVERSE);}
            allPlanes[0].checkCollision()
            break;
        case 40://down
            if(allPlanes[0].y<=canvas.height-IMAGE_PLANE_SIZE){
            gameBoard.setMovePlane(0, ORIENTATION_DOWN, false, NONREVERSE);}
            allPlanes[0].checkCollision()
            break;
    }
    }else {
    if (evt.keyCode==13){
        startGame()
    }
    }
}