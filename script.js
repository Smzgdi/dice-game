'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.getElementById('score--0');
const score1 = document.querySelector('#score--1');
let currentScore;
let activePlayer;
let scores;
let playing;
//Inital conditions

function init() {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
}
init();
function changePlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

//Roll the dice function

btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generate a Random Number
    const dice = Math.trunc(Math.random() * 6) + 1;
    //Roll the dice and dispaly the picture according to that random number
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //If dice number is 1 switch player
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      changePlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //add score to total score array for each user
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // if score is 100 finish the game and claim a winner

    if (scores[activePlayer] >= 100) {
      playing = false;

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //change active player
      changePlayer();
    }
  }

  btnNew.addEventListener('click', init);
});
