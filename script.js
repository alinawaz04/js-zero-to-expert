const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};
//                          CHALLENGE 4
document.body.append(document.createElement("textarea"));
document.body.append(document.createElement("button"));

const camelCase = function (str) {
  const strL = str.toLowerCase().trim();
  const index = strL.indexOf("_") + 1;
  return (
    strL.slice(0, index - 1) +
    strL[index].toUpperCase() +
    strL.slice(index + 1).trim()
  );
};

const camelCaseLines = function (str, char, num) {
  const lines = str.split("\n");
  const camelCaseLines = lines.map((line, index) => {
    const suffix = char.repeat(num * (index + 1));
    return camelCase(line) + suffix;
  });
  return camelCaseLines.join("\n");
};

const btn = document.querySelector("button");
const text = document.querySelector("textarea");
btn.addEventListener("click", function () {
  console.log(camelCaseLines(text.value, "✅", 1).trim());
});
/*

underscore_case
 first_name
Some_Variable
  calculate_AGE
delayed_departure


//                          CHALLENGE 2

// 1)
const scoreEntries = game.scored.entries();
for (const [el, p] of scoreEntries) {
  console.log(`Goal ${el + 1}: ${p}`);
}

// 2)
const oddValues = Object.values(game.odds);
let sum = 0;
for (const val of oddValues) {
  sum += val;
}
avgOdd = sum / oddValues.length;
console.log("Average Odds:", avgOdd);

// 3)
console.log(`Odd of victory ${game.team1}: ${game.odds.team1}`);
console.log(`Odd of draw: ${game.odds.x}`);
console.log(`Odd of victory ${game.team2}: ${game.odds.team2}`);

// 4)
const scorers = {};
for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}
console.log(scorers);
   //                       CHALLENGE 1
//          1.
const [players1, players2] = game.players;
console.log("   1.", players1, players2);

//          2.
const [gk, ...fieldPlayers] = players1;
console.log("   2.", gk, fieldPlayers);

//          3.
const allPlayers = [...players1, ...players2];
console.log("   3.", allPlayers);

//          4.
const players1Final = [...players1, ...["Thiago", "Coutinho", "Perisic"]];
console.log("   4.", players1Final);

//          5.
const { team1, x: draw, team2 } = game.odds;
console.log("   5.", team1, draw, team2);

//          6.
const printGoals = function (...names) {
  for (let i = 0; i < names.length; i++) {
    console.log(names[i]);
  }
  console.log(names.length);
};
console.log("   6.");
printGoals("Davies", "Muller", "Lewandowski", "Kimmich");
printGoals(...game.scored);

//          7.
console.log("   7.");

team1 < team2 && console.log("Team 1 more likely to win");
team2 < team1 && console.log("Team 2 more likely to win");

*/
