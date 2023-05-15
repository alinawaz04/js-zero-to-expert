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
