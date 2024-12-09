class Lizard {
    constructor() {
        this.tx = random(0, 100);
        this.ty = random(1000, 100_000);

        this.position = createVector(random(width), random(height));
        this.velocity = createVector(0, 0);
        this.topSpeed = 10;

        this.moving = false;
    }

    update() {
        if (this.moving) {
            // would be cool if chance it stops increases when
            // it's in the sun
            // 0.1 chance it stops
            if (random() < 0.01) {
                this.moving = false;
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
            this.acceleration = createVector(x, y);

            this.velocity.add(this.acceleration);
            this.position.add(this.velocity);
            this.velocity.limit(this.topSpeed);

            this.tx += 0.1;
            this.ty += 0.1;
        }
    }

    show() {
        stroke(0);
        fill(0);
        circle(this.position.x, this.position.y, 3);
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
}

let lizards = [];
let numLizards = 3;

function setup() {
    createCanvas(640, 420);

    for (let i = 0; i < numLizards; i++) {
        lizards.push(new Lizard());
    }
}

function draw() {
    background(255);


    for (let i = 0; i < numLizards; i++) {
        lizards[i].update();
        lizards[i].checkEdges();
        lizards[i].show();
    }

}
