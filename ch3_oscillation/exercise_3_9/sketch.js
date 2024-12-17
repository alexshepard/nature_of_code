class Oscillator {
    constructor(c) {
        this.tx = random(0, 100);
        this.ty = random(100, 1000);
        this.angle = createVector();
        this.angleVelocity = createVector(
            random(-0.05, 0.05),
            random(-0.05, 0.05),
        );
        this.amplitude = createVector(
            random(20, width / 2),
            random(20, height / 2),
        );
        this.color = c;

        this.rotation = createVector();

        this.prevX = 0;
        this.prevY = 0;

        this.rotationRate = random(-0.05, 0.05);
    }

    update() {
        let acceleration = createVector(
            map(noise(this.tx), 0, 1, -0.01, 0.01),
            map(noise(this.ty), 0, 1, -0.01, 0.01),
        )
        this.angleVelocity.add(acceleration);
        this.angle.add(this.angleVelocity);

        this.tx += 0.1;
        this.ty += 0.1;

        this.angleVelocity.mult(0.8);
    }

    show() {
        let x = this.amplitude.x * sin(this.angle.x);
        let y = this.amplitude.y * sin(this.angle.y);

        push();
        stroke(this.color);
        fill(this.color);
        translate(width / 2, height / 2);
        rotate(frameCount * this.rotationRate);

        // lines won't connect due to rotation, but still looks
        // cool
        line(x, y, this.prevX, this.prevY);
        pop();
        this.prevX = x;
        this.prevY = y;
    }
}

let oscillators = [];
let colors = [];
let NUM_OSCILLATORS = 35;

function setup() {
    createCanvas(640, 240);
    for (let i = 0; i < NUM_OSCILLATORS; i++) {
        let c = color(random(0, 20), random(20, 50), random(50, 100), 100);
        let o = new Oscillator(c);
        oscillators.push(o);
    }
}

function draw() {
    background(255, 10);


    for (let i = 0; i < oscillators.length; i++) {
        oscillators[i].update();
        oscillators[i].show();
    }
}
