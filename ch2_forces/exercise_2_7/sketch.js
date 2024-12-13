class Mover {
    constructor(x, y, m, c) {
        this.position = createVector(x, y);
        this.velocity = createVector();
        this.acceleration = createVector();
        this.mass = m;
        this.radius = (m * 16) / 2;
        this.c = c;
        this.fircting = false;
    }

    applyForce(force) {
        let f = p5.Vector.div(force, this.mass);
        this.acceleration.add(f);
    }

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);

        if (this.contactBottomEdge()) {
            this.applyFriction();
            this.fricting = true;
        } else {
            this.fricting = false;
        }

        this.checkEdges();
    }

    show() {
        if (this.fricting) {
            stroke(175);
            fill(0);
        } else {
            stroke(0);
            fill(175);

        }
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

    contactBottomEdge() {
        return (this.position.y > height - this.radius - 1)
    }

    applyFriction() {
        let friction = this.velocity.copy();
        friction.mult(-1);
        friction.setMag(this.c);
        this.applyForce(friction);
    }
}

let m;
let gravity;

let dragging;
let dragStart;

function setup() {
    createCanvas(640, 420);

    m = new Mover(
        width / 2,
        height / 2,
        random(1, 10),
        0.1
    );

    gravity = createVector(0, 0.1);

    dragging = false;
}

function draw() {
    background(220);

    // scale gravity by mover's mass
    let gravityForce = p5.Vector.mult(gravity, m.mass);
    m.applyForce(gravityForce);

    m.update();
    m.show();
}

function mousePressed() {
    dragStart = createVector(mouseX, mouseY);
}

function mouseReleased() {
    let dragEnd = createVector(mouseX, mouseY);
    let dragVector = p5.Vector.sub(dragEnd, dragStart);
    m.applyForce(dragVector);
}
