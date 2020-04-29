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
        this.kickVelocity = 800;
        this.kickDrift = 400;

        // set bg color to green
        this.cameras.main.setBackgroundColor("#33CC33");

        // add first player with physics 
        this.p1 = this.physics.add.sprite(centerX, centerY + quarterFieldY, 'player01');
        this.p1.setCollideWorldBounds(true);
        this.p1.setDrag(this.playerDrag);
        this.p1.hasBall = false;

        // add second player with physics
        this.p2 = this.physics.add.sprite(centerX - quarterFieldX, centerY - quarterFieldY, 'player02');
        this.p2.tint = 0xFACADE;
        this.p2.setAngle(180);
        this.p2.setCollideWorldBounds(true);
        this.p2.setDrag(this.playerDrag);
        this.p2.hasBall = false;

        // add ball with physics ⚽️
        this.ball = this.physics.add.sprite(centerX, centerY, 'ball').setScale(0.5);
        this.ball.setCircle(this.ball.width / 2);   // set circle physics body
        // setCollideWorldBounds( [value] [, bounceX] [, bounceY])
        this.ball.setCollideWorldBounds(true, 0.75, 0.75);
        this.ball.setBounce(0.1);
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
        topNetLPost.setBounce(1);
        let topNetRPost = this.physics.add.image(centerX + 72, 16); // top right post
        topNetRPost.setSize(16, 32);
        topNetRPost.setImmovable(true);
        topNetRPost.setBounce(1);

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
        bottomNetLPost.setBounce(1);
        let bottomNetRPost = this.physics.add.image(centerX+72, game.config.height-16); // bottom right post
        bottomNetRPost.setSize(16, 32);
        bottomNetRPost.setImmovable(true);
        bottomNetRPost.setBounce(1);

        // add physics collider(s)
        // physics.add.collider(objectsA, objectsB, collideCallback, processCallback, callbackContext);
        this.physics.add.collider(this.p1, this.p2,);
        this.physics.add.collider(this.p1, [topNetBack, topNetLPost, topNetRPost, bottomNetBack, bottomNetLPost, bottomNetRPost]);
        // p1 <> ball
        this.physics.add.collider(this.p1, this.ball, ()=>{
            if(this.p1.body.touching.none == false) {
                this.p1.hasBall = true;
            }
        }, null, this);
        // p2 <> ball
        this.physics.add.collider(this.p2, this.ball, ()=>{
            if(this.p2.body.touching.none == false) {
                this.p2.hasBall = true;
            }
        }, null, this);
        this.physics.add.collider(this.ball, [topNetLPost, topNetRPost, bottomNetLPost, bottomNetRPost]);
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

        // keep track of player possession
        if(this.p1.body.touching.none == true) {
            this.p1.hasBall = false;
        }
        if(this.p2.body.touching.none == true) {
            this.p2.hasBall = false;
        }

        // spacebar to kick ball
        if(Phaser.Input.Keyboard.JustDown(cursors.space) && this.p1.hasBall) {
            if(this.ball.body.velocity.y > 0) {
                this.ball.setVelocity(Phaser.Math.Between(-this.kickDrift, this.kickDrift), this.kickVelocity);
            } else if(this.ball.body.velocity.y < 0) {
                this.ball.setVelocity(Phaser.Math.Between(-this.kickDrift, this.kickDrift), -this.kickVelocity);
            }
        }
    }

    // reset field positions
    reset() {
        this.ball.setPosition(centerX, centerY);
        this.ball.setVelocity(0);
    }
}