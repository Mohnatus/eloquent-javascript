const parse = require('./parser');
const evaluate = require('./evaluate');
const topEnv = require('./topEnv');

// run даёт удобный способ записи и запуска. Она создаёт свежее окружение, парсит и разбирает строчки, которые мы ей передаём, так, как будто они являются одной программой.
function run() {
    var env = Object.create(topEnv);
    var program = Array.prototype.slice
        .call(arguments, 0).join("\n");
    return evaluate(parse(program), env);
}

module.exports = run;