let angle = 0;
let angleVelocity = 0;

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

    if (mouseIsPressed) {
        let angleAcceleration = map(mouseY, 0, height, 0.001, -0.001);
        angleVelocity += angleAcceleration;
    }

    // drag
    let c = 0.01;
    let friction = angleVelocity * -1 * c;
    angleVelocity += friction;


    angle += angleVelocity;
}
