define([], function () {
    var names = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
    return {
        name: function (number) { return names[number]; },
        number: function (name) { return names.indexOf(name); }
    };
});