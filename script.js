"use strict";
/*
console.log(document.querySelector('.message').textContent);
document.querySelector('.message').textContent = 'Correct Number!';
console.log(document.querySelector('.message').textContent);

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);
*/

let num = Math.trunc(Math.random() * 20 + 1);
let score = 20;

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);

  if (!guess) {
    document.querySelector(".message").textContent = "No Number!";

    // when player wins
  } else if (guess === num) {
    document.querySelector(".message").textContent = "Correct Number!";
    document.querySelector(".number").textContent = num;

    document.querySelector("body").style.backgroundColor = "#60b347";

    document.querySelector(".number").style.width = "30rem";

    // guess is too high
  } else if (guess > num) {
    if (score > 1) {
      document.querySelector(".message").textContent = "Too High";
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      document.querySelector(".message").textContent = "You Lost :(";
      document.querySelector(".score").textContent = 0;
    }

    //guess is too low
  } else if (guess < num) {
    if (score > 1) {
      document.querySelector(".message").textContent = "Too Low";
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      document.querySelector(".message").textContent = "You Lost :(";
      document.querySelector(".score").textContent = 0;
    }
  }
});

// function for again button
document.querySelector(".again").addEventListener("click", function () {
  // reset message, score and random number
  score = 20;
  num = Math.trunc(Math.random() * 20 + 1);

  document.querySelector(".score").textContent = score;
  document.querySelector(".number").textContent = "?";
  document.querySelector(".message").textContent = "Start guessing...";
  // reset background color and box width
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";

  // reset input field
  document.querySelector(".guess").value = "";
});
