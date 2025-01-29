const hitSound = new Audio('hit.mp3');
const missSound = new Audio('miss.mp3');
const gameOverSound = new Audio('gameover.mp3');

const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');
const highScoreDisplay = document.querySelector('#high-score');

let result = 0;
let hitPosition;
let currentTime = 60;
let timerId = null;
let highScore = localStorage.getItem('highScore') || 0; 

highScoreDisplay.textContent = 'High Score: ' + highScore;

function randomSquare() {
  squares.forEach(square => {
    square.classList.remove('mole');
  });

  let randomSquare = squares[Math.floor(Math.random() * 9)];
  randomSquare.classList.add('mole');

  hitPosition = randomSquare.id;
}

squares.forEach(square => {
  square.addEventListener('mousedown', () => {
    if (square.id == hitPosition) {
      hitSound.play();  
      result++;
      score.textContent = result;
      hitPosition = null;
    } else {
      missSound.play();  
    }
  });
});

function moveMole() {
  timerId = setInterval(randomSquare, 700);
}

moveMole();

function countDown() {
  currentTime--;
  timeLeft.textContent = currentTime;

  if (currentTime == 0) {
    clearInterval(countDownTimerId);
    clearInterval(timerId);
    updateHighScore();  
    gameOverSound.play();  
    alert('GAME OVER! Your final score is ' + result);
  }
}

let countDownTimerId = setInterval(countDown, 1000);

function updateHighScore() {
  if (result > highScore) {
    highScore = result;
    localStorage.setItem('highScore', highScore);  
  }
  highScoreDisplay.textContent = 'High Score: ' + highScore;
}