function arrayToList(arr) {
    let list = null;
    let last = null;

    for (let i = 0, count = arr.length; i < count; i++) {
        let obj = {
            value: arr[i],
            rest: null
        };
        if (last) last.rest = obj;
        if (!list) list = obj;
        last = obj;
    }

    return list;
}

function listToArray(list) {
    let last = list;
    let arr = [];
    while(last) {
        arr.push(last.value);
        last = last.rest;
    }
    return arr;
}

function prepend(el, list) {
    return {
        value: el,
        rest: list || null
    }
}

function nth(list, index) {
    let current = 0;

    let check = function(item) {
        if (!item) return false;
        if (current++ == index) return item.value;
        return check(item.rest);
    }

    return check(list);
}

console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20
