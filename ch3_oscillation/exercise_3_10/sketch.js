let start_ty;

function setup() {
    createCanvas(640, 240);
    start_ty = random(100, 100_000);
}

function draw() {
    background(255);

    let ty = start_ty;

    stroke(0);
    fill(127, 127);

    for (let x = 0; x <= width; x += 8) {
        let y = map(
            noise(ty),
            0, 1,
            0, height
        );
        circle(x, y, 24);
        ty += 0.03;
    }

    start_ty += 0.01;
}