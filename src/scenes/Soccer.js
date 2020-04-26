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
        // physics constants
        this.playerVelocity = 250;
        this.playerDrag = 200;

        // set bg color to green
        this.cameras.main.setBackgroundColor("#33CC33");

        // add player with physics
        this.p1 = this.physics.add.sprite(centerX, centerY + quarterFieldY, 'player');
        this.p1.setCollideWorldBounds(true);
        //this.p1.setMaxVelocity(this.playerMaxVelocity);
        this.p1.setDrag(this.playerDrag);

        // add ball with physics
        this.ball = this.physics.add.sprite(centerX, centerY, 'ball').setScale(0.5);
        this.ball.setCircle(this.ball.width / 2);
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(0.5);

        // add physics collider
        this.physics.add.collider(this.p1, this.ball);

        // setup keyboard input
        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        // player input
        if(cursors.up.isDown) {
            this.p1.setVelocityY(-this.playerVelocity);
            this.p1.setVelocityX(0);
        } else if(cursors.down.isDown) {
            this.p1.setVelocityY(this.playerVelocity);
            this.p1.setVelocityX(0);
        } else if(cursors.left.isDown) {
            this.p1.setVelocityX(-this.playerVelocity);
            this.p1.setVelocityY(0);
        } else if(cursors.right.isDown) {
            this.p1.setVelocityX(this.playerVelocity);
            this.p1.setVelocityY(0);
        }
    }
}