class PerlinMover {
    constructor() {
        this.tx = 100;
        this.ty = 100_000;

        this.position = createVector(random(width), random(height));
        this.velocity = createVector(0, 0);
        this.diameter = 48;
        this.radius = this.diameter / 2;
        this.topSpeed = 10;
    }

    update() {
        const x = map(noise(this.tx), 0, 1, -1, 1);
        const y = map(noise(this.ty), 0, 1, -1, 1);
        this.acceleration = createVector(x, y);

        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.velocity.limit(this.topSpeed);

        this.tx += 0.1;
        this.ty += 0.1;
    }

    show() {
        stroke(0);
        fill(175);
        circle(this.position.x, this.position.y, this.diameter);
    }

    checkEdges() {
        if (this.position.x > width + this.radius) {
            this.position.x = -this.radius;
        } else if (this.position.x < -this.radius) {
            this.position.x = width + this.radius;
        }

        if (this.position.y > height + this.radius) {
            this.position.y = -this.radius;
        } else if (this.position.y < -this.radius) {
            this.position.y = height + this.radius;
        }
    }
}


let mover;

function setup() {
    createCanvas(640, 240);

    mover = new PerlinMover();
}

function draw() {
    background(220, 3);

    mover.update();
    mover.checkEdges();
    mover.show();
}
