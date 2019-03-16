let fs = require('fs');
let text = fs.readFileSync('text.txt', 'utf8');

let re = /(^|\n|\s)'|'(\s|\r?\n|$)/gm;

text = text.replace(re, (match, a, b) => {
    console.log(123, match, a, b)
    return match.replace(`'`, `"`)
});
console.log(text);
