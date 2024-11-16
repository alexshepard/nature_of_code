class Walker {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    show() {
        stroke(0);
        point(this.x, this.y);
    }

    randomStep() {
        const xstep = random(-1, 1);
        const ystep = random(-1, 1);

        this.x += xstep;
        this.y += ystep;
    }

    stepTowardMouse() {
        const xstep = random(0, 1);
        const ystep = random(0, 1);

        const dx = this.x - mouseX;
        const dy = this.y - mouseY;


        if (dx < 0) {
            this.x += xstep;
        } else {
            this.x -= xstep;
        }

        if (dy < 0) {
            this.y += ystep;
        } else {
            this.y -= ystep;
        }
    }

    step() {
        if (random(1) < 0.5) {
            this.randomStep();
        } else {
            this.stepTowardMouse();
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
