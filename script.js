"use strict";

// selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const maxEl = document.querySelector(".max-number");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnCloseModal = document.querySelector(".close-modal");
const max = document.querySelector(".max");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const input = document.querySelector(".input");
const btnSubmit = document.getElementById("submit");

//staring status
let scores;
let currentScore;
let activePlayer;
let playing;
let maxScore;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  maxScore = 10;
  maxEl.textContent = maxScore;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

max.classList.remove("hidden");
init();

// function for switching active player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// rolling dice functionality
btnRoll.addEventListener("click", function () {
  // 1. generate random dice roll
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    // 2. display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    // 3. check for 1 or 5; if true, switch to next player
    if (dice !== 1 && dice !== 5) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

// hold score functionality
btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. add current score to active players score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= maxScore) {
      // finish game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      diceEl.classList.add("hidden");
    } else {
      // 3. Switch to the next player
      switchPlayer();
    }
  }
});

// new game button functionality

btnNew.addEventListener("click", function () {
  max.classList.add("hidden");
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");

  init();
});

btnSubmit.addEventListener("click", function () {
  if (isNaN(input.value) || input.value === "") {
    return;
  }

  const randomNum = Math.floor(Math.random() * 10) + 1;
  for (let i = 0; i < randomNum; i++) {
    switchPlayer();
  }

  let value = input.value;
  maxScore = value;
  maxEl.textContent = maxScore;
  closeModal();
  max.classList.remove("hidden");
});

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
