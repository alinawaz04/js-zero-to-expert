"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? `deposit` : `withdrawal`;

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};
const createUsername = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLocaleLowerCase()
      .split(" ")
      .map(word => word[0])
      .join("");
  });
};
const calcPrintBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};
const calcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = `${income}€ `;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const updateUI = function (acc) {
  displayMovements(acc.movements);

  // display balance
  calcPrintBalance(acc);
  // display summary
  calcDisplaySummary(acc);
};
createUsername(accounts);

//event handler
let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currAccount.movements, !sorted);
  sorted = !sorted;
});

let currAccount;

btnLogin.addEventListener("click", function (e) {
  // prevent form from sumbitting
  e.preventDefault();

  currAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currAccount);

  if (currAccount?.pin === Number(inputLoginPin.value)) {
    // display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    // clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();
    // update UI
    updateUI(currAccount);
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const reciever = accounts.find(acc => acc.username === inputTransferTo.value);

  console.log(reciever, amount);

  if (
    amount > 0 &&
    reciever &&
    currAccount.balance >= amount &&
    reciever?.username !== currAccount.username
  ) {
    currAccount.movements.push(-amount);
    reciever.movements.push(amount);

    inputTransferAmount.value = inputTransferTo.value = "";
    inputTransferAmount.blur();
    inputTransferTo.blur();

    updateUI(currAccount);
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currAccount.movements.push(amount);

    // update UI
    updateUI(currAccount);
  }
  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    Number(inputClosePin.value) === currAccount.pin &&
    inputCloseUsername.value === currAccount.username
  ) {
    inputCloseUsername.value = inputClosePin.value = "";
    inputCloseUsername.blur();
    inputClosePin.blur();
    const index = accounts.findIndex(
      acc => acc.username === currAccount.username
    );
    console.log(index);
    // delete account
    accounts.splice(index, 1);

    // hide ui
    containerApp.style.opacity = 0;
  }
});

/////////////////////////////////////////////////
///////////////////LECTURES//////////////////////
/////////////////////////////////////////////////
/*
//      TODO lesson 142 simple array methods
let arr = ['a', 'b', 'c', 'd', 'e'] ;
console.log(arr.splice(2));
console.log(arr);
arr.splice(-1);
console.log(arr);
//      lesson 143 the new at method
const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0));

// getting last element
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));


//      TODO lesson 144 looping arrays: forEach
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const [i, move] of movement.entries()) {
  if (move > 0) {
    console.log(`Movement ${i + 1} deposited ${move}`);
  } else console.log(`Movement ${i + 1} withdrew ${Math.abs(move)}`);
}

console.log('-----FOREACH------');
movements.forEach(function (move, i, array) {
  if (move > 0) {
    console.log(`Movement ${i + 1} deposited ${move}`);
  } else console.log(`Movement ${i + 1} withdrew ${Math.abs(move)}`);
});


//      TODO lesson 145 forEach with maps and sets

// Map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (val, key, map) {
  console.log(`${key}: ${val}`);
});

// Set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (val, _, map) {
  console.log(`${val} ${val}`);
});
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//      TODO lesson 150 the map method
const euroToUsd = 1.1;

const movementsUSD = movements.map(function (mov) {
  return mov * euroToUsd;
});

const moveArrow = movements.map(mov => mov * euroToUsd);
console.log(moveArrow);

// console.log(movements);
// console.log(movementsUSD);

const movementsUSDfor = [];
for (const mov of movements) {
  movementsUSDfor.push(mov * euroToUsd);
}
// console.log(movementsUSDfor);

const moveDesc = movements.map((mov, i, arr) => {
  return `Movement ${i + 1} You ${
    mov > 0 ? "deposited" : "withdrew"
  } ${Math.abs(mov)}`;
});
console.log(moveDesc);
//      TODO lesson 152 the filter method

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

const withdrawals = movements.filter(function (mov) {
  return mov < 0;
});
console.log(withdrawals);

//      TODO lesson 153 the reduce method
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const all = movements.reduce(function (acc, cur, i, arr) {
  console.log(`Iteration number ${i}: ${acc}`);
  return acc + cur;
});

console.log(all);

// maximum value
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
console.log(max);

//      TODO Lesson 155 the magic of chaining methods
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const euroToUsd = 1.1;

// pipeline
const totalDepositUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * euroToUsd)
  .reduce((acc, curr) => acc + curr, 0);
console.log(totalDepositUSD);

//      TODO lesson 157 the find method
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.owner === "Jessica Davis");
console.log(account);

//      TODO lesson 161 some and every
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//equality
console.log(movements.includes(-130));

// condition - some
const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);

// every
console.log(account4.movements.every(mov => mov > 0));

// seperate callback
const deposit = mov => mov > 0;
console.log(movements.filter(deposit));
console.log(movements.some(deposit));
console.log(movements.every(deposit));

//      TODO lesson 162 flat and flatMap
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, 5, 6], 7, 8];
console.log(arrDeep.flat(2));

// flat
const accountMovements = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(accountMovements);

// flatMap
const accountMovements2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(accountMovements2);
//      TODO lesson 163 sorting arrays

// strings
const owners = ["Jonas", "Zach", "Adam", "Martha"];
console.log(owners.sort());

console.log(owners);

// numbers
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements);

// ascending
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (b > a) return -1;
// });
movements.sort((a, b) => a - b);
console.log(movements);

// descending
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (b > a) return 1;
// });
movements.sort((a, b) => b - a);

console.log(movements);
//      TODO lesson 164 more ways of creating and filling arrays
const x = Array.from({ length: 100 }, (_, i) => i + 1);
console.log(x);

labelBalance.addEventListener("click", function () {
  const movementsUI = Array.from(
    document.querySelectorAll(".movements__value"),
    el => Number(el.textContent.replace("€", ""))
  );
  console.log(movementsUI.map);
});
*/
