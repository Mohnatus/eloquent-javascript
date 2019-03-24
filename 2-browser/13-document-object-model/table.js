function createEl(name, ...children) {
    const el = document.createElement(name);
    children.forEach(child => el.appendChild(child));
    return el;
}

function createRow(cells, header) {
    let tag = header ? 'th' : 'td';
    return createEl('tr',
        ...cells.map(cell => {
            let el = createEl(tag, document.createTextNode(cell));
            if (typeof cell === 'number') el.align = 'right';
            return el;
        })
    );
}

function buildTable(data) {
    return createEl('table',
        createRow(Object.keys(data[0]), true),
        ...data.map(row => {
            let values = [];
            headers.forEach(key => values.push(row[key]));
            return createRow(values);
        })
    );
}