let ancestry = JSON.parse(require('./ancestry.js'));
let { getByName, average } = require('./helpers.js');

let byName = getByName(ancestry);

function getAgeDiff(person) {
    if (byName[person.mother])
        return person.born - byName[person.mother].born;
    return 0;
}

// вычисляем разницу в возрасте для известных матерей
// отфильтровываем неизвестных
let averageDiff = average(ancestry.map(getAgeDiff).filter(el => el));
console.log(averageDiff);

