class Mover {
    constructor() {
        this.position = createVector(random(width), random(height));
        this.velocity = createVector(random(-2, 2), random(-2, 2));

        this.diameter = 48;
        this.radius = this.diameter / 2;
    }

    update() {
        this.position.add(this.velocity);
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

    mover = new Mover();
}

function draw() {
    background(220);

    mover.update();
    mover.checkEdges();
    mover.show();
}
