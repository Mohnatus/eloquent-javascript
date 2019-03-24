var Animal = require('./animal.js');

function PlantEater() {
    Animal.call(this);
    this.food = "*";
}
PlantEater.prototype = Object.create(Animal.prototype);
PlantEater.prototype.constructor = PlantEater;

module.exports = PlantEater;