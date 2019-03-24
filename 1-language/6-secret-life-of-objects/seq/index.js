const { ArraySeq, RangeSeq } = require('./seq.js');

function logFive(seq) {
    for (let i = 0; i < 5; i++) {
        var next = seq.next();
        if (!next) break;
        console.log(next);
    }
}

logFive(new ArraySeq([1, 2]));
// → 1
// → 2
logFive(new RangeSeq(100, 1000));
// → 100
// → 101
// → 102
// → 103
// → 104