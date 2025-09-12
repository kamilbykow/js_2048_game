'use strict';

// Uncomment the next lines to use your game instance in the browser
import Game from '../modules/Game.class';

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

function drawBoard() {
  const tableBody = document.querySelector('tbody');

  if (tableBody.children.length === 4) {
    tableBody.innerHTML = '';
  }

  for (let i = 0; i < game.board.length; i++) {
    const row = document.createElement('tr');

    row.className = 'field-row';

    tableBody.append(row);

    for (let j = 0; j < game.board[i].length; j++) {
      const cell = document.createElement('td');

      cell.className =
        game.board[i][j] > 0
          ? `field-cell field-cell--${game.board[i][j]}`
          : 'field-cell';

      cell.innerHTML = game.board[i][j] > 0 ? `${game.board[i][j]}` : '';

      row.append(cell);
    }
  }
}

let btn = 'start';

gameScore.textContent = game.getScore();

drawBoard();

startButton.addEventListener('click', () => {
  if (btn === 'start') {
    game.start();
    drawBoard();
    startButton.classList.replace('start', 'restart');
    startButton.textContent = 'Restart';
    messageStart.classList.add('hidden');
    gameScore.textContent = game.getScore();
  }

  if (btn === 'reset') {
    game.restart();
    drawBoard();
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

  drawBoard();
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
