class ThreeDWalker {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    show() {
        stroke(0);
        translate(this.x, this.y, this.z);
        box();
    }

    step(maxStepSize) {
        const xstep = random(-maxStepSize, maxStepSize);
        const ystep = random(-maxStepSize, maxStepSize);
        const zstep = random(-maxStepSize, maxStepSize);

        this.x += xstep;
        this.y += ystep;
        this.z += zstep;
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
