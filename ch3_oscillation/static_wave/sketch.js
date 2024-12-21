
function setup() {
    createCanvas(640, 240);
}

function draw() {
    background(255);

    let angle = 0;
    let deltaAngle = 0.2;
    let amplitude = 100;

    stroke(0);
    fill(127, 127);

    for (let x = 0; x <= width; x += 24) {
        let y = amplitude * sin(angle);
        circle(x, y + height / 2, 40);
        angle += deltaAngle;
    }
}