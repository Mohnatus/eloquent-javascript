const Vector = require('../models/vector');
const constants = require('../data/constants');
const { actorChars, staticChars, WALL, LAVA } = require('../data/chars.js');

const maxStep = constants.level.maxStep;

class Level {
    constructor(map) {
        this.map = map;

        this.width = map[0].length;
        this.height = map.length;
        this.grid = [];
        this.actors = [];

        this.createGrid();

        this.player = this.actors.filter((actor) => {
            return actor.type == constants.player.type;
        })[0];

        this.status = null;
        this.finishDelay = null;
    }

    createGrid() {
        for (let y = 0; y < this.height; y++) {
            let line = this.map[y];
            let gridLine = [];

            for (let x = 0; x < this.width; x++) {
                let char = line[x];
                let fieldType = null;

                let Actor = actorChars[char];

                if (Actor)
                    this.actors.push(new Actor(new Vector(x, y), char));
                else if (char in staticChars)
                    fieldType = staticChars[char];

                gridLine.push(fieldType);
            }

            this.grid.push(gridLine);
        }
    }

    isFinished() {
        return this.status != null && this.finishDelay < 0;
    }

    obstacleAt(pos, size) {
        let xStart = Math.floor(pos.x);
        let xEnd = Math.ceil(pos.x + size.x);

        let yStart = Math.floor(pos.y);
        let yEnd = Math.ceil(pos.y + size.y);

        if (xStart < 0 || xEnd > this.width || yStart < 0)
            return WALL;
        if (yEnd > this.height)
            return LAVA;

        for (var y = yStart; y < yEnd; y++) {
            for (var x = xStart; x < xEnd; x++) {
                var fieldType = this.grid[y][x];
                if (fieldType) return fieldType;
            }
        }
    }

    actorAt(actor) {
        for (var i = 0; i < this.actors.length; i++) {
            var other = this.actors[i];
            if (other != actor &&
                actor.pos.x + actor.size.x > other.pos.x &&
                actor.pos.x < other.pos.x + other.size.x &&
                actor.pos.y + actor.size.y > other.pos.y &&
                actor.pos.y < other.pos.y + other.size.y)
                return other;
        }
    }

    animate(step, keys) {
        if (this.status != null)
            this.finishDelay -= step;

        while (step > 0) {
            var thisStep = Math.min(step, maxStep);
            this.actors.forEach(function(actor) {
                actor.act(thisStep, this, keys);
            }, this);
            step -= thisStep;
        }
    }

    playerTouched(type, actor) {
        if (type == LAVA && this.status == null) {
            this.status = constants.statuses.lost;
            this.finishDelay = 1;
        } else if (type == constants.coin.type) {
            this.actors = this.actors.filter(function(other) {
                return other != actor;
            });
            if (!this.actors.some(function(actor) {
                return actor.type == constants.coin.type;
            })) {
                this.status = constants.statuses.win;
                this.finishDelay = 1;
            }
        }
    }
}

module.exports = Level;