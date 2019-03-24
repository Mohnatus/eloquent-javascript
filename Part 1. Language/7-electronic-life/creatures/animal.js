function Animal() {
    this.energy = 20;
    this.food = "*";
    this.hungryEnergy = 40;
    this.reproductiveEnergy = 60;
}
Animal.prototype.act = function (context) {
    var space = context.find(" ");
    var food = context.find(this.food);
    var canReproduct = this.canReproduct(food, space);

    if (canReproduct && space) return { type: "reproduce", direction: space };

    if (this.energy > this.reproductiveEnergy) {
        if (space) return { type: "move", direction: space };
        if (food) return { type: "eat", direction: food };
    } else {
        if (food) return { type: "eat", direction: food };
        if (space) return { type: "move", direction: space };
    }
};
Animal.prototype.canReproduct = function(food) {
    if (this.energy < this.hungryEnergy) return false;
    if (food) return true;
    if (this.energy > this.reproductiveEnergy) return true;
    return false;
};

module.exports = Animal;