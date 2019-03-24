const repeat = require('./repeat.js');

const TextCell = require('./text-cell.js');

function RTextCell(text) {
    TextCell.call(this, text);
}
RTextCell.prototype = Object.create(TextCell.prototype);
RTextCell.prototype.draw = function (width, height) {
    var result = [];
    for (var i = 0; i < height; i++) {
        var line = this.text[i] || "";
        result.push(repeat(" ", width - line.length) + line);
    }
    return result;
};

if (typeof module != "undefined" && module.exports)
    module.exports = RTextCell;