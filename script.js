"use strict";
//         Problem: why is this.borderCountries undefined
const country = {
  name: "United States",
  borderCountries: 2,
  printDescription: function () {
    const isIsland = function () {
      if (this.borderCountries != 0) {
        //Why is this.borderCountries undefinded
        return false;
      } else {
        return true;
      }
    };

    // console.log(`${this.name} is an island ${isIsland()}`);
  },
};

// country.printDescription();

// this.borderCOuntries is undefined becuase the function "isIsland" is a regular function which creates its own scope, which causes this to refer to the global window object, which is undefined. To fix this, we simply need to use an arrow function instead.

// Solution:
const countryFixed = {
  name: "United States",
  borderCountries: 2,
  printDescription: function () {
    const isIsland = () => {
      if (this.borderCountries != 0) {
        return false;
      } else {
        return true;
      }
    };

    console.log(`${this.name} is an island ${isIsland()}`);
  },
};

countryFixed.printDescription();
