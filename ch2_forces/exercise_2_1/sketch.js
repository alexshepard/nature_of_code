class Balloon {
    constructor() {
        this.position = createVector(width / 2, height / 2);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.radius = 12;
    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
        this.checkEdges();
    }

    show() {
        stroke(0);
        fill(120);
        circle(this.position.x, this.position.y, this.radius * 2);
    }

    checkEdges() {
        const squishForce = 0.1;
        const bounceForce = 1.0 - squishForce;

        if (this.position.x > width - this.radius) {
            this.position.x = width - this.radius;
            this.velocity.x *= -bounceForce;
        } else if (this.position.x < this.radius) {
            this.position.x = this.radius;
            this.velocity.x *= -bounceForce;
        }

        if (this.position.y > height - this.radius) {
            this.position.y = height - this.radius;
            this.velocity.y *= -bounceForce;
        } else if (this.position.y < this.radius) {
            this.position.y = this.radius;
            this.velocity.y *= -bounceForce;
        }
    }
}

let b;
let heliumForce;
let windForce;

let xoff, yoff;

function setup() {
    createCanvas(640, 240);
    b = new Balloon();
    heliumForce = createVector(0, -0.01);
    windForce = createVector(0, 0);
    xoff = 1.0;
    yoff = 100;
}

function draw() {
    background(220);

    windForce = createVector(
        map(noise(xoff), 0, 1, -0.003, 0.003),
        map(noise(yoff), 0, 1, -0.003, 0.003),
    );

    b.applyForce(heliumForce);
    b.applyForce(windForce);

    b.update();
    b.show();

    xoff += 0.1;
    yoff += 0.1;
}
