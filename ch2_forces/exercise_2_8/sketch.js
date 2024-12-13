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
        fill(125);
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
        let dragMagnitude = this.c * speed * speed;
        let dragForce = mover.velocity.copy();
        dragForce.mult(-1);
        dragForce.setMag(dragMagnitude);

        // the drag force will never be larger than the
        // velocity
        dragForce.limit(mover.velocity.mag());
        return dragForce;
    }
}

let movers = [];
let liquid;
let gravity;

function setup() {
    createCanvas(640, 640);

    for (let i = 0; i < 10; i++) {
        m = new Mover(
            50 + 50 * i,
            random(0, height / 2),
            random(1, 5)
        );
        movers.push(m);
    }

    gravity = createVector(0, 0.1);

    liquid = new Liquid(
        0,
        height * (3 / 4),
        width,
        height / 4,
        0.5
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


