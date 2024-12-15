class Body {
    constructor(x, y, m) {
        this.position = createVector(x, y);
        this.velocity = createVector();
        this.acceleration = createVector();
        this.mass = m;
        this.radius = m / 2;

        this.angle = 0;
        this.angleVelocity = 0;
    }

    applyForce(force) {
        let f = p5.Vector.div(force, this.mass);
        this.acceleration.add(f);
    }

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);

        let angleAcceleration = this.acceleration.x / 10.0;
        this.angleVelocity += angleAcceleration;
        this.angleVelocity = constrain(
            this.angleVelocity, -0.1, 0.1
        )

        this.angle += this.angleVelocity;

        this.acceleration.mult(0);
    }

    show() {
        stroke(0);
        fill(175);
        circle(this.position.x, this.position.y, this.mass * 2);

        push();
        translate(this.position.x, this.position.y);
        rotate(this.angle);
        line(0, 0, this.radius * 2, 0);

        pop();
    }

    attract(other) {
        let force = p5.Vector.sub(this.position, other.position);
        let distance = force.mag();
        distance = constrain(distance, 5, 25);

        let strength = (G * (this.mass * other.mass)) / (distance * distance);
        force.setMag(strength);

        other.applyForce(force);
    }

}

let G = 1.0;
let NUM_BODIES = 10;
let bodies = [];

let attractor;

function setup() {
    createCanvas(640, 240);

    for (let i = 0; i < NUM_BODIES; i++) {
        let body = new Body(
            random(0, width),
            random(0, height),
            10,
        );
        // set an initial velocity
        body.velocity = createVector(
            random(0, 3),
            random(0, 3),
        );
        bodies.push(body);
    }

    attractor = new Body(
        width / 2,
        height / 2,
        30
    )
}

function draw() {
    background(220, 10);

    for (let i = 0; i < bodies.length; i++) {
        let body = bodies[i];
        attractor.attract(body);
        for (let j = 0; j < bodies.length; j++) {
            if (i !== j) {
                let other = bodies[j];
                body.attract(other);
            }
        }
    }

    for (let i = 0; i < bodies.length; i++) {
        let body = bodies[i];
        body.update();
        body.show();
    }
}
