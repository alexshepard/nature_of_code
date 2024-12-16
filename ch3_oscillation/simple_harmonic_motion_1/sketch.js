function setup() {
    createCanvas(640, 320);
}

function draw() {
    background(255, 10);

    let period = 120;
    let amplitude = 200;
    let x = amplitude * sin(
        TWO_PI * frameCount / period
    );
    stroke(0);
    fill(127);
    translate(width / 2, height / 2);
    line(0, 0, x, 0);
    circle(x, 0, 48);
}
