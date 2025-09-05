'use strict';

// Uncomment the next lines to use your game instance in the browser
const Game = require('../modules/Game.class');
const game = new Game([
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
]);

// Write your code here

const startButton = document.querySelector('.start');
const gameScore = document.querySelector('.game-score');
const messageWin = document.querySelector('.message-win');
const messageLose = document.querySelector('.message-lose');
const messageStart = document.querySelector('.message-start');
let btn = 'start';

gameScore.textContent = game.getScore();

game.drawBoard();

startButton.addEventListener('click', () => {
  if (btn === 'start') {
    game.start();
    startButton.classList.replace('start', 'restart');
    startButton.textContent = 'Restart';
    messageStart.classList.add('hidden');
    gameScore.textContent = game.getScore();
  }

  if (btn === 'reset') {
    game.restart();
    messageLose.classList.add('hidden');
    messageWin.classList.add('hidden');
    gameScore.textContent = game.getScore();
  }

  btn = 'reset';
});

document.addEventListener('keydown', (e) => {
  if (game.getStatus() === 'playing') {
    switch (e.key) {
      case 'ArrowRight':
        game.moveRight();
        break;
      case 'ArrowLeft':
        game.moveLeft();
        break;
      case 'ArrowUp':
        game.moveUp();
        break;
      case 'ArrowDown':
        game.moveDown();
        break;
    }
  }

  game.drawBoard();
  gameScore.textContent = game.getScore();

  switch (game.getStatus()) {
    case 'lose':
      messageLose.classList.remove('hidden');
      break;
    case 'win':
      messageWin.classList.remove('hidden');
      break;
  }
});
