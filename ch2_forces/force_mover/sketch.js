class Mover {
    constructor(x, y, m) {
        this.position = createVector(x, y);
        this.velocity = createVector();
        this.acceleration = createVector();
        this.mass = m;
        this.radius = m / 2;
    }

    applyForce(force) {
        let f = p5.Vector.div(force, this.mass);
        this.acceleration.add(f);
    }

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
        this.checkEdges();
    }

    show() {
        stroke(0);
        fill(175);
        circle(this.position.x, this.position.y, this.mass * 16);
    }

    checkEdges() {
        const squishForce = 0.9;
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

let m, m2;
let gravity;

function setup() {
    createCanvas(640, 420);

    m = new Mover(100, 30, 10);
    m2 = new Mover(400, 30, 2);

    gravity = createVector(0, 0.1);
}

function draw() {
    background(220);

    m.applyForce(gravity);
    m2.applyForce(gravity);

    if (mouseIsPressed) {
        let wind = createVector(0.1, 0);
        m.applyForce(wind);
        m2.applyForce(wind);
    }

    m.update();
    m2.update();
    m.show();
    m2.show();
}
