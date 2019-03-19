const parse = require('./parser');
const evaluate = require('./evaluate');
const topEnv = require('./topEnv');

function run() {
    var env = Object.create(topEnv);
    var program = Array.prototype.slice
        .call(arguments, 0).join("\n");
    return evaluate(parse(program), env);
}

module.exports = run;