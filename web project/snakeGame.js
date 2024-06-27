//Board variables
var blockSize = 25; //each block is 25
var rows = 20; //there are 20 rows
var cols = 20; //there are 20 columns
var board; 
var context; //what we use to draw with
var score = 0;
var gameOver = false;

//Snake variables
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
var velocityX = 0; //SNake needs to have a speed because it is moving
var velocityY = 0; //begins at zero as it is still for both of them
var snakeBody = []; //array that will hold our snake body!

//Apple variables
var appleX;
var appleY;

//rotten apple code
var rotX;
var rotY;

//Game play loop

window.onload = function(){

    board = document.getElementById("board"); //takes the id of the canvas from the html
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    randomApple(); //generates random coordinates for apple, e.g intialises them

    document.addEventListener("keyup", changeDirection);

    setInterval(update,1000/10); //calls update every 10 milliseconds

}

//Update function

function update(){

    //Check whether the game is over
    if(gameOver){
        return;
    }

    //Draw board
    drawBoard();

    //Draw apple
    drawApple();
   
   // Snake eats apple detection
if (snakeX == appleX && snakeY == appleY) {
    score++;
    snakeBody.push([appleX, appleY]); // Pushes the 'current' coordinates to the snakeBody array
    randomApple(); // Changes the random apple coordinates

    // Update the score display
    const scoreCurrent = document.getElementById('message');
    scoreCurrent.textContent = 'Score: ' + score;
}

    //snake body growth

    for(let i = snakeBody.length-1;i>0;i--){ 
        snakeBody[i] = snakeBody[i-1]
    }

    if(snakeBody.length){
        snakeBody[0] = [snakeX,snakeY]
    }

    //snake being drawn
    drawSnake();

    //game over check
    gameCheck();

}

function drawBoard(){
    for(let rowC = 0; rowC < rows; rowC++){ //moves through the rows
        for(let colC = 0; colC < cols; colC++){

            if((rowC+colC) % 2 == 0){ //creating alternating grid of lightGreen and paleGreen
                context.fillStyle = 'lightGreen';
            }

            else{
                context.fillStyle = 'paleGreen';
            }

            context.fillRect(colC * blockSize, rowC*blockSize, blockSize, blockSize);

        }


    }
}

function drawApple(){
    context.fillStyle = "red";
    context.fillRect(appleX,appleY,blockSize,blockSize);
}

function randomApple(){ //This ensure the apple isn't fixed in one place!
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

function drawSnake(){
    context.fillStyle="darkBlue";
    snakeX += velocityX * blockSize; 
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX,snakeY,blockSize,blockSize);

    for(let i=0; i<snakeBody.length;i++){
        context.fillRect(snakeBody[i][0],snakeBody[i][1],blockSize,blockSize)
    }
}


function gameCheck(){

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



