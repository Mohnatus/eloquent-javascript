function repeat(string, times) {
    var result = "";
    for (var i = 0; i < times; i++)
        result += string;
    return result;
}

if (typeof module != "undefined" && module.exports)
    module.exports = repeat;