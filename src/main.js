// game config
let config = {
    type: Phaser.AUTO,
    width: 400,
    height: 800,
    physics: {
        default: 'arcade',
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