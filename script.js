/*
//          TODO challenge 1
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
};

Car.prototype.decelerate = function () {
  this.speed -= 5;
};

const bmw = new Car("BMW", 120);
const mercedes = new Car("Mercedes", 95);

console.log(bmw);
bmw.accelerate();
console.log(bmw);
bmw.decelerate();
console.log(bmw);

console.log(mercedes);
mercedes.accelerate();
console.log(mercedes);
mercedes.decelerate();
console.log(mercedes);

//          TODO challenge 2
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
  }

  brake() {
    this.speed -= 5;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new CarCl("Ford", 120);
console.log(ford);
ford.accelerate();
console.log(ford);
ford.brake();
console.log(ford);
console.log(ford.speedUS);
ford.speedUS = 50;
console.log(ford);
*/
//          TODO challenge 3

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
};

Car.prototype.brake = function () {
  this.speed -= 5;
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};

const tesla = new EV("Tesla", 120, 23);
console.log(tesla);
tesla.accelerate();
tesla.accelerate();
tesla.brake();
console.log(tesla);
tesla.chargeBattery(90);
console.log(tesla);
