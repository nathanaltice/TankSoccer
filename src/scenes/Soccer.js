class Soccer extends Phaser.Scene {
    constructor() {
        super("soccerScene");
    }

    preload() {
        // load assets
        this.load.path = "assets/";
        this.load.image('ball', 'ball.png');
        this.load.image('player', 'box.png');
    }

    create() {
        // set bg color to green
        this.cameras.main.setBackgroundColor("#33CC33");

        // add player
        this.p1 = this.physics.add.sprite(centerX, centerY + quarterFieldY, 'player');

        // add ball
        this.ball = this.physics.add.sprite(centerX, centerY, 'ball').setScale(0.5);
    }
}