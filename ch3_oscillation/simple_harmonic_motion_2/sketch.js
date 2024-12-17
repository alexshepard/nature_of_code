let angle = 0.0;
let angleVelocity = 0.05;
let amplitude = 200;

function setup() {
    createCanvas(640, 320);
}

function draw() {
    background(255, 10);

    let x = amplitude * sin(angle);
    stroke(0);
    fill(127);
    translate(width / 2, height / 2);
    line(0, 0, x, 0);
    circle(x, 0, 48);

    angle += angleVelocity;
}
