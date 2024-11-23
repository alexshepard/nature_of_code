class ThreeDWalker {
    constructor(x, y, z) {
        this.position = createVector(x, y, z);
    }

    show() {
        stroke(0);

        translate(this.position.x, this.position.y, this.position.z);
        box();
    }

    step(maxStepSize) {
        const step = createVector(
            random(-maxStepSize, maxStepSize),
            random(-maxStepSize, maxStepSize),
            random(-maxStepSize, maxStepSize)
        );

        this.position = p5.Vector.add(this.position, step);
    }
}

let walker;
let stepSlider;

function setup() {
    createCanvas(640, 240, WEBGL);

    walker = new ThreeDWalker(0, 0, 0);
    stepSlider = createSlider(0, 10, 1, 1);
}

function draw() {
    background(220);

    let maxStepSize = stepSlider.value();
    walker.step(maxStepSize);
    walker.show();
}
