const { plan, legend } = require('./world/map.js');
const World = require('./world/world.js');

const draw = require('./draw.js');

var world = new World(plan, legend);

draw(world);

