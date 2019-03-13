function draw(world) {
    var turn = function() {
        world.turn();
        document.getElementById('world').innerHTML = world.toString();
        setTimeout(turn, 1 * 1000) 
    }

    turn();
}

module.exports = draw;