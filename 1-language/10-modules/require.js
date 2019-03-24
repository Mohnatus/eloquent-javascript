const fs = require('fs');
function readFile(file) {
    return fs.readFileSync(file + '.js', 'utf8');
}

function customRequire(name) {
    if (name in require.cache)
        return require.cache[name];

    var code = new Function("exports, module", readFile(name));
    var exports = {}, module = {exports: exports};
    code(exports, module);

    require.cache[name] = module.exports;
    return module.exports;
}

require.cache = Object.create(null);

var weekDay = customRequire('weekday'); // Модуль подключен
console.log(weekDay.name(1)); // Вторник

var doubleWeekDay = customRequire('weekday');
console.log(doubleWeekDay.name(1)); // Вторник