define(["weekday"], function (weekDay, today) {
    console.log(weekDay.name(2));
});

//  притворимся, что у нас есть функция backgroundReadFile, которая принимает имя файла и функцию, и вызывает эту функцию с содержимым этого файла, как только он будет загружен. 

// Чтоб отслеживать модули, пока они загружаются, define использует объекты, описывающие состояние модулей, сообщает нам, доступны ли они уже, и предоставляет их интерфейс по доступности.

// Функция getModule принимает имя и возвращает такой объект, и убеждается в том, что модуль поставлен в очередь загрузки.Она использует кеширующий объект, чтобы не грузить один модуль дважды.

var defineCache = Object.create(null);
var currentMod = null;

function getModule(name) {
    if (name in defineCache)
        return defineCache[name];

    var module = {
        exports: null,
        loaded: false,
        onLoad: []
    };
    defineCache[name] = module;
    backgroundReadFile(name, function (code) {
        currentMod = module;
        new Function("", code)();
    });
    return module;
}

// Мы предполагаем, что загружаемый файл тоже содержит вызов define.Переменная currentMod используется, чтобы сообщить этому вызову о загружаемом объекте модуля, чтобы тот смог обновить этот объект после загрузки.Мы ещё вернёмся к этому механизму.

// Функция define сама использует getModule для загрузки или создания объектов модулей для зависимостей текущего модуля.Её задача – запланировать запуск функции moduleFunction(содержащей сам код модуля) после загрузки зависимостей.Для этого она определяет функцию whenDepsLoaded, добавляемую в массив onLoad, содержащий все пока ещё не загруженные зависимости.Эта функция сразу прекращает работу, если есть ещё незагруженные зависимости, так что она выполнит свою работу только раз, когда последняя зависимость загрузится.Она также вызывается сразу из самого define, в случае когда никакие зависимости не нужно грузить.

function define(depNames, moduleFunction) {
    var myMod = currentMod;
    var deps = depNames.map(getModule);

    deps.forEach(function (mod) {
        if (!mod.loaded)
            mod.onLoad.push(whenDepsLoaded);
    });

    function whenDepsLoaded() {
        if (!deps.every(function (m) { return m.loaded; }))
            return;

        var args = deps.map(function (m) { return m.exports; });
        var exports = moduleFunction.apply(null, args);
        if (myMod) {
            myMod.exports = exports;
            myMod.loaded = true;
            myMod.onLoad.every(function (f) { f(); });
        }
    }
    whenDepsLoaded();
}

// Когда все зависимости доступны, whenDepsLoaded вызывает функцию, содержащую модуль, передавая в виде аргументов интерфейсы зависимостей.

// Первое, что делает define, это сохраняет значение currentMod, которое было у него при вызове, в переменной myMod. Вспомните, что getModule прямо перед исполнением кода модуля сохранил соответствующий объект модуля в currentMod. Это позволяет whenDepsLoaded хранить возвращаемое значение функции модуля в свойстве exports этого модуля, установить свойство loaded модуля в true, и вызвать все функции, ждавшие загрузки модуля.