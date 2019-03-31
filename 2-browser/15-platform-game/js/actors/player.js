const Actor = require('./actor');
const Vector = require('../models/vector');
const { player, statuses } = require('../data/constants');

class Player extends Actor {
    constructor(pos) {
        super(pos, player);
        
        this.speed = new Vector(0, 0);
    }

    moveX(step, level, keys) {
        this.speed.x = 0;

        if (keys.left) this.speed.x -= player.xSpeed;
        if (keys.right) this.speed.x += player.xSpeed;

        var motion = new Vector(this.speed.x * step, 0);
        var newPos = this.pos.plus(motion);
        var obstacle = level.obstacleAt(newPos, this.size);
        if (obstacle)
            level.playerTouched(obstacle);
        else
            this.pos = newPos;
    }

    moveY(step, level, keys) {
        this.speed.y += step * player.gravity;
        var motion = new Vector(0, this.speed.y * step);
        var newPos = this.pos.plus(motion);
        var obstacle = level.obstacleAt(newPos, this.size);
        if (obstacle) {
          level.playerTouched(obstacle);
          if (keys.up && this.speed.y > 0)
            this.speed.y = -player.jumpSpeed;
          else
            this.speed.y = 0;
        } else {
          this.pos = newPos;
        } 
    }

    act(step, level, keys) {
        this.moveX(step, level, keys);
        this.moveY(step, level, keys);

        var otherActor = level.actorAt(this);
        if (otherActor)
            level.playerTouched(otherActor.type, otherActor);

        if (level.status == statuses.lost) {
            this.pos.y += step;
            this.size.y -= step;
        }
    }
}

module.exports = Player;