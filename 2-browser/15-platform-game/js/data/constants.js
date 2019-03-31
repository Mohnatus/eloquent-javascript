module.exports = {

    statuses: {
        "win": "win",
        "lost": "lost"
    },
    
    level: {
        maxStep: 0.05,
    },

    coin: {
        type: "coin",
        wobbleSpeed: 8,
        wobbleDist: 0.07,
        xOffset: 0.2,
        yOffset: 0.1,
        xSize: 0.6,
        ySize: 0.6
    },

    lava: {
        type: "lava",
        xOffset: 0,
        yOffset: 0,
        xSize: 1,
        ySize: 1,
        symbols: {
            "horizontal": "=",
            "vertical": "|",
            "drop": "v"
        },
        speed: {
            "=": {x: 2, y: 0},
            "|": {x: 0, y: 2},
            "v": {x: 0, y: 3}
        }
    },

    player: {
        startLivesCount: 3,
        type: "player",
        xSpeed: 7,
        gravity: 30,
        jumpSpeed: 17,
        xOffset: 0,
        yOffset: -0.5,
        xSize: 0.8, 
        ySize: 1.5,
        statuses: {
            lost: "lost"
        }
    }
    
}