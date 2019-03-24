const run = require('./run');
const fs = require('fs');

// не меняется значение глобальной переменной
const prog1 = fs.readFileSync('programms/not-scope');
run(prog1); // 4

// меняется значение глобальной переменной
const prog2 = fs.readFileSync('programms/scope');
run(prog2);  // 50

// ошибка - нет переменной
run("set(quux, true)");