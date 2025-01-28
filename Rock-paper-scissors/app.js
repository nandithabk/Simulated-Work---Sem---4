const computerChoiceDisplay  = document.getElementById('computer-choice')
const userChoiceDisplay = document.getElementById('user-choice')
const resultDisplay = document.getElementById('result')
const possibleChoices = document.querySelectorAll('button');
let userChoice
let computerChoice
let result

let wins = 0;
let losses = 0;
let draws = 0;

const winsDisplay = document.getElementById('wins');
const lossesDisplay = document.getElementById('losses');
const drawsDisplay = document.getElementById('draws');

possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click',(e)=>{
    userChoice = e.target.id
    userChoiceDisplay.innerHTML = userChoice
    generateComputerChoice()
    getResult()
}))

function generateComputerChoice() {
    const randomNumber = Math.floor(Math.random() * 3) + 1

    if(randomNumber === 1){
        computerChoice = 'rock'
    }
    
    if(randomNumber === 2){
        computerChoice = 'scissors'
    }
    
    if(randomNumber === 3){
        computerChoice = 'paper'
    }

    computerChoiceDisplay.innerHTML = computerChoice
}

function getResult() {
    if(computerChoice === userChoice) {
        result = 'its a draw!'
        draws++;
    }
    if(computerChoice ==='rock' &&  userChoice === 'paper') {
        result = 'you lost!'
        losses++;
    }
    if(computerChoice ==='paper' &&  userChoice === 'scissors') {
        result = 'you win!'
        wins++;
    }
    if(computerChoice ==='paper' &&  userChoice === 'rock') {
        result = 'you lose!'
        losses++;
    }
    if(computerChoice ==='scissors' &&  userChoice === 'rock') {
        result = 'you win!'
        wins++;
    }
    if(computerChoice ==='scissors' &&  userChoice === 'paper') {
        result = 'you lose!'
        losses++;
    }

    resultDisplay.innerHTML = result;
    updateScore();
}

function updateScore() {
    winsDisplay.innerHTML = wins;
    lossesDisplay.innerHTML = losses;
    drawsDisplay.innerHTML = draws;
}

const restartButton = document.getElementById('restart');
restartButton.addEventListener('click', () => {
    wins = 0;
    losses = 0;
    draws = 0;
    updateScore();
    computerChoiceDisplay.innerHTML = '';
    userChoiceDisplay.innerHTML = '';
    resultDisplay.innerHTML = '';
});