let r;
let theta;

function setup() {
    createCanvas(640, 320);

    r = height * 0.45;
    theta = 0;
}

function draw() {
    background(220, 10);

    translate(width / 2, height / 2);

    // let x = r * cos(theta);
    // let y = r * sin(theta);

    let position = p5.Vector.fromAngle(theta);
    position.mult(r);

    fill(127);
    stroke(0);

    line(0, 0, position.x, position.y);
    circle(position.x, position.y, 48);

    theta += 0.02;
}
