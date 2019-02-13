let arrays = [[1, 2, 3], [4, 5], [6]];
// Your code here.
// → [1, 2, 3, 4, 5, 6]

function flatten(arr) {
    return arr.reduce((accum, curr) => {
        return accum.concat(curr);
    })
}

let flat = flatten(arrays);
console.log(flat);