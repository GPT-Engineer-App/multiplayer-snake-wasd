// Initialize the game canvas
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

// Game state variables
let snakes = [];
let food = null;
let gameStarted = false;

// Initialize the game
function initGame() {
  // Initialize player snakes
  snakes = [
    { x: 100, y: 100, direction: "right", length: 5 },
    { x: 400, y: 400, direction: "left", length: 5 },
  ];

  // Generate initial food
  generateFood();

  // Start the game loop
  gameStarted = true;
  gameLoop();
}

// Game loop
function gameLoop() {
  if (!gameStarted) return;

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update and draw the snakes
  snakes.forEach((snake) => {
    updateSnake(snake);
    drawSnake(snake);
  });

  // Draw the food
  drawFood();

  // Check for collisions
  checkCollisions();

  // Request the next frame
  requestAnimationFrame(gameLoop);
}

// Update snake position
function updateSnake(snake) {
  // Move the snake based on its direction
  switch (snake.direction) {
    case "up":
      snake.y -= 10;
      break;
    case "down":
      snake.y += 10;
      break;
    case "left":
      snake.x -= 10;
      break;
    case "right":
      snake.x += 10;
      break;
  }

  // Grow the snake if it ate food
  if (snake.x === food.x && snake.y === food.y) {
    snake.length++;
    generateFood();
  }
}

// Draw the snake
function drawSnake(snake) {
  ctx.fillStyle = "green";
  ctx.fillRect(snake.x, snake.y, 20, 20);
}

// Generate new food
function generateFood() {
  food = {
    x: Math.floor(Math.random() * (canvas.width - 20)),
    y: Math.floor(Math.random() * (canvas.height - 20)),
  };
}

// Draw the food
function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, 20, 20);
}

// Check for collisions
function checkCollisions() {
  // Check for self-collisions
  snakes.forEach((snake) => {
    if (snake.x < 0 || snake.x >= canvas.width || snake.y < 0 || snake.y >= canvas.height) {
      gameStarted = false;
      alert("Game Over!");
    }
  });

  // Check for inter-snake collisions
  for (let i = 0; i < snakes.length; i++) {
    for (let j = i + 1; j < snakes.length; j++) {
      if (snakes[i].x === snakes[j].x && snakes[i].y === snakes[j].y) {
        gameStarted = false;
        alert("Game Over!");
      }
    }
  }
}

// Handle keyboard input
document.addEventListener("keydown", (event) => {
  if (!gameStarted) return;

  switch (event.key) {
    case "w":
    case "ArrowUp":
      snakes[0].direction = "up";
      break;
    case "s":
    case "ArrowDown":
      snakes[0].direction = "down";
      break;
    case "a":
    case "ArrowLeft":
      snakes[0].direction = "left";
      break;
    case "d":
    case "ArrowRight":
      snakes[0].direction = "right";
      break;
  }
});

// Start the game
document.getElementById("start-game").addEventListener("click", initGame);
