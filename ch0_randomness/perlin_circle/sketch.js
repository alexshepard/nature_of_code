let t = 0;

function setup() {
    createCanvas(640, 240);
}

function draw() {
    background(220);

    let n = noise(t);
    let x = map(n, 0, 1, 0, width);
    ellipse(x, height / 2, 16, 16);
    t += 0.01;
}
