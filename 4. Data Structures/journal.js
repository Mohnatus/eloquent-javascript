let journal = [];

function addEntry(events, didITurnIntoASquirrel) {
    journal.push({
        events: events,
        squirrel: didITurnIntoASquirrel
    })
}

addEntry(["работа", "тронул дерево", "пицца", "пробежка", "телевизор"], false);
addEntry(["работа", "мороженое", "цветная капуста", "лазанья", "тронул дерево", "почистил зубы"], false);
addEntry(["выходной", "велик", "перерыв", "арахис", "пивасик"], true);