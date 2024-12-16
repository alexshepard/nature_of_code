function setup() {
    createCanvas(320, 480);
}

function draw() {
    background(255);

    let period = 120;
    let y = map(
        sin(TWO_PI * frameCount / period),
        -1, 1,
        0, height * 0.5
    );

    stroke(0);
    fill(127);
    line(width / 2, 0, width / 2, y);
    circle(width / 2, y, 48);
}
