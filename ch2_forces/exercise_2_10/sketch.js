class RectMover {
    constructor(x, y, w, h, m) {
        this.position = createVector(x, y);
        this.size = createVector(w, h);
        this.velocity = createVector();
        this.acceleration = createVector();
        this.mass = m;
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
        fill(125);

        line(this.position.x, this.position.y, this.position.x + this.size.x, this.position.y + this.size.y);
    }

    checkEdges() {
        if (this.position.y > height - this.size.y) {
            this.position.y = height - this.size.y;
            this.velocity.y *= -1;
        }
    }
}

class Air {
    constructor(x, y, w, h, c) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
    }

    show() {
        noStroke();
        fill(175);
        rect(this.x, this.y, this.w, this.h);
    }

    contains(mover) {
        let pos = mover.position;

        return (
            pos.x > this.x &&
            pos.x < this.x + this.w &&
            pos.y > this.y &&
            pos.y < this.y + this.h
        )
    }

    calculateDrag(mover) {
        let speed = mover.velocity.mag();
        let dragMagnitude = this.c * speed * speed;

        let dragForce = mover.velocity.copy();
        dragForce.y = -1 * dragForce.x * 0.001;
        dragForce.x = 0;
        dragForce.setMag(dragMagnitude);

        return dragForce;
    }
}

let mover;
let air;
let gravity;

function setup() {
    createCanvas(640, 420);

    mover = new RectMover(
        width / 2,
        height / 2,
        200,
        20,
        3
    )
    mover.velocity = createVector(1, 0);

    gravity = createVector(0, 0.1);

    air = new Air(
        0,
        0,
        width,
        height,
        0.1
    )
}

function draw() {
    background(220);

    air.show();

    if (air.contains(mover)) {
        let dragForce = air.calculateDrag(mover);
        mover.applyForce(dragForce);
    }

    mover.update();
    mover.show();
}


