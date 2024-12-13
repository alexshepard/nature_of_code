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
        rect(this.position.x, this.position.y, this.size.x, this.size.y);
    }

    checkEdges() {
        if (this.position.y > height - this.size.y) {
            this.position.y = height - this.size.y;
            this.velocity.y *= -1;
        }
    }
}

class Liquid {
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
        let dragMagnitude = this.c * speed * speed * mover.size.x;

        let dragForce = mover.velocity.copy();
        dragForce.mult(-1);
        dragForce.setMag(dragMagnitude);

        dragForce.limit(mover.velocity.mag());
        return dragForce;
    }
}

let movers = [];
let liquid;
let gravity;

function setup() {
    createCanvas(640, 420);

    for (let i = 0; i < 10; i++) {
        m = new RectMover(
            50 + 50 * i,
            random(0, height / 2),
            random(10, 100),
            random(10, 50),
            3
        );
        movers.push(m);
    }

    gravity = createVector(0, 0.1);

    liquid = new Liquid(
        0,
        height / 2,
        width,
        height / 2,
        0.1
    )
}

function draw() {
    background(220);

    liquid.show();

    for (let i = 0; i < movers.length; i++) {
        let m = movers[i];
        let gravityForce = p5.Vector.mult(gravity, m.mass);
        m.applyForce(gravityForce);

        if (liquid.contains(m)) {
            let dragForce = liquid.calculateDrag(m);

            m.applyForce(dragForce);
        }

        m.update();
        m.show();

    }

}


