class Body {
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
        //circle(this.position.x, this.position.y, this.mass * 2);
        point(this.position.x, this.position.y);
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
let bodyA;
let bodyB;
let bodyC;

function setup() {
    createCanvas(640, 240);


    bodyA = new Body(320, 40, 10);
    bodyA.velocity = createVector(1, 0);
    bodyB = new Body(320, 200, 10);
    bodyB.velocity = createVector(-1, 0);
    bodyC = new Body(480, 120, 10);
    bodyC.velocity = createVector(0, 1);
    bodyD = new Body(160, 120, 10);
    bodyD.velocity = createVector(0, -1);

}

function draw() {
    // background(220, 10);

    bodyA.attract(bodyB);
    bodyA.attract(bodyC);
    bodyA.attract(bodyD);

    bodyB.attract(bodyA);
    bodyB.attract(bodyC);
    bodyB.attract(bodyD);

    bodyC.attract(bodyA);
    bodyC.attract(bodyB);
    bodyC.attract(bodyD);

    bodyD.attract(bodyA);
    bodyD.attract(bodyB);
    bodyD.attract(bodyC);

    bodyA.update();
    bodyA.show()
    bodyB.update();
    bodyB.show();
    bodyC.update();
    bodyC.show();
    bodyD.update();
    bodyD.show();
}
