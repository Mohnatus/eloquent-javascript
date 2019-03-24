var Animal = require('./animal.js');

function Predator() {
    Animal.call(this);
    this.food = "O";
}
Predator.prototype = Object.create(Animal.prototype);
Predator.prototype.constructor = Predator;

module.exports = Predator;