const run = require('./run');
const fs = require('fs');

const prog = fs.readFileSync('programms/arrays');
run(prog);