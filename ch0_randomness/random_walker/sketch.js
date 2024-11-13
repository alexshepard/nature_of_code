class Walker {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    show() {
        stroke(0);
        point(this.x, this.y);
    }
}

let walker;

function setup() {
    createCanvas(400, 400);

    walker = new Walker(width / 2, height / 2);
}

function draw() {
    background(220);
    walker.show();
}
