let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  Ничьяs: 0
};

updateScoreElement();

function clearResultClass() {
  let scoreText = document.querySelector('.js-result');
  scoreText.classList.remove('result-Ничья');
  scoreText.classList.remove('result-win');
  scoreText.classList.remove('result-loss');
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let scoreText = document.querySelector('.js-result');
  let result = '';

  clearResultClass();

  if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Ничья.';
    } else if (computerMove === 'paper') {
      result = 'Проигрыш...';
    } else {
      result = 'Победа!';
    } 
    
  } else if (playerMove === 'paper') {
      if (computerMove === 'paper') {
        result = 'Ничья.';
      } else if (computerMove === 'scissors') {
        result = 'Проигрыш...';
      } else {
        result = 'Победа!';
      }

  } else if (playerMove === 'scissors') {
      if (computerMove === 'scissors') {
        result = 'Ничья.';
      } else if (computerMove === 'rock') {
        result = 'Проигрыш...';
      } else {
        result = 'Победа!';
      }
    }

  if (result === 'Победа!') {
    score.wins++;
    scoreText.classList.add('result-win');
  } else if (result === 'Проигрыш...') {
    score.losses++;
    scoreText.classList.add('result-loss');
  } else {
    score.Ничьяs++;
    scoreText.classList.add('result-Ничья');
  }

  console.log(scoreText);

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  scoreText.innerHTML = result;
    
  document.querySelector('.js-moves')
    .innerHTML = `Ваш ход: 
    <img src="images/${playerMove}-emoji.png" class="move-icon">
    <p>а компьютер сходил:<img src="images/${computerMove}-emoji.png" class="move-icon">
    `;

}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `<b>Текущая статистика по играм:</b><p>Победы: ${score.wins}, Проигрыши: ${score.losses}, Ничьи: ${score.Ничьяs}</p>`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >=0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else {
    computerMove = 'scissors';
  }

  return computerMove;
}

function clearResultText() {
  clearResultClass();

  document.querySelector('.js-moves')
    .innerHTML = ` `;
 
  document.querySelector('.js-result')
    .innerHTML = `Статистика обновлена. Сыграйте еще раз!`;
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.Ничьяs = 0;
  localStorage.removeItem('score');

  clearResultText();

  updateScoreElement();
}    