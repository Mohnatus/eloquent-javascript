# Модули

* Пространство имен
* Повторное использование
* Устранение связей
* Использование функций в качестве пространств имён
* Объекты в качестве интерфейсов

## Отсоединяемся от глобальной области видимости

мы можем сделать систему, разрешающую одному модулю обращаться к интерфейсному объекту другого, без выхода в глобальную ОВ. Наша цель – функция ```require```, которая, получая имя модуля, загрузит его файл (с диска или из сети, в зависимости от платформы) и вернёт соответствующее значение с интерфейсом.

Нам понадобятся две вещи. Во-первых, функция ```readFile```, возвращающая содержимое файла в виде строки. Во-вторых, нам нужна возможность выполнить содержимое этой строки как код.

## Выполняем данные как код

конструктор ```Function```. Он принимает два аргумента – строку, содержащую список имён аргументов через запятую, и строку, содержащую тело функции.

Так как конструктор ```new Function``` оборачивает код модуля в функцию, нам не надо писать функцию, оборачивающую пространство имён, внутри самого модуля. А так как ```exports``` является аргументом функции модуля, модулю не нужно его объявлять. Это убирает много мусора из нашего модуля-примера.

## Require

**[require-simple](./require-simple.js)**

У такого простого варианта require есть недостатки. Во-первых, он загрузит и выполнит модуль каждый раз, когда его грузят через require – если у нескольких модулей есть одинаковые зависимости, или вызов require находится внутри функции, которая вызывается многократно, будет потеряно время и энергия.
Это можно решить, храня уже загруженные модули в объекте, и возвращая существующее значение, когда он грузится несколько раз.
Вторая проблема – модуль не может экспортировать переменную напрямую, только через объект export. К примеру, модулю может потребоваться экспортировать только конструктор объекта, объявленного в нём. Сейчас это невозможно, поскольку ```require``` всегда использует объект ```exports``` в качестве возвращаемого значения.
Традиционное решение – предоставить модули с другой переменной, ```module```, которая является объектом со свойством ```exports```. Оно изначально указывает на пустой объект, созданный ```require```, но может быть перезаписано другим значением, чтобы экспортировать что-либо ещё.

**[require](./require.js)**

Сейчас у нас есть система модулей, использующих одну глобальную переменную ```require```, чтобы позволять модулям искать и использовать друг друга без выхода в глобальную область видимости.
Такой стиль системы модулей называется CommonJS, по имени псевдостандарта, который первым его описал. Он встроен в систему Node.js. Настоящие реализации делают гораздо больше описанного мною. Главное, что у них есть более умный способ перехода от имени модуля к его коду, который разрешает загружать модули по относительному пути к файлу, или же по имени модуля, указывающему на локально установленные модули.

## Медленная загрузка модулей

Хотя и возможно использовать стиль CommonJS для браузера, но он не очень подходит для этого. Загрузка файла из Сети происходит медленнее, чем с жёсткого диска. Пока скрипт в браузере работает, на сайте ничего другого не происходит
Можно обойти это, запуская программу типа Browserify с вашим кодом перед выкладыванием её в веб. Она просмотрит все вызовы ```require```, обработает все зависимости и соберёт нужный код в один большой файл. Веб-сайт просто грузит этот файл и получает все необходимые модули.
Второй вариант – оборачивать код модуля в функцию, чтобы загрузчик модулей сначала грузил зависимости в фоне, а потом вызывал функцию, инициализирующую модуль, после загрузки зависимостей. Этим занимается система AMD (асинхронное определение модулей).

**[amd](./amd.js)**

## [Названия месяцев](./months.js)

Напишите простой модуль типа ```weekday```, преобразующий номера месяцев (начиная с нуля) в названия и обратно. Выделите ему собственное пространство имён, т.к. ему потребуется внутренний массив с названиями месяцев, и используйте чистый JavaScript, без системы загрузки модулей.