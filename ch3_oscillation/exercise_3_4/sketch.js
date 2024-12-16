class CarMover {
    constructor() {
        this.position = createVector(width / 2, height / 2);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.diameter = 48;
        this.radius = this.diameter / 2;
        this.topSpeed = 10;
    }

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.velocity.limit(this.topSpeed);
        this.acceleration.mult(0);

    }

    applyForce(f) {
        this.acceleration.add(f);
    }

    show() {
        let angle = this.velocity.heading();
        stroke(0);
        fill(175);

        push();
        translate(this.position.x, this.position.y);
        rotate(angle);
        rect(-15, -10, 30, 10);
        triangle(
            15, 0,
            30, -5,
            15, -10.
        );
        pop();
    }

}


let mover;

let rightAccel = false;
let leftAccel = false;

function setup() {
    createCanvas(640, 240);

    mover = new CarMover();
}

function draw() {
    background(220, 3);

    let angle = mover.velocity.heading();
    if (leftAccel || rightAccel) {
        if (leftAccel) { angle -= 0.1; }
        if (rightAccel) { angle += 0.1; }

        let force = createVector(
            cos(angle),
            sin(angle)
        )
        force.setMag(1);

        mover.velocity = force;
    }



    mover.update();
    mover.show();

    leftAccel = false;
    rightAccel = false;
}

function keyPressed() {
    if (key === "ArrowLeft") {
        leftAccel = true;
    } else if (key === "ArrowRight") {
        rightAccel = true;
    }
}