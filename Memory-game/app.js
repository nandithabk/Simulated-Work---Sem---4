document.addEventListener('DOMContentLoaded', () => {
  const cardArray = [
    { name: 'fries', img: 'images/fries.png' },
    { name: 'cheeseburger', img: 'images/cheeseburger.png' },
    { name: 'ice-cream', img: 'images/ice-cream.png' },
    { name: 'pizza', img: 'images/pizza.png' },
    { name: 'milkshake', img: 'images/milkshake.png' },
    { name: 'hotdog', img: 'images/hotdog.png' },
    { name: 'fries', img: 'images/fries.png' },
    { name: 'cheeseburger', img: 'images/cheeseburger.png' },
    { name: 'ice-cream', img: 'images/ice-cream.png' },
    { name: 'pizza', img: 'images/pizza.png' },
    { name: 'milkshake', img: 'images/milkshake.png' },
    { name: 'hotdog', img: 'images/hotdog.png' }
  ];

  cardArray.sort(() => 0.5 - Math.random());

  const grid = document.querySelector('.grid');
  const resultDisplay = document.querySelector('#result');
  const timerDisplay = document.querySelector('#timer');
  const restartButton = document.querySelector('#restart-button');
  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];
  let score = 0;
  let timer;

  function createBoard() {
    grid.innerHTML = '';
    cardArray.forEach((_, i) => {
      const card = document.createElement('img');
      card.setAttribute('src', 'images/blank.png');
      card.setAttribute('data-id', i);
      card.addEventListener('click', flipCard);
      grid.appendChild(card);
    });
  }

  function checkForMatch() {
    const cards = document.querySelectorAll('img');
    const [optionOneId, optionTwoId] = cardsChosenId;

    if (optionOneId === optionTwoId) {
      cards[optionOneId].setAttribute('src', 'images/blank.png');
      cards[optionTwoId].setAttribute('src', 'images/blank.png');
      alert('You clicked the same card!');
    } else if (cardsChosen[0] === cardsChosen[1]) {
      alert('You found a match!');
      cards[optionOneId].setAttribute('src', 'images/white.png');
      cards[optionTwoId].setAttribute('src', 'images/white.png');
      cards[optionOneId].removeEventListener('click', flipCard);
      cards[optionTwoId].removeEventListener('click', flipCard);
      cardsWon.push(cardsChosen);
      score++;
    } else {
      cards[optionOneId].setAttribute('src', 'images/blank.png');
      cards[optionTwoId].setAttribute('src', 'images/blank.png');
      alert('Sorry, try again.');
    }

    cardsChosen = [];
    cardsChosenId = [];
    resultDisplay.textContent = score;

    if (cardsWon.length === cardArray.length / 2) {
      clearInterval(timer);
      alert('Congratulations! You found them all!');
    }
  }

  function flipCard() {
    const cardId = this.getAttribute('data-id');
    if (!cardsChosenId.includes(cardId)) {
      cardsChosen.push(cardArray[cardId].name);
      cardsChosenId.push(cardId);
      this.setAttribute('src', cardArray[cardId].img);
      if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 500);
      }
    }
  }

  function startTimer() {
    let timeLeft = 60;
    timerDisplay.textContent = timeLeft;
    timer = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = timeLeft;
      if (timeLeft === 0) {
        clearInterval(timer);
        alert('Game Over! Time’s up!');
        restartGame();
      }
    }, 1000);
  }

  function restartGame() {
    clearInterval(timer);
    cardsWon = [];
    score = 0;
    resultDisplay.textContent = score;
    startTimer();
    createBoard();
  }

  restartButton.addEventListener('click', restartGame);

  createBoard();
  startTimer();
});