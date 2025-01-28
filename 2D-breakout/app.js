const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');
const blockWidth = 100;
const blockHeight = 20;
const ballDiameter = 20;
const boardWidth = 560;
const boardHeight = 300;
let xDirection = -2;
let yDirection = 2;

const userStart = [230, 10];
let currentPosition = userStart;

const ballStart = [270, 40];
let ballCurrentPosition = ballStart;

let timerId;
let score = 0;

// Sound effects
const blockHitSound = new Audio('block-hit.mp3'); // Block hit sound
const gameOverSound = new Audio('game-over.mp3'); // Game over sound
const winSound = new Audio('win.mp3'); // Win sound

// Block class
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + blockWidth, yAxis];
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
        this.topLeft = [xAxis, yAxis + blockHeight];
    }
}

// All blocks
const blocks = [
    new Block(10, 270), new Block(120, 270), new Block(230, 270), 
    new Block(340, 270), new Block(450, 270), new Block(10, 240), 
    new Block(120, 240), new Block(230, 240), new Block(340, 240), 
    new Block(450, 240), new Block(10, 210), new Block(120, 210), 
    new Block(230, 210), new Block(340, 210), new Block(450, 210),
];

// Add blocks to grid
function addBlocks() {
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = blocks[i].bottomLeft[0] + 'px';
        block.style.bottom = blocks[i].bottomLeft[1] + 'px';
        grid.appendChild(block);
    }
}
addBlocks();

// Add user paddle
const user = document.createElement('div');
user.classList.add('user');
grid.appendChild(user);
drawUser();

// Add ball
const ball = document.createElement('div');
ball.classList.add('ball');
grid.appendChild(ball);
drawBall();

// Move user paddle
function moveUser(e) {
    switch (e.key) {
        case 'ArrowLeft':
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 10;
                drawUser();
            }
            break;
        case 'ArrowRight':
            if (currentPosition[0] < (boardWidth - blockWidth)) {
                currentPosition[0] += 10;
                drawUser();
            }
            break;
    }
}
document.addEventListener('keydown', moveUser);

// Draw user paddle
function drawUser() {
    user.style.left = currentPosition[0] + 'px';
    user.style.bottom = currentPosition[1] + 'px';
}

// Draw ball
function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px';
    ball.style.bottom = ballCurrentPosition[1] + 'px';
}

// Move ball
function moveBall() {
    ballCurrentPosition[0] += xDirection;
    ballCurrentPosition[1] += yDirection;
    drawBall();
    checkForCollisions();
}
timerId = setInterval(moveBall, 30);

// Check for collisions
function checkForCollisions() {
    // Block collision
    for (let i = 0; i < blocks.length; i++) {
        if (
            ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
            ballCurrentPosition[1] + ballDiameter > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1]
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'));
            allBlocks[i].classList.remove('block');
            blocks.splice(i, 1);
            playSound(blockHitSound);
            changeDirection();
            score++;
            scoreDisplay.innerHTML = score;

            if (blocks.length === 0) {
                scoreDisplay.innerHTML = 'You Win!';
                playSound(winSound);
                clearInterval(timerId);
                document.removeEventListener('keydown', moveUser);
            }
        }
    }

    // Wall collision
    if (ballCurrentPosition[0] >= (boardWidth - ballDiameter) || ballCurrentPosition[0] <= 0 || ballCurrentPosition[1] >= (boardHeight - ballDiameter)) {
        changeDirection();
    }

    // Paddle collision
    if (
        ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth &&
        ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight
    ) {
        changeDirection();
    }

    // Game over
    if (ballCurrentPosition[1] <= 0) {
        clearInterval(timerId);
        scoreDisplay.innerHTML = 'You Lose!';
        playSound(gameOverSound);
        document.removeEventListener('keydown', moveUser);
    }
}

// Play sound utility
function playSound(sound) {
    sound.play();
}

// Change ball direction
function changeDirection() {
    if (xDirection === 2 && yDirection === 2) yDirection = -2;
    else if (xDirection === 2 && yDirection === -2) xDirection = -2;
    else if (xDirection === -2 && yDirection === -2) yDirection = 2;
    else if (xDirection === -2 && yDirection === 2) xDirection = 2;
}
