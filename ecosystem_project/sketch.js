
class Lizard {
    constructor(x, y, m) {
        this.tx = random(0, 100);
        this.ty = random(100, 10000);

        this.position = createVector(x, y);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.mass = m;
        this.topSpeed = 10;

        this.moving = false;
        this.scared = false;
    }

    moveSelf() {
        if (this.moving && !this.scared) {
            // would be cool if chance it stops increases when
            // it's in the sun
            // 0.1 chance it stops
            if (random() < 0.01) {
                this.moving = false;

                this.acceleration.mult(0.0);
                this.velocity.mult(0.0);
            }
        } else {
            // would be cool if chance it moves increases when
            // something is nearby
            // 0.1 chance it starts
            if (random() < 0.03) {
                this.moving = true;
            }
        }

        if (this.moving) {
            const x = map(noise(this.tx), 0, 1, -1, 1);
            const y = map(noise(this.ty), 0, 1, -1, 1);
            let a = createVector(x, y);

            this.applyForce(a);

            this.tx += 0.1;
            this.ty += 0.1;
        }
    }

    update() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.topSpeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
        this.checkEdges();
    }

    applyForce(force) {
        let f = p5.Vector.div(force, this.mass);
        this.acceleration.add(f);
    }

    show() {
        if (this.scared) {
            stroke(255, 0, 0);
            fill(255, 0, 0);

        } else {
            stroke(0, 255, 0);
            fill(0, 255, 0);
        }
        circle(this.position.x, this.position.y, 5);
    }

    checkEdges() {
        if (this.position.x > width) {
            this.position.x = 0;
        } else if (this.position.x < 0) {
            this.position.x = width;
        }

        if (this.position.y > height) {
            this.position.y = 0;
        } else if (this.position.y < 0) {
            this.position.y = height;
        }
    }


    repel(other) {
        let force = p5.Vector.sub(this.position, other.position);
        let distance = force.mag();
        distance = constrain(distance, 5, 25);

        let strength = (G * (this.mass * other.mass)) / (distance * distance);
        force.setMag(strength);
        force.mult(-1);

        other.applyForce(force);
    }

}

let lizards = [];
let numLizards = 5;
let SCARE_DISTANCE = 50;
let G = 1.0;

function setup() {
    createCanvas(640, 420);

    for (let i = 0; i < numLizards; i++) {
        let lizard = new Lizard(
            random(0, width),
            random(0, height),
            random(1, 3)
        );
        lizards.push(lizard);
    }
}

function draw() {
    background(220);

    for (let i = 0; i < numLizards; i++) {
        lizards[i].moveSelf();

        for (let j = 0; j < lizards.length; j++) {
            if (i !== j) {
                // repel other if they are close enough to scare each other
                let distance = p5.Vector.sub(lizards[i].position, lizards[j].position).mag();

                if (distance < SCARE_DISTANCE) {
                    lizards[j].scared = true;
                    lizards[j].moving = true;
                    lizards[i].repel(lizards[j]);
                }
            }
        }

        lizards[i].update();
        lizards[i].show();
        lizards[i].scared = false;
    }
}
