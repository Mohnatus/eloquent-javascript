function verify(regexp, yes, no) {
    // Ignore unfinished exercises
    if (regexp.source == "...") return;
    let success = 0;
    let fail = 0; 
    yes.forEach(function (s) {
        if (!regexp.test(s)) {
            console.log("Не нашлось '" + s + "'");
            fail++;
        } else success++;
    });
    no.forEach(function (s) {
        if (regexp.test(s)) {
            console.log("Неожиданное вхождение '" + s + "'");
            fail++;
        } else success++;
    });

    console.log('success: ', success, 'fails: ', fail);
}

// car и cat
verify(/ca[r|t]/,
    ["my car", "bad cats"],
    ["camper", "high art"]);

// pop и prop
verify(/pr?op/,
    ["pop culture", "mad props"],
    ["plop"]);

// ferret, ferry, ferrari
verify(/ferr[et|y|ari]/,
    ["ferret", "ferry", "ferrari"],
    ["ferrum", "transfer A"]);

// любое слово на -ious
verify(/ious\b/,
    ["how delicious", "spacious room"],
    ["ruinous", "consciousness"]);

// Пробел, за которым идёт точка, запятая, двоеточие или точка с запятой
verify(/\s[.,:;]/,
    ["bad punctuation ."],
    ["escape the dot"]);

// Слово длинее шести букв
verify(/\w{7,}/,
    ["hottentottententen"],
    ["no", "hotten totten tenten"]);

// Слово без букв e
verify(/\b[^e\W]{1,}\b/,
    ["red platypus", "wobbling nest"],
    ["earth bed", "learning ape"]);