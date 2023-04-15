"use strict";

let num = Math.trunc(Math.random() * 20 + 1);
let score = 20;
let highScore = 0;
const modal = document.querySelector(".modal");
const btnClose = document.querySelector(".close-modal");
const overlay = document.querySelector(".overlay");

// function to close modal
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// function to open modal
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};
const check = function () {
  const guess = Number(document.querySelector(".guess").value);

  if (!guess) {
    displayMessage("No Number!");
    document.querySelector(".modal h2").textContent = "No Number!";
    openModal();

    // when player wins
  } else if (guess === num) {
    displayMessage("Correct Number!");
    document.querySelector(".modal h1").textContent = "You Win!";
    document.querySelector(".modal h1").style.color = "#60b347";

    document.querySelector(".modal h2").textContent = "Correct Number!";
    openModal();
    document.querySelector(".number").textContent = num;

    document.querySelector("body").style.backgroundColor = "#60b347";

    document.querySelector(".number").style.width = "30rem";

    if (score > highScore) {
      highScore = score;
      document.querySelector(".highscore").textContent = highScore;
    }

    // guess is wrong
  } else if (guess !== num) {
    if (score > 1) {
      if (guess > num) {
        document.querySelector(".modal h2").textContent = "Too High!";
        displayMessage("Too High!");
        openModal();
      } else if (guess < num) {
        document.querySelector(".modal h2").textContent = "Too Low!";
        displayMessage("Too Low!");
        openModal();
      }
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      displayMessage("You Lost :(");
      document.querySelector(".score").textContent = 0;
    }
  }
};

// function for again button
document.querySelector(".again").addEventListener("click", function () {
  // reset message, score and random number
  score = 20;
  num = Math.trunc(Math.random() * 20 + 1);

  document.querySelector(".score").textContent = score;
  document.querySelector(".number").textContent = "?";
  displayMessage("Start guessing...");
  // reset background color and box width
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";

  // reset input field
  document.querySelector(".guess").value = "";

  // reset modal
  document.querySelector(".modal h1").textContent = "Try Again";
  document.querySelector(".modal h1").style.color = "red";
});

btnClose.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.querySelector(".check").addEventListener("click", check);
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    check();
  }
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    if (!modal.classList.contains("hidden")) {
      closeModal();
    }
  }
});
