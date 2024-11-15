class DownRightWalker {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    show() {
        stroke(0);
        point(this.x, this.y);
    }

    step() {
        const xstep = random(-1, 1.1);
        const ystep = random(-1, 1.1);

        this.x += xstep;
        this.y += ystep;
    }
}

let walker;

function setup() {
    createCanvas(640, 240);

    walker = new DownRightWalker(width / 2, height / 2);

    background(224);
}

function draw() {
    walker.step();
    walker.show();
}
