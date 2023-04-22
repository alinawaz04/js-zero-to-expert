"use strict";

// Scoping in Practice

/*
    1) What are the three types of scoping?

    function scope, block scope and global scope

    2) What makes var different from let and const?

    var is function scoped and are subject to hoisting.
    let and const are block scoped and are not subject to hoisting

    3) Pick 3 variables with different scopes and label what scope they are.

    global scope:
    let globalVar = "I am a global variable"

    function myFunction() {
        function scope:
        let functionVar = "I am a function variable"
    }

    block scope:
    if(true) {
        const blockVar = "I am a block-scoped variable"
    }

*/

function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    const output = `${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      const firstName = "Bob";
      const str = `Oh, and you're a millenial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }
    }
  }

  printAge();

  return age;
}

const firstName = "Ali";
calcAge(1991);
