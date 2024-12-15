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

        this.checkEdges();
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

let G = 1.0;
let NUM_BODIES = 10;
let bodies = [];


function setup() {
    createCanvas(640, 240);

}

function mousePressed() {
    let body = new Body(
        20, height - 20, 10
    )

    let force = createVector(
        cos(radians(-30)),
        sin(radians(-30)),
    )

    force.setMag(
        random(10, 30)
    );
    body.applyForce(force);
    bodies.push(body);
}

function draw() {
    background(220, 10);

    push();
    translate(20, height - 20);
    rotate(radians(-30));
    rect(0, -10, 30, 20);
    pop();

    let gravity = createVector(0, 0.1);

    for (let i = 0; i < bodies.length; i++) {
        let body = bodies[i];
        body.applyForce(gravity);
        body.update();
        body.show();
    }
}
