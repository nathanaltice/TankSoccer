// Nathan Altice
// Tank Soccer
// Updated: 4/26/20
// Demonstrates Arcade Physics collision, colliders, compound bodies
// Compound bodies example adapted from samme's example on code pen: https://codepen.io/samme/pen/ExYGRyo

// game config
let config = {
    type: Phaser.CANVAS,
    width: 400,
    height: 700,
    physics: {
        default: "arcade",
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Soccer ]
}

let game = new Phaser.Game(config);

// some globals
let centerX = game.config.width / 2;
let centerY = game.config.height / 2;
let quarterFieldX = game.config.width / 4;
let quarterFieldY = game.config.height / 4;

let cursors = null;