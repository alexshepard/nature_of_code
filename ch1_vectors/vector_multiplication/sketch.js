function setup() {
    createCanvas(640, 240);
}

function draw() {
    background(220);

    let mouse = createVector(mouseX, mouseY);
    let origin = createVector(width / 2, height / 2);
    mouse.sub(origin);

    translate(width / 2, height / 2);
    strokeWeight(2);
    stroke(200);
    line(0, 0, mouse.x, mouse.y);

    mouse.mult(0.5);
    stroke(0);
    strokeWeight(4);
    line(0, 0, mouse.x, mouse.y);
}
