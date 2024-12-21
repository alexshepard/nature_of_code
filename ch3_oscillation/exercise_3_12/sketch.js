class Wave {
    constructor(amplitude, deltaAngle, startAngle) {
        this.amplitude = amplitude;
        this.deltaAngle = deltaAngle;
        this.startAngle = startAngle;
        this.startAngle = 0;
    }
}

let w1, w2;

function setup() {
    createCanvas(640, 240);

    w1 = new Wave(50, 0.11, 30);
    w2 = new Wave(60, 0.03, 30);
}

function draw() {
    background(224);

    stroke(0);
    fill(127, 127);

    let a1 = w1.startAngle;
    let a2 = w2.startAngle;

    beginShape(LINES);
    let prevX, prevY;
    for (let x = 0; x <= width; x += 1) {
        let y1 = w1.amplitude * sin(a1);
        let y2 = w2.amplitude * sin(a2);

        a1 += w1.deltaAngle;
        a2 += w2.deltaAngle;

        vertex(prevX, prevY);
        vertex(x, (y1 + y2) + height / 2);

        prevX = x;
        prevY = (y1 + y2) + height / 2;
    }
    endShape();

    w1.startAngle += 0.01;
    w2.startAngle += 0.01;
}