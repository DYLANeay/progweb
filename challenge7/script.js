'use strict';

const input = document.querySelector('#guess');
const score = document.querySelector('#score');
const highscore = document.querySelector('#highscore');
const hint = document.querySelector('#hint');
const againBtn = document.querySelector('#again');
const checkBtn = document.querySelector('#check');
const answer = document.querySelector('#answer');

let isPlaying = true;

const pickRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const secretNumber = pickRandomNumber(1, 20);

checkBtn.addEventListener('click', () => {
  const guess = Number(input.value);

  if (isPlaying && validateNumber(guess)) {
    checkScore(guess);
  }
});

const validateNumber = (guess) => {
  if (guess > 20 || guess < 1) {
    hint.textContent = 'Number has to be between 1 and 20';
    return false;
  }
  if (isNaN(guess)) {
    hint.textContent = 'Please enter a number';
    return false;
  }
  return true;
};

const checkScore = (guess) => {
  if (guess !== secretNumber) {
    guess > secretNumber
      ? (hint.textContent = 'Too high!')
      : (hint.textContent = 'Too low!');
    updateScore();
  } else {
    hint.textContent = 'Correct! You won!';
    answer.textContent = secretNumber;
    answer.classList.add('correct');
    document.body.style.backgroundColor = 'green';
    isPlaying = false;
  }
};

const updateScore = () => {
  let currentScore = Number(score.textContent);
  currentScore--;

  if (currentScore < 1) {
    hint.textContent = 'You lost!';
    score.textContent = 0;
    document.body.style.backgroundColor = 'red';
    isPlaying = false;
  } else {
    score.textContent = currentScore;
  }
};

againBtn.addEventListener('click', () => {
  isPlaying = true;
  highscore.textContent =
    score.textContent > highscore.textContent
      ? score.textContent
      : highscore.textContent;
  score.textContent = '20';
  hint.textContent = 'Start guessing...';
  input.value = '';
  secretNumber = pickRandomNumber(1, 20);
  answer.textContent = '?';
  answer.classList.remove('correct');
  document.body.style.backgroundColor = '#222';
});
