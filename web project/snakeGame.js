//A canvas is a certain amount of squares
//These will have rows and columns which we must be aware of in this game
//As the board squares have meaning e.g location of snake. 
//We will be able to refer to x and y. 

//up will be y-1, down is y+1. 
//boxSize variable controls the size of each individual piece of the board. 
//boxSize must be considered e.g all x and y must be multipled by boxSize!

//board code!

var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context; //what we use to draw with
var gameOver = false;

//snake code!
var snakeX = blockSize * 5;
var snakeY = blockSize * 5; // Will begin at 5,5. 
var velocityX = 0;//Snake needs to have a speed because it is moving
var velocityY = 0; //begin at zero as it begins the game still
var snakeBody = [];

//apple code!
var appleX;
var appleY;

window.onload = function(){ //this happens when window is loaded.
    //get the board
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    randomFood(); //places!
    document.addEventListener("keyup", changeDirection);
  
    setInterval(update, 1000/10); //every hundred milliseconds, it will run the update function
}

function update(){

    if(gameOver){
        return;
    }
    //board (canvas)
    drawBoard();
    //context.fillStyle = "lightGreen";
    //context.fillRect(0,0,board.width,board.height) //starting at the corner of the page e.g (0,0) and make it light green

    //Apple
    context.fillStyle = "red";
    context.fillRect(appleX,appleY,blockSize,blockSize);

    if (snakeX == appleX && snakeY == appleY){
        snakeBody.push([appleX,appleY]); //grows the next part of the body where the food was. 
        randomFood();
    }

    for(let i = snakeBody.length-1; i>0; i--){
        snakeBody[i] = snakeBody[i-1];
    }

    if(snakeBody.length){
        snakeBody[0] = [snakeX,snakeY]
    }

    //snake
    createSnake();
   
// game over conditions
if (snakeX < 0 || snakeX > cols*blockSize || snakeY <0 || snakeY > rows*blockSize){
    gameOver = true;
    alert("Game Over! You left the game board!"); //causes notification to pop up!
}

for (let i = 0; i < snakeBody.length; i++){
    if(snakeX==snakeBody[i][0] && snakeY == snakeBody[i][1]){
        gameOver = true;
        alert("Game Over! You touched your tail!")
    }
}
    
}


//!!!!!!I COULD ADD POISON WHICH RANDOMLY GENERATES
 
function createSnake(){
    context.fillStyle="darkBlue";
    snakeX += velocityX * blockSize/2;
    snakeY += velocityY * blockSize/2;
    context.fillRect(snakeX,snakeY,blockSize,blockSize); // paints at the cooardinate of 5,5 (snakex/y) and fills one square 

    for (let i = 0; i <snakeBody.length;i++){
        context.fillRect(snakeBody[i][0],snakeBody[i][1],blockSize,blockSize);
    }

}

function randomFood(){ //This ensure the apple isn't fixed in one place!
    appleX = Math.floor(Math.random() * cols) * blockSize; //(0-19) * 25 gives us our column number!
    appleY = Math.floor(Math.random() * rows) * blockSize;
}

function changeDirection(e){
    if (e.code == "ArrowUp" && velocityY != 1){ //Going up! Can't eat own tail, so additional check added for all directions
        velocityX = 0;
        velocityY = -1;

    }

    else if (e.code == "ArrowDown" && velocityY != -1){ //Going up!
        velocityX = 0;
        velocityY = 1;

    }

    else if (e.code == "ArrowLeft" && velocityX != 1){ //Going up!
        velocityX = -1;
        velocityY = 0;
    }

    else if (e.code == "ArrowRight" && velocityX != -1){ //Going up!
        velocityX = 1
        velocityY = 0;

    }
}

function drawBoard(){
    for (let rowCount = 0; rowCount < rows; rowCount++) {
        for (let colCount = 0; colCount < cols; colCount++) {
            if ((rowCount + colCount) % 2 == 0) { //Creating an alternating grid of lightGreen and paleGreens
                context.fillStyle = 'lightGreen';
            } else {
                context.fillStyle = 'paleGreen';
            }
            // Draw the square
            context.fillRect(colCount * blockSize, rowCount * blockSize, blockSize, blockSize);
        }
    }
}






