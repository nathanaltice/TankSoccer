class Soccer extends Phaser.Scene {
    constructor() {
        super("soccerScene");
    }

    preload() {
        // load assets
        this.load.path = "assets/";
        this.load.image('ball', 'ball.png');
        this.load.image('player01', 'box01.png');
        this.load.image('player02', 'box02.png');
        this.load.image('net', 'net.png');
    }

    create() {
        // physics constants
        this.playerVelocity = 275;
        this.playerDrag = 225;
        this.ballDrag = 10;

        // set bg color to green
        this.cameras.main.setBackgroundColor("#33CC33");

        // add first player with physics 
        this.p1 = this.physics.add.sprite(centerX, centerY + quarterFieldY, 'player01');
        this.p1.setCollideWorldBounds(true);
        this.p1.setDrag(this.playerDrag);

        // add second player with physics
        this.p2 = this.physics.add.sprite(centerX-32, centerY - quarterFieldY, 'player02');
        this.p2.tint = 0xFACADE;
        this.p2.setAngle(180);
        this.p2.setCollideWorldBounds(true);
        this.p2.setDrag(this.playerDrag);

        // add ball with physics ⚽️
        this.ball = this.physics.add.sprite(centerX, centerY, 'ball').setScale(0.5);
        this.ball.setCircle(this.ball.width / 2);   // set circle physics body
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(0.75);
        this.ball.setDrag(this.ballDrag);

        // add top net 🥅
        let topNet = this.add.image(centerX, 0, 'net').setOrigin(0.5, 0);
        // add compound physics bodies for top net
        let topNetBack = this.physics.add.image(centerX, 8);        // back of net
        topNetBack.setSize(128, 16);
        topNetBack.setDebugBodyColor(0x0000FF);
        topNetBack.setImmovable(true);
        let topNetLPost = this.physics.add.image(centerX - 72, 16); // top left post
        topNetLPost.setSize(16, 32);
        topNetLPost.setImmovable(true);
        let topNetRPost = this.physics.add.image(centerX + 72, 16); // top right post
        topNetRPost.setSize(16, 32);
        topNetRPost.setImmovable(true);

        // add bottom net 🥅
        let bottomNet = this.add.image(centerX, game.config.height, 'net').setOrigin(0.5, 1);
        bottomNet.setFlipY(true);
        // add compound physics bodies for bottom net
        let bottomNetBack = this.physics.add.image(centerX, game.config.height-8);  // back of net
        bottomNetBack.setSize(128, 16);
        bottomNetBack.setDebugBodyColor(0x0000FF);
        bottomNetBack.setImmovable(true);
        let bottomNetLPost = this.physics.add.image(centerX-72, game.config.height-16); // bottom left post
        bottomNetLPost.setSize(16, 32);
        bottomNetLPost.setImmovable(true);
        let bottomNetRPost = this.physics.add.image(centerX+72, game.config.height-16); // bottom right post
        bottomNetRPost.setSize(16, 32);
        bottomNetRPost.setImmovable(true);

        // add physics collider(s)
        this.physics.add.collider(this.p1, this.p2);
        this.physics.add.collider(this.p1, [topNetBack, topNetLPost, topNetRPost, bottomNetBack, bottomNetLPost, bottomNetRPost]);
        this.physics.add.collider(this.ball, [this.p1, this.p2, topNetLPost, topNetRPost, bottomNetLPost, bottomNetRPost]);
        this.physics.add.collider(this.ball, [topNetBack, bottomNetBack], this.reset, null, this);

        // setup keyboard input ⌨️
        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        // first player input
        if(cursors.up.isDown) {
            this.p1.setVelocityY(-this.playerVelocity);
            this.p1.setVelocityX(0);
            this.p1.setAngle(0);
        } else if(cursors.down.isDown) {
            this.p1.setVelocityY(this.playerVelocity);
            this.p1.setVelocityX(0);
            this.p1.setAngle(180);
        } else if(cursors.left.isDown) {
            this.p1.setVelocityX(-this.playerVelocity);
            this.p1.setVelocityY(0);
            this.p1.setAngle(270);
        } else if(cursors.right.isDown) {
            this.p1.setVelocityX(this.playerVelocity);
            this.p1.setVelocityY(0);
            this.p1.setAngle(90);
        }
    }

    reset() {
        this.ball.setPosition(centerX, centerY);
        this.ball.setVelocity(0);
    }
}