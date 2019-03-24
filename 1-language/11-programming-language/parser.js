const skipSpace = require('./skipSpace');

// пропускаем пробелы
// распознаем строки, числа, имена переменных и специальные команды
function parseExpression(program) {
    program = skipSpace(program);
    var match, expr;
    if (match = /^"([^"]*)"/.exec(program))
        expr = { type: "value", value: match[1] };
    else if (match = /^\d+\b/.exec(program))
        expr = { type: "value", value: Number(match[0]) };
    else if (match = /^[^\s(),"]+/.exec(program))
        expr = { type: "word", name: match[0] };
    else
        throw new SyntaxError("Неожиданный синтаксис: " + program);

    // проверяем, не является ли выражение приложением
    return parseApply(expr, program.slice(match[0].length));
}

// после приложения обязательно идут скобки
function parseApply(expr, program) {
    program = skipSpace(program);
    if (program[0] != "(")
        return { expr: expr, rest: program };

    program = skipSpace(program.slice(1));
    expr = { type: "apply", operator: expr, args: [] };

    // собираем все параметры, перечисленные в скобках через запятые
    // с рекурсивным вызовом parseExpression для разбора каждого аргумента
    // рекурсия непрямая, parseApply и parseExpression вызывают друг друга.
    while (program[0] != ")") {
        var arg = parseExpression(program);
        expr.args.push(arg.expr);
        program = skipSpace(arg.rest);
        if (program[0] == ",")
            program = skipSpace(program.slice(1));
        else if (program[0] != ")")
            throw new SyntaxError("Ожидается ',' or ')'");
    }

    // Поскольку приложение само по себе может быть выражением(multiplier(2)(1)), parseApply должна, после разбора приложения, вызвать себя снова, проверив, не идёт ли далее другая пара скобок.
    return parseApply(expr, program.slice(1));
}

function parse(program) {
    var result = parseExpression(program);
    if (skipSpace(result.rest).length > 0)
        throw new SyntaxError("Неожиданный текст после программы");
    return result.expr;
}

let eggProgramm1 = parse("+(a, 10)");
// → {type: "apply",
//    operator: {type: "word", name: "+"},
//    args: [{type: "word", name: "a"},
//           {type: "value", value: 10}]}
// console.log(evaluate(eggProgramm1, topEnv)); // Неопределённая переменная: a

module.exports = parse;
