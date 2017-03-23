var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

function getRandomInt(min, max) {
  return (Math.random() * (max - min + 1)) + min;
}

function botball() {
  this.x = getRandomInt(0, canvas.width)
  this.y = canvas.height;
  this.dx = getRandomInt(-3, 2)
  this.dy = -2;
}

function topball() {
  this.x = getRandomInt(0, canvas.width)
  this.y = 0;
  this.dx = getRandomInt(-3, 2)
  this.dy = 2;
}

function leftball() {
  this.x = 0;
  this.y = getRandomInt(0, canvas.height);
  this.dx = 2
  this.dy = getRandomInt(-3, 2)
}

function rightball() {
  this.x = canvas.width;
  this.y = getRandomInt(0, canvas.height);
  this.dx = -2
  this.dy = getRandomInt(-3, 2)
}

var pieceX = (canvas.width-2)/2;
var pieceY = (canvas.height-2)/2
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

var ball1 = new botball()
var ball2 = new botball()
var ball3 = new botball()
var ball4 = new topball()
var ball5 = new topball()
var ball6 = new topball()
var ball7 = new leftball()
var ball8 = new leftball()
var ball9 = new leftball()
var ball10 = new rightball()
var ball11 = new rightball()
var ball12 = new rightball()

var balls =[ball1, ball2, ball3, ball4, ball5, ball6, ball7, ball8, ball9, ball10, ball11, ball12]

function drawBall(ball) {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, 2, 0, Math.PI*2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
    ball = check(ball)
}

function draw(balls) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(var i = 0, len = balls.length; i<len; i ++) {
      drawBall(balls[i]);
      balls[i].x += balls[i].dx;
      balls[i].y += balls[i].dy;
    }
    if(rightPressed) { pieceX += 2;}
    if(leftPressed) { pieceX -= 2;}
    if (upPressed) {pieceY -=2}
    if (downPressed) {pieceY+=2}
    drawPiece()
}

function check(ball) {
  if (ball.x <0 ){ // if ball goes off left it becomes a bot ball
      ball.x = getRandomInt(0, canvas.width)
      ball.y = canvas.height;
      ball.dx = getRandomInt(-3, 2)
      ball.dy = -2;
  } else if (ball.x > canvas.width) { // if ball goes off right it becomes a top ball
      ball.x = getRandomInt(0, canvas.width)
      ball.y = 0;
      ball.dx = getRandomInt(-3, 2)
      ball.dy = 2;
  }
    else if (ball.y < 0) { // if ball goes off bottom it becomes a right ball
      ball.x = canvas.width;
      ball.y = getRandomInt(0, canvas.height);
      ball.dx = -2
      ball.dy = getRandomInt(-3, 2)
  }
    else if (ball.y > canvas.height) { // if ball goes off top it becomes a left ball
      ball.x = 0;
      ball.y = getRandomInt(0, canvas.height);
      ball.dx = 2
      ball.dy = getRandomInt(-3, 2)
  }
}

function drawPiece() {
  ctx.beginPath();
  ctx.arc(pieceX, pieceY, 3, 0, Math.PI*2);
  ctx.fillStyle = "yellow";
  ctx.fill();
  ctx.closePath();
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
    else if(e.keyCode == 38) {
        upPressed = true;
    }
    else if(e.keyCode == 40) {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
    else if(e.keyCode == 38) {
        upPressed = false;
    }
    else if(e.keyCode == 40) {
        downPressed = false;
    }
}



setInterval(function() { draw(balls); }, 10);

