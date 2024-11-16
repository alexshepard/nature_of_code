class GaussianWalker {
    constructor(x, y, sd) {
        this.x = x;
        this.y = y;
        this.sd = sd;

        this.prevX = x;
        this.prevY = y;
    }

    show() {
        stroke(0);
        line(this.x, this.y, this.prevX, this.prevY);
    }

    step() {
        this.prevX = this.x;
        this.prevY = this.y;

        const xstep = randomGaussian(0, this.sd);
        const ystep = randomGaussian(0, this.sd);

        this.x += xstep;
        this.y += ystep;
    }
}

let walker;
let sdSlider;

function setup() {
    createCanvas(640, 240);
    background(224);

    sdSlider = createSlider(0, 10, 1, 1);
    walker = new GaussianWalker(width / 2, height / 2, 1);
}

function draw() {
    walker.sd = sdSlider.value();
    walker.step();
    walker.show();
}
