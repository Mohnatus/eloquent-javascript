const topEnv = Object.create(null);

// Для использования конструкции if 
topEnv["true"] = true;
topEnv["false"] = false;

// Для поддержки простых арифметических операторов и сравнения
["+", "-", "*", "/", "==", "<", ">"].forEach(function (op) {
    topEnv[op] = new Function("a, b", "return a " + op + " b;");
});

// Также пригодится способ вывода значений
topEnv["print"] = function (value) {
    console.log(value);
    return value;
};


// Массивы
topEnv["array"] = function() {
    return Array.prototype.slice.call(arguments);
};
topEnv["length"] = function(arr) {
    return arr.length;
};
topEnv["element"] = function(arr, n) {
    return arr[n];
};

module.exports = topEnv;