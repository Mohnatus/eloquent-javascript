const codes = {
    37: "left", 
    38: "up", 
    39: "right"
};

const pressed = Object.create(null);

function handler(event) {
    if (codes.hasOwnProperty(event.keyCode)) {
        const down = event.type == "keydown";
        pressed[codes[event.keyCode]] = down;
        event.preventDefault();
    }
}

function listen() {
    addEventListener("keydown", handler);
    addEventListener("keyup", handler);
}

function stop() {
    removeEventListener("kyedown", handler);
    removeEventListener("keyup", handler);
}

function getPressed() {
    return pressed;
}

getPressed.listen = listen;
getPressed.stop = stop;


module.exports = getPressed;