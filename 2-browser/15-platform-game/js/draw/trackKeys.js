var arrowCodes = {37: "left", 38: "up", 39: "right"};

function trackKeys() {
    const pressed = Object.create(null);
    function handler(event) {
        if (arrowCodes.hasOwnProperty(event.keyCode)) {
            const down = event.type == "keydown";
            pressed[arrowCodes[event.keyCode]] = down;
            event.preventDefault();
        }
    }
    addEventListener("keydown", handler);
    addEventListener("keyup", handler);
    return pressed;
}

module.exports = trackKeys;