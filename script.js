var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 4;

var player1Y = 250;
var player2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_SPEED = 40;

var player1Score = 5;
var player2Score = 5;
const WINNING_SCORE = 0;

var gameOver = false;

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  document.addEventListener('keydown', movePaddle);

  setInterval(function() {
    if (!gameOver) {
      drawEverything();
    }
  }, 1000 / 30);

  document.getElementById('restartButton').addEventListener('click', function() {
    player1Score = 5;
    player2Score = 5;
    gameOver = false;
    document.getElementById('restartButton').style.display = 'none';
  });
};

function movePaddle(evt) {
  if (gameOver) {
    return;
  }

  switch(evt.keyCode) {
    case 87: // W key
      player1Y -= PADDLE_SPEED;
      break;
    case 83: // S key
      player1Y += PADDLE_SPEED;
      break;
    case 38: // Up arrow
      player2Y -= PADDLE_SPEED;
      break;
    case 40: // Down arrow
      player2Y += PADDLE_SPEED;
      break;
  }
}

function drawEverything() {
  // Draw canvas background
  canvasContext.fillStyle = '#000';
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  // Draw paddles
  canvasContext.fillStyle = '#00F';
  canvasContext.fillRect(0, player1Y, 20, PADDLE_HEIGHT);

  canvasContext.fillStyle = '#F00';
  canvasContext.fillRect(canvas.width - 20, player2Y, 20, PADDLE_HEIGHT);

  // Draw ball
  canvasContext.fillStyle = '#FFF';
  canvasContext.beginPath();
  canvasContext.arc(ballX, ballY, 10, 0, Math.PI * 2, true);
  canvasContext.fill();

  // Move ball
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Ball collision with top and bottom
  if (ballY < 0 || ballY > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  // Ball collision with paddles
  if (ballX < 20 && ballY > player1Y && ballY < player1Y + PADDLE_HEIGHT ||
      ballX > canvas.width - 20 && ballY > player2Y && ballY < player2Y + PADDLE_HEIGHT) {
    ballSpeedX = -ballSpeedX;
  }

  // Ball out of bounds
  if (ballX < 0) {
    player1Score = Math.max(player1Score - 1, 0); // No negative scores
    ballReset();
  }

  if (ballX > canvas.width) {
    player2Score = Math.max(player2Score - 1, 0); // No negative scores
    ballReset();
  }

  // Draw scores
  canvasContext.font = "30px Arial";
  canvasContext.fillStyle = '#FFF';
  canvasContext.fillText(player1Score, 100, 100);
  canvasContext.fillText(player2Score, canvas.width - 100, 100);

  // Check for game over
  if (player1Score === WINNING_SCORE || player2Score === WINNING_SCORE) {
    gameOver = true;
    document.getElementById('restartButton').style.display = 'block';
    canvasContext.fillText("Game over Human", canvas.width / 2 - 100, canvas.height / 2);
  }
}

function ballReset() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
}
