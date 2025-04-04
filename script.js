const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const grid = 20;
const canvasSize = 400;
canvas.width = canvasSize;
canvas.height = canvasSize;

let snake = [{ x: 100, y: 100 }];
let apple = randomPosition();

let dx = grid;
let dy = 0;
let count = 0;
let speed = 6;
let changingDirection = false;

function gameLoop() {
    requestAnimationFrame(gameLoop);

    if (++count < speed) return;
    count = 0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveSnake();
    drawApple();
    drawSnake();
    checkCollisions();
    changingDirection = false;
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    // Check apple collision
    if (head.x === apple.x && head.y === apple.y) {
        apple = randomPosition();
    } else {
        snake.pop(); // Remove tail if no apple eaten
    }
}

function drawSnake() {
    ctx.fillStyle = "#4CAF50";
    snake.forEach((segment, index) => {
        ctx.fillRect(segment.x, segment.y, grid, grid);
    });
}

function drawApple() {
    ctx.fillStyle = "#E53935";
    ctx.fillRect(apple.x, apple.y, grid, grid);
}

function checkCollisions() {
    const head = snake[0];

    // Wall collision
    if (
        head.x < 0 || head.x >= canvas.width ||
        head.y < 0 || head.y >= canvas.height
    ) {
        return gameOver();
    }

    // Self collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return gameOver();
        }
    }
}

function randomPosition() {
    const x = Math.floor(Math.random() * (canvas.width / grid)) * grid;
    const y = Math.floor(Math.random() * (canvas.height / grid)) * grid;
    return { x, y };
}

function gameOver() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
    ctx.fillRect(0, canvas.height / 2 - 40, canvas.width, 80);

    ctx.fillStyle = "#fff";
    ctx.font = "24px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Game Over! Press OK to restart", canvas.width / 2, canvas.height / 2);

    setTimeout(() => {
        if (confirm("Game Over! Deseja jogar novamente?")) {
            resetGame();
        }
    }, 100);
}

function resetGame() {
    snake = [{ x: 100, y: 100 }];
    dx = grid;
    dy = 0;
    apple = randomPosition();
    changingDirection = false;
}

document.addEventListener("keydown", handleDirection);

function handleDirection(e) {
    if (changingDirection) return;
    changingDirection = true;

    const goingUp = dy === -grid;
    const goingDown = dy === grid;
    const goingLeft = dx === -grid;
    const goingRight = dx === grid;

    switch (e.key) {
        case "ArrowUp":
            if (!goingDown) { dx = 0; dy = -grid; }
            break;
        case "ArrowDown":
            if (!goingUp) { dx = 0; dy = grid; }
            break;
        case "ArrowLeft":
            if (!goingRight) { dx = -grid; dy = 0; }
            break;
        case "ArrowRight":
            if (!goingLeft) { dx = grid; dy = 0; }
            break;
    }
}

gameLoop();
