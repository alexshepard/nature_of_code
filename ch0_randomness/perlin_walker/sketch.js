class Walker {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.tx = 0;
        this.ty = 10_000;
    }

    show() {
        stroke(0);
        point(this.x, this.y);
    }

    step() {
        this.x = map(noise(this.tx), 0, 1, 0, width);
        this.y = map(noise(this.ty), 0, 1, 0, height);

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
    //background(220);

    walker.step();
    walker.show();
}
