let { average } = require('./helpers.js');
let ancestry = JSON.parse(require('./ancestry.js'));

let groupBy = (arr, getGroup) => {
    return arr.reduce((result, current) => {
        let group = getGroup(current);
        result[group] = result[group] || [];
        result[group].push(current);
        return result;
    }, {});
}

let getCentury = (person) => {
    return Math.ceil(person.died / 100);
}

let centuries = groupBy(ancestry, getCentury);

for (let century in centuries) {
    centuries[century] = average(centuries[century].map(person => person.died - person.born));
}

console.log(centuries)

