let r;
let theta;

function setup() {
    createCanvas(640, 320);

    r = 0;
    theta = 0;
}

function draw() {

    translate(width / 2, height / 2);

    // let x = ra * cos(theta);
    // let y = r * sin(theta);

    let position = p5.Vector.fromAngle(theta);
    position.mult(r);

    fill(0);
    stroke(0);

    circle(position.x, position.y, 24);

    theta += 0.02;
    r += 0.1;
}
