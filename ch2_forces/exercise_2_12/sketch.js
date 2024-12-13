class Mover {
    constructor(x, y, m) {
        this.position = createVector(x, y);
        this.velocity = createVector();
        this.acceleration = createVector();
        this.mass = m;
        this.radius = m / 2;

        this.drawTimes = 0;
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
        if (this.drawTimes < 100) {
            stroke(0, this.drawTimes);
            this.drawTimes += 1;
        } else {
            stroke(0, 100);
        }
        point(this.position.x, this.position.y);
    }

}

class Attractor {
    constructor(x, y, m) {
        this.position = createVector(x, y);
        this.mass = m;
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
let attractors = [];

function setup() {
    createCanvas(640, 640);

    for (let i = 0; i < 10; i++) {
        m = new Mover(random(0, width), random(0, height), random(3, 30));
        //m.applyForce(createVector(random(3, 25), random(3, 25)));
        movers.push(m);
    }

    for (let i = 0; i < 4; i++) {
        let attractor = new Attractor(
            random(0, width),
            random(0, height),
            random(15, 100)
        );
        attractors.push(attractor);
    }

}

function draw() {
    // background(220);

    // for (let i = 0; i < attractors.length; i++) {
    //     attractors[i].show();
    // }

    for (let i = 0; i < movers.length; i++) {
        let m = movers[i];
        for (let j = 0; j < attractors.length; j++) {
            let force = attractors[j].attract(m);
            m.applyForce(force);
        }
        m.update();
        m.show();
    }
}
