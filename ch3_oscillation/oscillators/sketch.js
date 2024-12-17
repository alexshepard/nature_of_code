class Oscillator {
    constructor() {
        this.angle = createVector();
        this.angleVelocity = createVector(
            random(-0.05, 0.05),
            random(-0.05, 0.05),
        );
        this.amplitude = createVector(
            random(20, width / 2),
            random(20, height / 2),
        );
    }

    update() {
        this.angle.add(this.angleVelocity);
    }

    show() {
        let x = this.amplitude.x * sin(this.angle.x);
        let y = this.amplitude.y * sin(this.angle.y);

        push();
        stroke(0);
        fill(127);
        translate(width / 2, height / 2);
        // line(0, 0, x, y);
        // circle(x, y, 16);

        point(x, y);
        pop();
    }
}

let oscillators = [];
let NUM_OSCILLATORS = 30;

function setup() {
    createCanvas(640, 240);
    for (let i = 0; i < NUM_OSCILLATORS; i++) {
        let o = new Oscillator();
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
