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

const language = "Chinese";
const population = 332915073;
const country = "The United States";


// if (language === "English" && population < 50000000) {
//     console.log(`You should live in ${country}`);
// } else {
//     console.log(`${country} does not meet your criteria`);
// }

switch (language) {
    case "Chinese":
    case "Mandarin":
        console.log("most number of native speakers");
        break;
    case "Spanish":
        console.log("2nd place in number of speakers");
        break;
    case "English":
        console.log("3rd place");
        break;
    case "Hindi":
        console.log("Number 4");
        break;
    case "Arabic":
        console.log("5th most spoken language");
        break;
    default:
        console.log("great language too");
        break;
}


const language = "English";
const population = 332915073;
const country = "The United States";
const avgPop = 33000000;


console.log(`${country}'s population is ${population > avgPop ? "above" : "below"} average`);

function describeCountry(country, population, capitalCity) {
    console.log(`${country} has ${population} people and its capital city is ${capitalCity}`);
}

const usDescription = describeCountry("United States", "300 million", "Washingon DC");
console.log(usDescription);


function percentageOfWorld1(population) {
    return (population / 7900) * 100;
}

chinaPercent = percentageOfWorld1(1441);
console.log(chinaPercent);

usPercent = percentageOfWorld1(300);
console.log(usPercent);

russiaPercent = percentageOfWorld1(145);
console.log(russiaPercent);

const percentageOfWorld2 = function (population) {
    return (population / 7900) * 100;
}

chinaPercent = percentageOfWorld2(1441);
console.log(chinaPercent);

usPercent = percentageOfWorld2(300);
console.log(usPercent);

russiaPercent = percentageOfWorld2(145);
console.log(russiaPercent);

const percentageOfWorld3 = population => (population / 7900) * 100;

console.log(percentageOfWorld3(1441)); 
function percentageOfWorld1(population) {
    return (population / 7900) * 100;
}
const describePopulation = (country, population) => `${country} has ${population} million people, which is about ${percentageOfWorld1(population)}% of the world.`;

us = describePopulation("The United States", 300);
console.log(us);

china = describePopulation("China", 1441);
console.log(china);

russia = describePopulation("Russia", 145);
console.log(us);

function percentageOfWorld1(population) {
    return (population / 7900) * 100;
}

const populations = [300, 1441, 145, 200]
console.log(populations.length === 4);

const percentages = [percentageOfWorld1(populations[0]), percentageOfWorld1(populations[1]), percentageOfWorld1(populations[2]), percentageOfWorld1(populations[3]),];
console.log(percentages);

const USneighbors = ["Canada", "Mexico"];
USneighbors.push("Utopia");
console.log(USneighbors);
USneighbors.pop();
console.log(USneighbors);

if (!USneighbors.includes("Germany")) {
    console.log("Probably not a European country");
}

USneighbors[0] = "Canada Schmanda";
console.log(USneighbors);

const myCountry = {
    country: "The United States",
    capital: "Washington DC",
    language: "English",
    population: 300000000,
    neighbors: ["Canada", "Mexico"],

    describe: function () {
        console.log(`${this.country} has ${this.population} ${this.language}-speaking people, ${this.neighbors.length} neighboring countries and a capital called ${this.capital}`);
    },

    checkIsland: function () {
        this.isIsland = this.neighbors.length <= 0 ? true : false;
        return this.isIsland;
    }
};

// console.log(`${myCountry.country} has ${myCountry.population} ${myCountry.language}-speaking people, ${myCountry.neighbors.length} neighboring countries and a capital called ${myCountry.capital}`);

// myCountry.population += 2000000;
// console.log(myCountry.population);

// myCountry["population"] -= 2000000;
// console.log(myCountry.population);

myCountry.describe();

console.log(myCountry.checkIsland());

for (let i = 1; i <= 50; i++) {
    console.log("Voter number " + i + " is currently voting");
}

function percentageOfWorld1(population) {
    return (population / 7900) * 100;
}

// chinaPercent = percentageOfWorld1(1441);
// console.log(chinaPercent);

// usPercent = percentageOfWorld1(300);
// console.log(usPercent);

// russiaPercent = percentageOfWorld1(145);
// console.log(russiaPercent);

const populations = [300, 1441, 145, 200];
const percentages2 = []
for (let i = 0; i < populations.length; i++) {
    percentages2[i] = [percentageOfWorld1(populations[i])];
}
console.log(percentages2);

const listOfNeighbors = [
    ["Canada", "Mexico"],
    ["Spain"],
    ["Norway", "Sweden", "Russia"]
];
for (let i = 0; i < listOfNeighbors.length; i++) {
    for (let c = 0; c < listOfNeighbors[i].length; c++) {
        console.log(listOfNeighbors[i][c])
    }
}

*/
const populations = [300, 1441, 145, 200];
const percentages3 = [];
let i = 0;
function percentageOfWorld1(population) {
    return (population / 7900) * 100;
}

while (i < populations.length) {
    percentages3[i] = [percentageOfWorld1(populations[i])];
    i++
}
console.log(percentages3);
