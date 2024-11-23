class PerlinWalker {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.t = createVector(0, 10_000);
        this.t_step = createVector(0.01, 0.01);
    }

    show() {
        stroke(0);
        point(this.position.x, this.position.y);
    }

    step() {
        this.position.x = map(noise(this.t.x), 0, 1, 0, width);
        this.position.y = map(noise(this.t.y), 0, 1, 0, height);

        this.t = p5.Vector.add(this.t, this.t_step);
    }
}

let walker;

function setup() {
    createCanvas(640, 240);

    walker = new PerlinWalker(width / 2, height / 2);

    background(224);
}

function draw() {
    //background(220);

    walker.step();
    walker.show();
}
