function skipSpace(string) {
    var first = string.search(/\S/);
    if (first == -1) return "";
    
    string = string.slice(first);

    if (string[0] !== '#') return string;

    var nextString = string.search(/\n/);
    string = string.slice(nextString);
    return skipSpace(string);
}

module.exports = skipSpace;