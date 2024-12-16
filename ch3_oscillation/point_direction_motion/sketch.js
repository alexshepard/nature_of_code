class Mover {
    constructor() {
        this.position = createVector(random(width), random(height));
        this.velocity = createVector(0, 0);
        this.diameter = 48;
        this.radius = this.diameter / 2;
        this.topSpeed = 10;
    }

    update() {
        let mouse = createVector(mouseX, mouseY);
        let direction = p5.Vector.sub(mouse, this.position);
        direction.normalize();
        // direction.mult(0.5);

        this.acceleration = direction;
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.velocity.limit(this.topSpeed);
    }

    show() {
        // let angle = atan2(this.velocity.y, this.velocity.x);
        let angle = this.velocity.heading();
        stroke(0);
        fill(175);

        push();
        rectMode(CENTER);
        translate(this.position.x, this.position.y);
        rotate(angle);
        rect(0, 0, 30, 10);
        pop();
    }

}


let mover;

function setup() {
    createCanvas(640, 240);

    mover = new Mover();
}

function draw() {
    background(220, 3);

    mover.update();
    mover.show();
}
