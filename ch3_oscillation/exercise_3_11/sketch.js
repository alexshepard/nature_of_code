class Wave {
    constructor(x, y, width, amplitude, deltaAngle, startAngle) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.amplitude = amplitude;
        this.deltaAngle = deltaAngle;
        this.startAngle = startAngle;

        this.diameter = 20;
        this.spacing = 16;
    }

    display() {
        let angle = this.startAngle;

        stroke(0);
        fill(127, 127);

        push();
        translate(this.x, this.y);
        beginShape(TRIANGLE_FAN);
        for (let x = 0; x <= this.width; x += this.spacing) {
            let y = this.amplitude * sin(angle);
            angle += this.deltaAngle;
            vertex(x, y);
        }
        endShape();
        pop();

        this.startAngle += 0.01;
    }
}

let w1, w2;

function setup() {
    createCanvas(640, 240);

    w1 = new Wave(
        50, 120, 100, 100, 0.1, 30
    );

    w2 = new Wave(
        240, 100, 300, 60, 0.6, 90
    );
}

function draw() {
    background(224);

    w1.display();
    w2.display();
}