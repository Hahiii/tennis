document.addEventListener("DOMContentLoaded", () => {
  let canvas = document.querySelector("#canvas");
  canvas.addEventListener("mousemove", mouseOverEvent, false);
  canvas.addEventListener("click", mouseClickEvent, false);
  let canvasContext = canvas.getContext('2d');
  canvasContext.font = "20px Georgia";

  let ballX = 50;
  let ballSpeedX = 5;
  let ballY = 50;
  let ballSpeedY = 5;
  let paddel1Y = 250;
  let paddel2Y = 250;
  let player1Score = 0;
  let player2Score = 0;
  const PADDLE_THICKNESS = 10;
  const PADDLE_HEIGHT = 100;
  const WINNING_SCORE = 1;
  let framesPerSecond = 30;
  let showignWinScreen = false;

  let interval = setInterval(() => {
    drawEverything();
    moveEverything()
  }, 1000 / framesPerSecond)

  function calculateMousePos(event) {
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;
    let mouseX = event.clientX - rect.left - root.scrollLeft;
    let mouseY = event.clientY - rect.top - root.scrollTop;

    return {
      x: mouseX,
      y: mouseY
    }
  }

  function mouseOverEvent(event) {
    let mousePos = calculateMousePos(event);
    paddel1Y = mousePos.y - (PADDLE_HEIGHT / 2);
  }

  function mouseClickEvent() {
    if (showignWinScreen) {
      showignWinScreen = false;
      player1Score = 0;
      player2Score = 0;
      ballSpeedY = 5;
      interval = setInterval(() => {
        drawEverything();
        moveEverything()
      }, 1000 / framesPerSecond)
    }
  }


  function drawNet(centerX, width, height, drawColor) {
    for (let i = 5; i < canvas.height; i += 40) {
      canvasContext.fillStyle = drawColor;
      canvasContext.fillRect(centerX, i, width, height)
    }
  }

  function drawEverything() {
    if (showignWinScreen) {
      let colorPlayer1 = "red";
      let colorPlayer2 = "red";
      let text = "";
      colorRect(0, 0, canvas.width, canvas.height, "black");
      if (player1Score === WINNING_SCORE) {
        colorPlayer1 = "green";
        text = "Left Player Won!";
        colorWinningScreen(text, ((canvas.width / 2) - text.length * (30 / 4)), 100, "white", 30)
      } else if (player2Score === WINNING_SCORE) {
        colorPlayer2 = "green";
        text = "Right Player Won!";
        colorWinningScreen(text, ((canvas.width / 2) - text.length * (30 / 4)), 100, "white", 30)
      }
      text = "Click to Play again";
      colorPlayerScore(player1Score, 100, 100, colorPlayer1);
      colorPlayerScore(player2Score, canvas.width - 100, 100, colorPlayer2);
      colorWinningScreen(text, ((canvas.width / 2) - text.length * (20 / 4)), 400, "white", 20);
      clearInterval(interval);
      return;
    }
    // draws the background.
    colorRect(0, 0, canvas.width, canvas.height, "black");
    // draws the net
    drawNet(canvas.width / 2 - 1, 2, 30, "white")

    // left players paddle
    colorRect(0, paddel1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, "white");
    // right players paddle
    colorRect(canvas.width - PADDLE_THICKNESS, paddel2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, "white");
    // draws the ball.
    colorCircle(ballX, ballY, 10, "white");
    // draws the score for player 1
    colorPlayerScore(player1Score, 100, 100);
    // draws the score for player 2
    colorPlayerScore(player2Score, canvas.width - 100, 100)
  }

  function computerMovement() {
    let paddel2YCenter = paddel2Y + (PADDLE_HEIGHT / 2)
    if (paddel2YCenter < ballY - 35) {
      paddel2Y += 6
    } else if (paddel2YCenter > ballY + 35) {
      paddel2Y -= 6
    }
  }
  // makes the moves
  function moveEverything() {
    computerMovement()
    ballX += ballSpeedX
    ballY += ballSpeedY
    if (ballX < 0) {
      if (ballY > paddel1Y && ballY < paddel1Y + PADDLE_HEIGHT) {
        ballSpeedX = -ballSpeedX
        let deltaY = ballY - (paddel1Y + PADDLE_HEIGHT / 2);
        ballSpeedY = deltaY * .35;
      } else {
        player2Score += 1;
        resetBall();
      }
    }
    if (ballX >= canvas.width) {
      if (ballY > paddel2Y && ballY < paddel2Y + PADDLE_HEIGHT) {
        ballSpeedX = -ballSpeedX
        let deltaY = ballY - (paddel2Y + PADDLE_HEIGHT / 2);
        ballSpeedY = deltaY * .35;
      } else {
        player1Score += 1;
        resetBall();
      }
    }
    if (ballY < 0) {
      ballSpeedY = -ballSpeedY
    }
    if (ballY >= canvas.height) {
      ballSpeedY = -ballSpeedY
    }
  }

  // draws the ball 
  function colorCircle(centerX, centerY, radius, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true)
    canvasContext.fill();
  }

  // draws players paddle
  function colorRect(centerX, centerY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(centerX, centerY, width, height)
  }

  // draws the players score
  function colorPlayerScore(score, centerX, centerY, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillText(score, centerX, centerY)
  }

  // draws the winning text
  function colorWinningScreen(text, centerX, centerY, drawColor, textSize) {
    canvasContext.font = `${textSize}px Georgia`;
    canvasContext.fillStyle = drawColor;
    console.log(centerX);

    canvasContext.fillText(text, centerX, centerY)
  }

  // resets the ball
  function resetBall() {
    if (player1Score === WINNING_SCORE || player2Score === WINNING_SCORE) {
      showignWinScreen = true;
    }
    ballSpeedX = -ballSpeedX
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
  }
  drawEverything()

})