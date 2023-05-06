/*
//          section 10 challenge 1
const poll = {
  question: "What is your favourite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const language = Number(
      prompt(
        "What is your favourite programming language? \n 0: JavaScript \n 1: Python \n 2: Rust \n 3:++ \n (Write option number)"
      )
    );
    switch (language) {
      case 0:
        this.answers[0]++;
        break;
      case 1:
        this.answers[1]++;
        break;
      case 2:
        this.answers[2]++;
        break;
      case 3:
        this.answers[3]++;
        break;
      default:
        alert("Not a valid option");
    }
    this.displayResults();
    this.displayResults("string");
  },
  displayResults(type = "array") {
    if (type === "array") console.log(this.answers);
    else if (type === "string") {
      console.log(`Poll results are ${this.answers.join(", ")}`);
    }
  },
};
const pollBtn = document.querySelector(".poll");
pollBtn.addEventListener("click", poll.registerNewAnswer.bind(poll));

const displayResultsBonus = poll.displayResults.call(
  { answers: [5, 2, 3] },
  "string"
);
*/

//          section 10 challenge 2
(function () {
  const header = document.querySelector("h1");
  const body = document.querySelector("body");
  header.style.color = "red";

  body.addEventListener("click", function () {
    header.style.color = "blue";
  });
})();
