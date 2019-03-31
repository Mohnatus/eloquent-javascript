const Actor = require('./actor');
const Vector = require('../models/vector');
const constants = require('../data/constants').lava;

class Lava extends Actor {
    constructor(pos, char) {
        super(pos, constants);

        let speed = constants.speed[char];
        this.speed = new Vector(speed.x, speed.y);

        if (char == constants.symbols.drop) {
            this.repeatPos = pos;
        } 
    }

    act(step, level) {
        var newPos = this.pos.plus(this.speed.times(step));
        if (!level.obstacleAt (newPos, this.size))
            this.pos = newPos;
        else if (this.repeatPos)
            this.pos = this.repeatPos;
        else
            this.speed = this.speed.times(-1);
    }
}

module.exports = Lava;