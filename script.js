var calculate = function calculate(a, o, b) {
  var result = 0;

  if (o === "+") {
    // capitalized parameter
    return a + b;
  } // missing closing bracket
  else if (o === "-") {
    // changed != to ===
    return a - b; // swithed variables
  } else if (o === "/") {
    if (b === 0) return null;
    return a / b;
  } // missing closing bracket
  else if (o === "*") return a * b; // unreachable code
  else return null;

  return result;
};

console.log(calculate(2, "+", 4)); //Should return 6
console.log(calculate(6, "-", 1.5)); //Should return 4.5
console.log(calculate(-4, "*", 8)); //Should return -32
console.log(calculate(49, "/", -7)); //Should return -7
console.log(calculate(8, "m", 2)); //Should return null
console.log(calculate(4, "/", 0)); //should return null
