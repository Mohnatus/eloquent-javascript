const specialForms = Object.create(null);

specialForms["if"] = function (args, env) {
    if (args.length != 3)
        throw new SyntaxError("Неправильное количество аргументов для if");

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

specialForms["do"] = function (args, env) {
    var value = false;
    args.forEach(function (arg) {
        value = evaluate(arg, env);
    });
    return value;
};

specialForms["define"] = function (args, env) {
    if (args.length != 2 || args[0].type != "word")
        throw new SyntaxError("Bad use of define");
    var value = evaluate(args[1], env);
    env[args[0].name] = value;
    return value;
};

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
        var localEnv = Object.create(env);
        for (var i = 0; i < arguments.length; i++)
            localEnv[argNames[i]] = arguments[i];
        return evaluate(body, localEnv);
    };
};

function evaluate(expr, env) {
    switch (expr.type) {
        case "value":
            return expr.value;

        case "word":
            if (expr.name in env)
                return env[expr.name];
            else
                throw new ReferenceError("Неопределённая переменная: " +
                    expr.name);
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