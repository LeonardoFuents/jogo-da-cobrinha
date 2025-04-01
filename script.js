const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const grid = 10;
let count = 0;
let snake = [{ x: 50, y: 50 }];
let apple = { x: 80, y: 80 };
let dx = grid;
let dy = 0;

function gameLoop() {
    requestAnimationFrame(gameLoop);
    if (++count < 4) return;
    count = 0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveSnake();
    checkCollisions();
    drawSnake();
    drawApple();
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    if (head.x === apple.x && head.y === apple.y) {
        apple = randomPosition();
    } else {
        snake.pop();
    }
}

function drawSnake() {
    ctx.fillStyle = "green";
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, grid, grid);
    });
}

function drawApple() {
    ctx.fillStyle = "red";
    ctx.fillRect(apple.x, apple.y, grid, grid);
}

function checkCollisions() {
    const head = snake[0];
    if (
        head.x < 0 || head.x >= canvas.width ||
        head.y < 0 || head.y >= canvas.height ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        alert("Game Over!");
        snake = [{ x: 50, y: 50 }];
        dx = grid;
        dy = 0;
    }
}

function randomPosition() {
    const x = Math.floor(Math.random() * (canvas.width / grid)) * grid;
    const y = Math.floor(Math.random() * (canvas.height / grid)) * grid;
    return { x, y };
}

document.addEventListener("keydown", e => {
    if (e.key === "ArrowUp" && dy === 0) {
        dx = 0;
        dy = -grid;
    } else if (e.key === "ArrowDown" && dy === 0) {
        dx = 0;
        dy = grid;
    } else if (e.key === "ArrowLeft" && dx === 0) {
        dx = -grid;
        dy = 0;
    } else if (e.key === "ArrowRight" && dx === 0) {
        dx = grid;
        dy = 0;
    }
});

gameLoop();
