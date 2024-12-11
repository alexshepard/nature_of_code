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
        const xEdgeDist = width - this.position.x;

        if (xEdgeDist < 100) {
            let xForce = map(xEdgeDist, 0, 100, -1, 0);
            this.applyForce(createVector(xForce, 0));
        } else if (xEdgeDist > width - 100) {
            let xForce = map(xEdgeDist, width, width - 100, 1, 0);
            this.applyForce(createVector(xForce, 0));
        }

        const squishForce = 0.9;
        const bounceForce = 1.0 - squishForce;

        if (this.position.y > height - this.radius) {
            this.position.y = height - this.radius;
            this.velocity.y *= -bounceForce;
        } else if (this.position.y < this.radius) {
            this.position.y = this.radius;
            this.velocity.y *= -bounceForce;
        }
    }
}

let m;
let gravity;

function setup() {
    createCanvas(640, 420);

    m = new Mover(width / 2, height / 2, 10);

    gravity = createVector(0, 0.1);
}

function draw() {
    background(220);

    m.applyForce(gravity);

    if (mouseIsPressed) {
        let wind = createVector(0.1, 0);
        m.applyForce(wind);
    }

    m.update();
    m.show();
}
