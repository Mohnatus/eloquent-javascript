function deepEqual(a, b) {
    if (a === b) return true;

    if (a == null || b == null) return false;

    if (typeof a !== 'object' || typeof b !== 'object') return false;

    for (let prop in a) {
        if (a.hasOwnProperty(prop)) {
            if (!b[prop]) return false;
        }
    }

    for (let prop in b) {
        if (b.hasOwnProperty(prop)) {
            if (!a[prop]) return false;

            return deepEqual(a[prop], b[prop]);
        }
    }
}

var obj = { here: { is: "an" }, object: 2 };
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, { here: 1, object: 2 }));
// → false
console.log(deepEqual(obj, { here: { is: "an" }, object: 2 }));
// → true