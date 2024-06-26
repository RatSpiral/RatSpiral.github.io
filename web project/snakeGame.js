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

window.onload = function(){ //this happens when window is loaded.
    //get the board
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");


    update(); //this function will redraw the board
}

function update(){
    context.fillStyle = "lightGreen";
    context.fillRect(0,0,board.width,board.height) //starting at the corner of the page e.g (0,0) and make it light green
}