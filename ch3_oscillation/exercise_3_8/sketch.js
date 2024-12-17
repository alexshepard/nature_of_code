class Oscillator {
    constructor(origin, av, amp) {
        this.origin = origin;
        this.angle = createVector();
        this.angleVelocity = av;
        this.amplitude = amp;
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
        translate(width / 2 - this.origin.x, height / 2 - this.origin.y);
        line(0, 0, x, y);
        circle(x, y, 5);

        point(x, y);
        pop();
    }
}

let oscillators = [];
let colors = [];
let NUM_LEG_PAIRS = 4;

function setup() {
    createCanvas(640, 240);

    for (let i = 0; i < NUM_LEG_PAIRS; i++) {
        let av;
        let amp;

        if (i % 2 == 0) {
            av = createVector(
                0.003,
                0.03
            );
            amp = createVector(50, 5);
        } else {
            av = createVector(
                -0.003,
                0.03,
            );
            amp = createVector(50, 5);
        }



        let left_o = new Oscillator(
            createVector(0, i * 20),
            av,
            amp
        );
        let right_o = new Oscillator(
            createVector(0, i * 20),
            p5.Vector.mult(av, -1),
            amp
        );

        oscillators.push(left_o, right_o);
    }
}

function draw() {
    background(255, 40);


    for (let i = 0; i < oscillators.length; i++) {
        oscillators[i].update();
        oscillators[i].show();
    }
}
