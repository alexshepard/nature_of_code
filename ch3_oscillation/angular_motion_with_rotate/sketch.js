let angle = 0;
let angleVelocity = 0;
let angleAcceleration = 0.0001;

function setup() {
    createCanvas(640, 240);
}

function draw() {
    background(220);

    translate(width / 2, height / 2);
    rotate(angle);

    stroke(0);
    fill(127);
    line(0, -50, 0, 50);
    circle(0, -50, 16);
    circle(0, 50, 16);

    angleVelocity += angleAcceleration;
    angle += angleVelocity;
}
