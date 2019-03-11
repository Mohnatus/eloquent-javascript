function range(from, to, step) {
    let result = [];

    step = step || 1;

    if (from - to < 0) {
        if (step < 0) return [];

        for (let i = from; i <= to; i+=step) {
            result.push(i);
        }
    } else {
        if (step > 0) return [];

        for (let i = from; i >= to; i+=step) {
            result.push(i);
        }
    }
    
    return result;
}

function sum(arr) {
    let result = 0;

    for (let i = 0, count = arr.length; i < count; i++) {
        result += arr[i];
    }

    return result;
}


console.log(sum(range(1, 10)));
// → 55
console.log(range(5, 2, -1));
// → [5, 4, 3, 2]