var names = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];

console.log('Модуль подключен');

exports.name = function (number) {
    return names[number];
};
exports.number = function (name) {
    return names.indexOf(name);
};