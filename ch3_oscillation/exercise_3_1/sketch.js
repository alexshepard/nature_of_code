let angle = 0;

function setup() {
    createCanvas(640, 240);
}

function draw() {
    background(220);

    translate(width / 2, height / 2);
    rotate(angle);
    line(0, -50, 0, 50);
    circle(0, -50, 15);
    circle(0, 50, 15);

    angle += 0.1;
}
