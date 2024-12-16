class Body {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);

        this.angle = 0;
    }

    applyForce(force) {
        let f = p5.Vector.div(force, this.mass);
        this.acceleration.add(f);
    }

    throttle() {
        let thrust = p5.Vector.fromAngle(this.angle);
        thrust.setMag(1);
        body.applyForce(thrust);
    }

    turnLeft() {
        this.angle -= 0.1;
    }

    turnRight() {
        this.angle += 0.1;
    }

    update() {
        let acceleration = p5.Vector.fromAngle(this.angle);
        this.velocity.add(this.acceleration);
        this.velocity.limit(3);
        this.position.add(this.velocity);

        this.acceleration.mult(0);

        this.checkEdges();
    }

    checkEdges() {
        if (this.position.x > width) {
            this.position.x = 0;
        } else if (this.position.x < 0) {
            this.position.x = width;
        }

        if (this.position.y > height) {
            this.position.y = 0;
        } else if (this.position.y < 0) {
            this.position.y = height;
        }
    }


    show() {
        stroke(0);
        fill(175);

        push();
        translate(this.position.x, this.position.y);
        rotate(this.angle);

        triangle(
            -10, -10,
            15, 0,
            -10, 10,
        );

        pop();
    }
}

let body;

function setup() {
    createCanvas(640, 240);

    body = new Body(
        width / 2,
        height / 2,
    );
}

function draw() {
    background(220, 10);

    if (keyIsDown(LEFT_ARROW)) {
        body.turnLeft();
    }
    if (keyIsDown(RIGHT_ARROW)) {
        body.turnRight();
    }
    if (keyIsDown(90)) {
        body.throttle();
    }

    body.update();
    body.show();
}
