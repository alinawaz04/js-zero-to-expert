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
const descriptionLiteral = `${country} is in s${continent}, and its ${population} people speak ${language}`;
console.log(descriptionLiteral);



