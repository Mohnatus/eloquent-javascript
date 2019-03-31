const Player = require('../actors/player');
const Coin = require('../actors/coin');
const Lava = require('../actors/lava');

const actorChars = {
    '@': Player,
    'o': Coin,
    '=': Lava,
    '|': Lava,
    'v': Lava
};

const WALL = 'wall';
const LAVA = 'lava';

const staticChars = {
    'x': WALL,
    '!': LAVA
};



module.exports = { actorChars, staticChars, WALL, LAVA };