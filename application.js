$(document).ready(function () {
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var multiplier = 1
var score = 0;
var highscore = localStorage.getItem("highscore");
$('.high').html(highscore)

function getMultiplier() {
  if (score%10 >5 && score%10 <9) {
    multiplier=1.5
  }
  else {
    multiplier=1
  }
}

function saveScore() {
  if (highscore !== null){
      if (score > highscore) {
          localStorage.setItem("highscore", score);
      }
  }
  else{
      localStorage.setItem("highscore", score);
  }
}



function getRandomInt(min, max) {
  return (Math.random() * (max - min + 1)) + min;
}


function botball() {
  this.x = getRandomInt(0, canvas.width)
  this.y = canvas.height;
  this.dx = getRandomInt(-3, 2)*multiplier
  this.dy = -1.25*multiplier
}

function topball() {
  this.x = getRandomInt(0, canvas.width)
  this.y = 0;
  this.dx = getRandomInt(-3, 2)*multiplier
  this.dy = 1.25*multiplier
}

function leftball() {
  this.x = 0;
  this.y = getRandomInt(0, canvas.height);
  this.dx = 1.25*multiplier
  this.dy = getRandomInt(-3, 2)*multiplier
}

function rightball() {
  this.x = canvas.width;
  this.y = getRandomInt(0, canvas.height);
  this.dx = 1.25*multiplier
  this.dy = getRandomInt(-3, 2)*multiplier
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
var ball13 = new botball()
var ball14 = new topball()
var ball15 = new leftball()



var balls =[ball1, ball2, ball3, ball4, ball5, ball6, ball7, ball8, ball9, ball10, ball11, ball12, ball13, ball14, ball15]

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
      var spreadX = balls[i].x - pieceX - balls[i].dx;
      var spreadY = balls[i].y - pieceY - balls[i].dy;
      var distance = Math.sqrt(spreadX * spreadX + spreadY * spreadY)
      if (distance < 6) {
        saveScore()
        document.location.reload();

      }
    }
    drawPiece()
    if(rightPressed && pieceX < canvas.width-4) { pieceX += 2;}
    if(leftPressed && pieceX >4) { pieceX -= 2;}
    if (upPressed && pieceY >4) {pieceY -=2}
    if (downPressed && pieceY< canvas.height-4) {pieceY+=2}

}

function check(ball) {
  if (ball.x <0 ){ // if ball goes off left it becomes a bot ball
      ball.x = getRandomInt(0, canvas.width)
      ball.y = canvas.height;
      ball.dx = getRandomInt(-3, 2)
      ball.dy = -1.25*multiplier;
  } else if (ball.x > canvas.width) { // if ball goes off right it becomes a top ball
      ball.x = getRandomInt(0, canvas.width)
      ball.y = 0;
      ball.dx = getRandomInt(-3, 2)
      ball.dy = 1.25*multiplier;
  }
    else if (ball.y < 0) { // if ball goes off bottom it becomes a right ball
      ball.x = canvas.width;
      ball.y = getRandomInt(0, canvas.height);
      ball.dx = -1.25*multiplier
      ball.dy = getRandomInt(-3, 2)
  }
    else if (ball.y > canvas.height) { // if ball goes off top it becomes a left ball
      ball.x = 0;
      ball.y = getRandomInt(0, canvas.height);
      ball.dx = 1.25*multiplier
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

function timer() {
  var secs = 0;
  var id = setInterval(function(){
    secs++;
    score=secs
    getMultiplier()
    $('.time').html(secs)
    }, 1000);
}

function run() {
  setInterval(function() { draw(balls); }, 10);
}
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
    else if(e.keyCode == 32) {
      $('#overlay').hide();
      run();
      timer()
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

});

