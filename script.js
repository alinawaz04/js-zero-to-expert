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
