const month = (function() {
    const names = ['January', 'February', 'March', 'April',
                    'May', 'June', 'July', 'August',
                    'September', 'October', 'November', 'December'];

    return {
        name: (name) => names[name],
        number: (number) => names.indexOf(number)
    }
})();

console.log(month.name(2));
// → March
console.log(month.number("November"));
// → 10