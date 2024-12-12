class Mover {
    constructor(x, y, m) {
        this.position = createVector(x, y);
        this.velocity = createVector();
        this.acceleration = createVector();
        this.mass = m;
        this.radius = (m * 16) / 2;
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
        circle(this.position.x, this.position.y, this.radius * 2);
    }

    checkEdges() {
        // how much of impact is absorbed by the object
        // when it hits a wall and changes direction
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

let m1, m2;
let gravity;

function setup() {
    createCanvas(640, 420);

    m1 = new Mover(width / 2, height / 2, random(1, 10));
    m2 = new Mover(random(50, width - 50), random(20, height - 20), random(1, 10));

    gravity = createVector(0, 0.1);
}

function draw() {
    background(220);

    // scale gravity by mover's mass
    let gravity1 = p5.Vector.mult(gravity, m1.mass);
    let gravity2 = p5.Vector.mult(gravity, m2.mass);

    m1.applyForce(gravity1);
    m2.applyForce(gravity2);

    if (mouseIsPressed) {
        let mouseVector = createVector(mouseX, mouseY);

        let windVector = p5.Vector.sub(mouseVector, m1.position);
        windVector.normalize();
        windVector.mult(-1);
        m1.applyForce(windVector);

        windVector = p5.Vector.sub(mouseVector, m2.position);
        windVector.normalize();
        windVector.mult(-1);
        m2.applyForce(windVector);
    }

    m1.update();
    m1.show();
    m2.update();
    m2.show();
}
