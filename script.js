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

const data = [5, 2, 4, 1, 15, 8, 3];
const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map(function (age) {
    if (age <= 2) return 2 * age;
    else return 16 + age * 4;
  });
  const adults = humanAges.filter(function (age) {
    return age > 18;
  });
  const avgHumanAge =
    adults.reduce(function (acc, curr) {
      return acc + curr;
    }, 0) / adults.length;
  return avgHumanAge;
};
console.log(calcAverageHumanAge(data));
