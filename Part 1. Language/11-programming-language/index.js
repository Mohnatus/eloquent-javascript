const run = require('./run');

const fs = require('fs');

const prog1 = fs.readFileSync('programms/1');
console.log(run(prog1)); // false

const prog2 = fs.readFileSync('programms/2');
run(prog2); // 55

const prog3 = fs.readFileSync('programms/3');
run(prog3); // 11

const prog4 = fs.readFileSync('programms/4');
run(prog4); // 1024

