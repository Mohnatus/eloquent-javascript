const Actor = require('./actor');
const Vector = require('../models/vector');
const constants = require('../data/constants').coin;

class Coin extends Actor {
    constructor(pos) {
        super(pos, constants);
        this.wobble = Math.random() * Math.PI * 2;
    }

    act(step) {
        this.wobble += step * constants.wobbleSpeed;
        var wobblePos = Math.sin(this.wobble) * constants.wobbleDist;
        this.pos = this.basePos.plus(new Vector(0, wobblePos));
    }
}

module.exports = Coin;