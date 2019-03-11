const TextCell = require('./text-cell.js');
const RTextCell = require('./r-text-cell.js');
const UnderlinedCell = require('./underlined-cell.js');

function dataTable(data) {
    var keys = Object.keys(data[0]);
    var headers = keys.map(function (name) {
        return new UnderlinedCell(new TextCell(name));
    });
    var body = data.map(function (row) {
        return keys.map(function (name) {
            var value = row[name];
            if (typeof value == "number")
                return new RTextCell(String(value));
            else
                return new TextCell(String(value));
        });
    });
    return [headers].concat(body);
}

if (typeof module != "undefined" && module.exports)
    module.exports = dataTable;