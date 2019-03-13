const Wall = require('./wall.js');
// const BouncingCritter = require('./bouncing-critter.js');
// const WallFollower = require('./wall-follower.js');

const Plant = require('../creatures/plant.js');
const PlantEater = require('../creatures/plant-eater.js');
const Predator = require('../creatures/predator.js');

var plan = ["############################",
            "#####         X       ######",
            "##   ***                **##",
            "#   *##**         **  O  *##",
            "#    ***     O    ##**    *#",
            "#       O         ##***    #",
            "#                 ##**X    #",
            "#   O       #*             #",
            "#*          #**       O    #",
            "#***        ##**    O    **#",
            "##****     ###***       *###",
            "############################"];

var legend = { 
    "#": Wall, 
    "O": PlantEater,
    "*": Plant,
    "X": Predator,
    //"o": BouncingCritter,
    //"~": WallFollower
};

module.exports = {
    plan, legend
};