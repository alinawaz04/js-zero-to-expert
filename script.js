const dolphinsAvg = (97 + 112 + 101) / 3;
const koalasAvg = (109 + 95 + 106) / 3;
const minScore = 100;

if (dolphinsAvg > koalasAvg && dolphinsAvg >= minScore) {
    console.log("Dolphins win");
} else if (koalasAvg > dolphinsAvg && koalasAvg >= minScore) {
    console.log("Koalas win");
} else if (koalasAvg === dolphinsAvg && dolphinsAvg >= minScore && koalasAvg >= minScore) {
    console.log("It's a draw");
} else console.log("minimum score not met");