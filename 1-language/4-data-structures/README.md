# Структуры данных: объекты и массивы

## Белка-оборотень

Иногда, обычно между восемью и десятью часами вечера, Жак против своей воли превращается в небольшого грызуна с пушистым хвостом.

С одной стороны, Жак рад, что он не превращается в классического волка. Превращение в белку влечёт меньше проблем. Вместо того, чтобы волноваться о том, не съешь ли ты соседа (это было бы неловко), он волнуется, как бы его не съел соседский кот. После того, как он дважды просыпался на очень тонкой ветке в кроне дуба, голый и дезориентированный, он приучился запирать окна и двери в своей комнате на ночь, и класть несколько орешков на пол, чтобы чем-то занять себя.

Так решаются проблемы с котом и дубом. Но Жак всё ещё страдает от своего заболевания. Нерегулярные обращения наводят его на мысль, что они должны быть чем-то вызваны. Сначала он думал, что это происходит только в те дни, когда он прикасался к деревьям. Он перестал это делать, и даже стал избегать подходить к ним. Но проблема не исчезла.

**[journal.js](./journal.js)**

Перейдя к более научному подходу, Жак решил вести ежедневный дневник всего, чем он занимался, записывая туда, обращался ли он в белку. Так он надеется сузить круг вещей, приводящих к трансформации.

Как только у него будет достаточно данных, он собирается вычислить корреляцию между его оборачиваниями и событиями каждого из дней, и в идеале узнать из их корреляций что-то полезное.

Корреляция – это мера зависимости между переменными величинами (переменными в статистическом смысле, а не в смысле JavaScript). Она обычно выражается в виде коэффициента, принимающего значения от -1 до 1. Нулевая корреляция обозначает, что переменные вообще не связаны, а корреляция 1 означает, что они полностью связаны – если вы знаете одну, вы автоматически знаете другую. Минус один также означает прочную связь переменных, но и их противоположность – когда одна true, вторая всегда false.

Для измерения корреляции булевских переменных хорошо подходит коэффициент фи (```ϕ```), к тому же, его сравнительно легко подсчитать. Для этого нам нужна таблица, содержащая количество раз, когда наблюдались различные комбинации двух переменных. 

**[phi.js](./phi.js)**

ϕ можно вычислить по следующей формуле, где ```n``` относится к ячейкам таблицы:

![Формула для вычисления ϕ](https://karmazzin.gitbooks.io/eloquentjavascript_ru/content/img/3-5.png "Формула для вычисления ϕ")

**[Итоговые корреляции](./getData.js)**

## Задания

### [Сумма диапазона](./range.js)

Напишите функцию ```range```, принимающую два аргумента, начало и конец диапазона, и возвращающую массив, который содержит все числа из него, включая начальное и конечное.

Затем напишите функцию ```sum```, принимающую массив чисел и возвращающую их сумму. Запустите указанную выше инструкцию и убедитесь, что она возвращает 55.

В качестве бонуса дополните функцию ```range```, чтобы она могла принимать необязательный третий аргумент – шаг для построения массива. Если он не задан, шаг равен единице. Вызов функции ```range(1, 10, 2)``` должен будет вернуть ```[1, 3, 5, 7, 9]```. Убедитесь, что она работает с отрицательным шагом так, что вызов ```range(5, 2, -1)``` возвращает ```[5, 4, 3, 2]```.

### [Список](./list.js)

Список – связанный набор объектов, где первый объект содержит ссылку на второй, второй – на третий, и т.п.

```js
var list = {
  value: 1,
  rest: {
    value: 2,
    rest: {
      value: 3,
      rest: null
    }
  }
};
```

В результате объекты формируют цепочку:

![Связный список](https://habrastorage.org/files/dfa/808/2d2/dfa8082d24df4c59b594d5cf164119c2.png "Связный список")

Напишите функцию ```arrayToList```, которая строит такую структуру, получая в качестве аргумента ```[1, 2, 3]```, а также функцию ```listToArray```, которая создаёт массив из списка. 

Также напишите вспомогательную функцию ```prepend```, которая получает элемент и создаёт новый список, где этот элемент добавлен спереди к первоначальному списку, и функцию ```nth```, которая в качестве аргументов принимает список и число, а возвращает элемент на заданной позиции в списке, или же ```undefined``` в случае отсутствия такого элемента.

Если ваша версия ```nth``` не рекурсивна, тогда напишите её рекурсивную версию.

### [Глубокое сравнение](./deepEqual.js)

Оператор == сравнивает переменные объектов, проверяя, ссылаются ли они на один объект. Но иногда полезно было бы сравнить объекты по содержимому.

Напишите функцию deepEqual, которая принимает два значения и возвращает true, только если это два одинаковых значения или это объекты, свойства которых имеют одинаковые значения, если их сравнивать рекурсивным вызовом deepEqual.

Чтобы узнать, когда сравнивать величины через ```===```, а когда – объекты по содержимому, используйте оператор ```typeof```. Если он выдаёт ```object``` для обеих величин, значит нужно делать глубокое сравнение. Не забудьте об одном дурацком исключении, случившемся из-за исторических причин: ```typeof null``` тоже возвращает ```object```.