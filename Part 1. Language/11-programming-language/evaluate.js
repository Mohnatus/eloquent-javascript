const specialForms = Object.create(null);

// if представлено в виде особой формы а не обычной функции, потому что аргументы функций вычисляются перед вызовом, а if должен интерпретировать один из двух аргументов – второй или третий, в зависимости от значения первого.
specialForms["if"] = function (args, env) {
    if (args.length != 3)
        throw new SyntaxError("Неправильное количество аргументов для if");

    // Egg отличается от JavaScript тем, как он обрабатывает условие if.Он не будет считать ноль или пустую строку за false.
    if (evaluate(args[0], env) !== false)
        return evaluate(args[1], env);
    else
        return evaluate(args[2], env);
};

specialForms["while"] = function (args, env) {
    if (args.length != 2)
        throw new SyntaxError("Неправильное количество аргументов для while");

    while (evaluate(args[0], env) !== false)
        evaluate(args[1], env);

    // Поскольку undefined не задано в Egg,
    // за отсутствием осмысленного результата возвращаем false
    return false;
};

// Ещё одна основная часть языка – do, выполняющий все аргументы сверху вниз. Его значение – это значение, выдаваемое последним аргументом.
specialForms["do"] = function (args, env) {
    var value = false;
    args.forEach(function (arg) {
        value = evaluate(arg, env);
    });
    return value;
};

// Чтобы создавать переменные и давать им значения, мы создаём форму define. Она ожидает word в качестве первого аргумента, и выражение, производящее значение, которое надо присвоить этому слову в качестве второго. 
specialForms["define"] = function (args, env) {
    if (args.length != 2 || args[0].type != "word")
        throw new SyntaxError("Bad use of define");
    var value = evaluate(args[1], env);
    env[args[0].name] = value;
    return value;
};

// расценивает последний аргумент как тело функции, а все предыдущие – имена аргументов функции
specialForms["fun"] = function (args, env) {
    if (!args.length)
        throw new SyntaxError("Функции нужно тело");
    function name(expr) {
        if (expr.type != "word")
            throw new SyntaxError("Имена аргументов должны быть типа word");
        return expr.name;
    }
    var argNames = args.slice(0, args.length - 1).map(name);
    var body = args[args.length - 1];

    return function () {
        if (arguments.length != argNames.length)
            throw new TypeError("Неверное количество аргументов");
        // У функций в Egg своё локальное окружение, как и в JavaScript.
        var localEnv = Object.create(env);
        for (var i = 0; i < arguments.length; i++)
            localEnv[argNames[i]] = arguments[i];
        return evaluate(body, localEnv);
    };
};

specialForms["set"] = function(args, env) {
    let value = env[args[1].name];
    let argName = args[0].name;
    let environment = env;
    while(environment) {
        // область видимости не наследуется от Object.prototype, поэтому если вам надо вызвать на них hasOwnProperty, придётся использовать такую неуклюжую конструкцию:
        if (Object.prototype.hasOwnProperty.call(environment, argName)) {
            environment[argName] = value;
            return;
        }
        environment = Object.getPrototypeOf(environment);
    }

    throw new ReferenceError('Не найдена переменная ' + argName);
}

function evaluate(expr, env) {
    switch (expr.type) {
        // строки и числа просто возвращаются
        case "value": 
            return expr.value;

        // имена переменных ищутся в окружении
        case "word": 
            if (expr.name in env)
                return env[expr.name];
            else
                throw new ReferenceError("Неопределённая переменная: " +
                    expr.name);

        // приложения в Egg - это обычные js-функции
        // они хранятся в специальных формах
        case "apply": 
            if (expr.operator.type == "word" &&
                expr.operator.name in specialForms)
                return specialForms[expr.operator.name](expr.args,
                    env);
            var op = evaluate(expr.operator, env);
            if (typeof op != "function")
                throw new TypeError("Приложение не является функцией.");
            return op.apply(null, expr.args.map(function (arg) {
                return evaluate(arg, env);
            }));
    }
}

module.exports = evaluate;