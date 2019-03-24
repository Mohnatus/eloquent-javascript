const fs = require('fs');
function readFile(file) {
    return fs.readFileSync(file + '.js', 'utf8');
}

function customRequire(name) {
    var code = new Function("exports", readFile(name));
    var exports = {};
    code(exports);
    return exports;
}


var weekDay = customRequire('weekday'); // Модуль подключен
console.log(weekDay.name(1)); // Вторник

var doubleWeekDay = customRequire('weekday');  // Модуль подключен
console.log(doubleWeekDay.name(1)); // Вторник