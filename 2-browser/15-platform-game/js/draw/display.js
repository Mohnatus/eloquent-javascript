const createEl = (name, className) => {
    let el = document.createElement(name);
    if (className) el.className = className;
    return el;
}

const scale = 20;

class DOMDisplay {
    constructor(parent) {
        this.parent = parent;

        this.$lives = this.parent.appendChild(createEl('div', 'lives'));
        this.$level = this.parent.appendChild(createEl('div', 'level'))
    }

    setLevel(level) {
        this.wrap = this.parent.appendChild(createEl('div', 'game'));
        this.level = level;

        this.wrap.appendChild(this.drawBackground());
        this.actorLayer = null;
        this.drawFrame();
    }

    drawBackground() {
        let table = createEl('table', 'background');
        table.style.width = this.level.width * scale + 'px';
        this.level.grid.forEach(row => {
            let rowEl = table.appendChild(createEl('tr'));
            rowEl.style.height = scale + 'px';
            row.forEach(type => {
                rowEl.appendChild(createEl('td', type));
            });
        });
        return table;
    }

    drawActors() {
        let wrap = createEl('div');
        this.level.actors.forEach(actor => {
            let rect = wrap.appendChild(createEl('div', 'actor ' + actor.type));
            rect.style.width = actor.size.x * scale + 'px';
            rect.style.height = actor.size.y * scale + 'px';

            rect.style.left = actor.pos.x * scale + 'px';
            rect.style.top = actor.pos.y * scale + 'px';
        });
        return wrap;
    }

    drawFrame() {
        if (this.actorLayer) {
            this.wrap.removeChild(this.actorLayer);
        }
        this.actorLayer = this.wrap.appendChild(this.drawActors());
        this.wrap.className = "game " + (this.level.status || "");
        this.scrollPlayerIntoView();
    }

    scrollPlayerIntoView() {
        let width = this.wrap.clientWidth;
        let height = this.wrap.clientHeight;
        let margin = width / 3;

        let left = this.wrap.scrollLeft,
            right = left + width,
            top = this.wrap.scrollTop,
            bottom = top + height;

        let player = this.level.player;
        let center = player.pos.plus(player.size.times(0.5)).times(scale);

        if (center.x < left + margin) {
            this.wrap.scrollLeft = center.x - margin;
        } else if (center.x > right - margin) {
            this.wrap.scrollLeft = center.x + margin - width;
        } 

        if (center.y < top + margin)
            this.wrap.scrollTop = center.y - margin;
        else if (center.y > bottom - margin)
            this.wrap.scrollTop = center.y + margin - height;
    }

    showLives(count) {
        this.$lives.textContent = count;
    }

    showLevel(level) {
        this.$level.textContent = level;
    }

    clear() {
        this.wrap.parentNode.removeChild(this.wrap);
    }
}

module.exports = DOMDisplay;