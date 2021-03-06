# Регулярные выражения

## Метод search

Аналог ```indexOf```, который принимает регулярку и возвращает индекс ее первого вхождения (или -1):

```js
"  word".search(/\S/); // 2
"      ".search(/\S/); // -1
```

## Свойство lastIndex

У объекта регулярок есть свойства. Одно из них – source, содержащее строку. Ещё одно – ```lastIndex```, контролирующее, в некоторых условиях, где начнётся следующий поиск вхождений.
Эти условия включают необходимость присутствия глобальной опции ```g```, и то, что поиск должен идти с применением метода exec. 

```js
var pattern = /y/g;
pattern.lastIndex = 3;
var match = pattern.exec("xyzzy");
console.log(match.index);
// → 4
console.log(pattern.lastIndex);
// → 5
```

Если поиск был успешным, вызов exec обновляет свойство ```lastIndex```, чтоб оно указывало на позицию после найденного вхождения. Если успеха не было, ```lastIndex``` устанавливается в ноль – как и ```lastIndex``` у только что созданного объекта.

Ещё один интересный эффект опции ```g``` в том, что она меняет работу метода ```match```. Когда он вызывается с этой опцией, вместо возврата массива, похожего на результат работы ```exec```, он находит все вхождения шаблона в строке и возвращает массив из найденных подстрок.

```js
console.log("Банан".match(/ан/g));
// → ["ан", "ан"]
```

## Циклы по вхождениям

Типичная задача – пройти по всем вхождениям шаблона в строку так, чтобы иметь доступ к объекту ```match``` в теле цикла, используя ```lastIndex``` и ```exec```.

```js
var input = "Строчка с 3 числами в ней... 42 и 88.";
var number = /\b(\d+)\b/g;
var match;
while (match = number.exec(input))
  console.log("Нашёл ", match[1], " на ", match.index);
// → Нашёл 3 на 10
//   Нашёл 42 на 29
//   Нашёл 88 на 34
```

## [Разбор INI файла](./ini.js)

Точный формат файла (который довольно широко используется, и обычно называется INI), следующий:
— пустые строки и строки, начинающиеся с точки с запятой, игнорируются — строки, заключённые в квадратные скобки, начинают новую секцию — строки, содержащие алфавитно-цифровой идентификатор, за которым следует ```=```, добавляют настройку в данной секции
Всё остальное – неверные данные.
Наша задача – преобразовать такую строку в массив объектов, каждый со свойством ```name``` и массивом настроек. Для каждой секции нужен один объект, и ещё один – для глобальных настроек сверху файла.

## [Регулярный гольф](./golf.js)

«Гольфом» в коде называют игру, где нужно выразить заданную программу минимальным количеством символов. Регулярный гольф – практическое упражнение по написанию наименьших возможных регулярок для поиска заданного шаблона, и только его.

Для каждой из подстрочек напишите регулярку для проверки их нахождения в строке. Регулярка должна находить только эти указанные подстроки. Не волнуйтесь насчёт границ слов, если это не упомянуто особо. Когда у вас получится работающая регулярка, попробуйте её уменьшить.

## [Кавычки в тексте](./quotes.js)

Допустим, вы написали рассказ, и везде для обозначения диалогов использовали одинарные кавычки. Теперь вы хотите заменить кавычки диалогов на двойные, и оставить одинарные в сокращениях слов типа aren’t.
Придумайте шаблон, различающий два этих использования кавычек, и напишите вызов метода ```replace```, который производит замену.

## [Снова числа](./numbers.js)

Последовательности цифр можно найти простой регуляркой ```/\d+/```.
Напишите выражение, находящее только числа, записанные в стиле JavaScript. Оно должно поддерживать возможный минус или плюс перед числом, десятичную точку, и экспоненциальную запись ```5e-3``` или ```1E10``` – опять-таки с возможными плюсом или минусом. Также заметьте, что до или после точки не обязательно могут стоять цифры, но при этом число не может состоять из одной точки. То есть, ```.5``` или ```5.``` – допустимые числа, а одна точка сама по себе – нет.

