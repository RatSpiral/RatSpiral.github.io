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

//snake code!
var snakeX = blockSize * 5;
var snakeY = blockSize * 5; // Will begin at 5,5. 

//apple code!
var appleX;
var appleY;

window.onload = function(){ //this happens when window is loaded.
    //get the board
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    randomFood();
    update(); //this function will redraw the board
}

function update(){
    context.fillStyle = "lightGreen";
    context.fillRect(0,0,board.width,board.height) //starting at the corner of the page e.g (0,0) and make it light green

    //snake
    context.fillStyle="darkBlue";
    context.fillRect(snakeX,snakeY,blockSize,blockSize); // paints at the cooardinate of 5,5 (snakex/y) and fills one square 

    //Apple
    context.fillStyle = "red";
    context.fillRect(appleX,appleY,blockSize,blockSize);
}

function randomFood(){ //This ensure the apple isn't fixed in one place!
    appleX = Math.floor(Math.random() * cols) * blockSize;
    appleY = Math.floor(Math.random() * rows) * blockSize;
}

