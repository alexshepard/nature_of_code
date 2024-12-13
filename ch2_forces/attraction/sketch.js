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
    }

    show() {
        stroke(0);
        fill(175);
        circle(this.position.x, this.position.y, this.mass * 2);
    }

}

class Attractor {
    constructor() {
        this.position = createVector(width / 2, height / 2);
        this.mass = 20;
    }

    show() {
        stroke(0);
        fill(255, 200);
        circle(
            this.position.x,
            this.position.y,
            this.mass * 2
        );
    }

    attract(m) {
        let force = p5.Vector.sub(this.position, m.position);
        let distance = force.mag();
        distance = constrain(distance, 5, 25);

        let strength = (this.mass * m.mass) / (distance * distance);
        force.setMag(strength);

        return force;
    }
}

let movers = [];
let attractor;

function setup() {
    createCanvas(640, 240);

    for (let i = 0; i < 10; i++) {
        m = new Mover(random(0, width), random(0, height), random(3, 30));
        m.applyForce(createVector(random(3, 25), random(3, 25)));
        movers.push(m);
    }

    attractor = new Attractor();
}

function draw() {
    background(220);

    attractor.show();

    for (let i = 0; i < movers.length; i++) {
        let m = movers[i];
        let force = attractor.attract(m);
        m.applyForce(force);
        m.update();
        m.show();
    }
}
