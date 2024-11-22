class Walker {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    show() {
        stroke(0);
        point(this.x, this.y);
    }

    step() {
        let step = 10 * this.accept_reject();
        let stepx = random(-step, step);
        let stepy = random(-step, step);

        this.x += stepx;
        this.y += stepy;
    }

    accept_reject() {
        while (true) {
            let r1 = random();
            let probability = r1 * r1;
            let r2 = random();
            if (r2 < probability) {
                return r1;
            }
        }
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
