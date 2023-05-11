//          TODO section 11 challenge 1
// const dogsJulia = [3, 5, 2, 12, 7];
// const dogsKate = [4, 1, 15, 8, 3];

// const checkDogs = function (dogsJulia, dogsKate) {
//   juliaCopy = [...dogsJulia];
//   juliaCopy.shift();
//   juliaCopy.splice(-2);

//   console.log(juliaCopy);

//   const allDogs = juliaCopy.concat(dogsKate);
//   console.log(allDogs);

//   allDogs.forEach(function (age, i) {
//     if (age >= 3) {
//       console.log(`Dog number ${i + 1} is an adult, and is ${age} years old`);
//     } else console.log(`Dog number ${i + 1} is a child, and is ${age} years old`);
//   });
// };

// checkDogs(dogsJulia, dogsKate);

//          TODO section 11 challenge 2

// const data = [5, 2, 4, 1, 15, 8, 3];
// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages.map(function (age) {
//     if (age <= 2) return 2 * age;
//     else return 16 + age * 4;
//   });
//   const adults = humanAges.filter(function (age) {
//     return age >= 18;
//   });
//   const avgHumanAge =
//     adults.reduce(function (acc, curr) {
//       return acc + curr;
//     }, 0) / adults.length;
//   return avgHumanAge;
// };
// console.log(calcAverageHumanAge(data));

// //          TODO section 11 challenge 3

// const data = [5, 2, 4, 1, 15, 8, 3];

// const calcAverageHumanAge = function (ages) {
//   return ages
//     .map((age) => {
//       if (age <= 2) return 2 * age;
//       else return 16 + age * 4;
//     })
//     .filter((age) => age >= 18)
//     .reduce((acc, curr, i, arr) => acc + curr / arr.length, 0);
// };
// console.log(calcAverageHumanAge(data));
//          TODO section 11 challenge 4
const dogs = [
  { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
  { weight: 8, curFood: 200, owners: ["Matilda"] },
  { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
  { weight: 32, curFood: 340, owners: ["Michael"] },
];
//          TODO 1)

dogs.forEach(function (dog) {
  dog.recommendedPortion = dog.weight ** 0.75 * 28;
  console.log(dog.recommendedPortion);
});
console.log(dogs);
//          TODO 2)

const sarahInd = dogs.findIndex(
  (dog) => dog.owners.find((owner) => owner === "Sarah") === "Sarah"
);

// console.log(dogs);
if (dogs[sarahInd].curFood < dogs[sarahInd].recommendedPortion) {
  console.log("Feed him/her more!!!!");
} else console.log("You feeding bro too much !!!");
//          TODO 3)

let tooLittle = [];
let tooMuch = [];

const checkFeeding = function (dogs) {
  dogs.forEach((dog) => {
    if (dog.curFood < dog.recommendedPortion) {
      tooLittle.push(dog.owners);
    } else tooMuch.push(dog.owners);
  });
};
checkFeeding(dogs);

//          TODO 4)
console.log(`${tooLittle.flat().join(", ")}'s dogs eat too little`);
console.log(`${tooMuch.flat().join(", ")}'s dogs eat too much`);

//          TODO 5)
let exactAmt;
dogs.forEach(function (dog) {
  if (dog.curFood === dog.recommendedPortion) {
    exactAmt = true;
  } else exactAmt = false;
  console.log(exactAmt);
});

//          TODO 6,7)
let okayAmt;
let okayArr = [];
dogs.forEach(function (dog) {
  if (
    dog.curFood > dog.recommendedPortion * 0.9 &&
    dog.curFood < dog.recommendedPortion * 1.1
  ) {
    okayAmt = true;
    okayArr.push(dog);
  } else okayAmt = false;
  console.log(okayAmt);
  console.log(okayArr);
});
//          TODO 8)
const shallow = [...dogs];
console.log(shallow); // shallow copy

shallow.sort((a, b) => a.recommendedPortion - b.recommendedPortion);
console.log(shallow);
