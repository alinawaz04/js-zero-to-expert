/*
const country = "The United States";
const continent = "North America";
let population = 332915073;

console.log(country);
console.log(continent);
console.log(population);

let isIsland = false;
let language;

console.log(typeof isIsland);
console.log(typeof population);
console.log(typeof country);
console.log(typeof language);

language = "English";

// changed unchanging variables to const

const halfPop = population / 2;

population++;
console.log(population);

const finlandPop = 6000000;
const avgPop = 33000000;

console.log(population > finlandPop);
console.log(population < avgPop);

const description = country + " is in " + continent + ", and its " + population + " people speak " + language;
const descriptionLiteral = `${country} is in ${continent}, and its ${population} people speak ${language}`;

console.log(descriptionLiteral);

population = 13000000;
population = 332915073;

if (population > avgPop) {
    console.log(`${country}'s population is above average`)
} else {
    console.log(`${country}'s population is ${avgPop - population} below average`);
}


console.log('9' - '5'); // 4
console.log('19' - '13' + '17'); // 617
console.log('19' - '13' + 17); // 23
console.log('123' < 57); // false
console.log(5 + 6 + '4' + 9 - 4 - 2); // 1143




const numNeighbors = Number(prompt('How many neighbour countries does your country have?'));
if (numNeighbors === 1) console.log("only 1 border");
else if (numNeighbors > 1) console.log("more than one border");
else console.log("no borders");

*/
const language = "English";
const population = 332915073;
const country = "The United States";


if (language === "English" && population < 50000000) {
    console.log(`You should live in ${country}`);
} else {
    console.log(`${country} does not meet your criteria`);
}