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
        const choice = floor(random(4));

        if (choice === 0) {
            this.x++;
        } else if (choice === 1) {
            this.x--;
        } else if (choice === 2) {
            this.y++;
        } else {
            this.y--;
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
