const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];

const checkDogs = function (dogsJulia, dogsKate) {
  juliaCopy = [...dogsJulia];
  juliaCopy.shift();
  juliaCopy.splice(-2);

  console.log(juliaCopy);

  const allDogs = juliaCopy.concat(dogsKate);
  console.log(allDogs);

  allDogs.forEach(function (age, i) {
    if (age >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${age} years old`);
    } else console.log(`Dog number ${i + 1} is a child, and is ${age} years old`);
  });
};

checkDogs(dogsJulia, dogsKate);
