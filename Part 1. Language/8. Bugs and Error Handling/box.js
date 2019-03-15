var box = {
    locked: true,
    unlock: function () { this.locked = false; },
    lock: function () { this.locked = true; },
    _content: [],
    get content() {
        if (this.locked) throw new Error("Заперто!");
        return this._content;
    }
};
// box.locked = false;
function withBoxUnlocked(body) {
    var locked = box.locked;
    if (locked) {
        box.unlock();
    }
    try {
        body();
    } finally {
        if (locked) box.lock();
    }
}

withBoxUnlocked(function () {
    box.content.push("золотишко");
});

try {
    withBoxUnlocked(function () {
        throw new Error("Пираты на горизонте! Отмена!");
    });
} catch (e) {
    console.log("Произошла ошибка:", e);
}
console.log(box.locked);
// → true