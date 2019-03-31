const Vector = require('../models/vector');

class Actor {
    constructor(pos, constants) {
        this.type = constants.type;
        this.basePos = this.pos = pos.plus(new Vector(constants.xOffset, constants.yOffset));
        this.size = new Vector(constants.xSize, constants.ySize);
    }

    act(step, level, keys) {

    }
}

module.exports = Actor;