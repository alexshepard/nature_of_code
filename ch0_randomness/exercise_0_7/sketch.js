class Walker {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.tx = 0;
        this.ty = 10_000;
    }

    show() {
        fill(128);
        noStroke();
        circle(this.x, this.y, 3, 3);
    }

    step() {
        const xstep = map(noise(this.tx), 0, 1, -1, 1);
        const ystep = map(noise(this.ty), 0, 1, -1, 1);

        this.x += xstep;
        this.y += ystep;

        this.tx += 0.01;
        this.ty += 0.01;
    }
}

let walker;

function setup() {
    createCanvas(640, 240);

    walker = new Walker(width / 2, height / 2);

    background(224);
}

function draw() {
    background(220, 10);

    walker.step();
    walker.show();
}
