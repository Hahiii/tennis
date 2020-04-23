document.addEventListener("DOMContentLoaded", () => {
  let canvas = document.querySelector("#canvas");
  canvas.addEventListener("mousemove", mouseOverEvent, false);
  let canvasContext = canvas.getContext('2d');
  let ballX = 50;
  let ballSpeedX = 5;
  let ballY = 50;
  let ballSpeedY = 5;
  let paddel1Y = 250;
  let paddel2Y = 250;
  const PADDLE_THICKNESS = 10;
  const PADDLE_HEIGHT = 100;
  let framesPerSecond = 30;

  setInterval(() => {
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

  function drawEverything() {
    // draws the background.
    colorRect(0, 0, canvas.width, canvas.height, "black");
    // left players paddle
    colorRect(0, paddel1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, "white");
    // right players paddle
    colorRect(canvas.width - PADDLE_THICKNESS, paddel2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, "white");
    // draws the ball.
    colorCircle(ballX, ballY, 10, "white")
  }

  function computerMovement() {
    let paddel2YCenter = paddel2Y + (PADDLE_HEIGHT / 2)
    if (paddel2YCenter < ballY - 35) {
      paddel2Y += 6
    } else if (paddel2YCenter > ballY + 35) {
      paddel2Y -= 6
    }
  }
  function moveEverything() {
    computerMovement()
    ballX += ballSpeedX
    ballY += ballSpeedY
    if (ballX < 0) {
      if (ballY > paddel1Y && ballY < paddel1Y + PADDLE_HEIGHT) {
        ballSpeedX = -ballSpeedX
      } else {
        resetBall()
      }
    }
    if (ballX >= canvas.width) {
      if (ballY > paddel2Y && ballY < paddel2Y + PADDLE_HEIGHT) {
        ballSpeedX = -ballSpeedX
      } else {
        resetBall()
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

  function resetBall() {
    ballSpeedX = -ballSpeedX
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
  }
  drawEverything()


})