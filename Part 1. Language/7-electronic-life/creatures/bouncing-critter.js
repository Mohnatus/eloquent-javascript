const directions = require('./directions.js');
const randomElement = require('./helpers.js').randomElement;

function BouncingCritter() {
    this.direction = randomElement(Object.keys(directions));
};

BouncingCritter.prototype.act = function (view) {
    if (view.look(this.direction) != " ")
        this.direction = view.find(" ") || "s";
    return { type: "move", direction: this.direction };
};

module.exports = BouncingCritter;