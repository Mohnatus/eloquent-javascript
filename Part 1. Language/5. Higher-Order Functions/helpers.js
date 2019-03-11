function average(array) {
    function plus(a, b) { return a + b; }
    return array.reduce(plus) / array.length;
}

function getByName(ancestry) {
    var byName = {};
    ancestry.forEach(function (person) {
        byName[person.name] = person;
    });
    return byName;
}

function reduceAncestors(person, f, defaultValue, byName) {
    function valueFor(person) {
        if (person == null)
            return defaultValue;
        else
            return f(person, valueFor(byName[person.mother]),
                valueFor(byName[person.father]));
    }
    return valueFor(person);
}

module.exports.average = average;
module.exports.getByName = getByName;
module.exports.reduceAncestors = reduceAncestors;