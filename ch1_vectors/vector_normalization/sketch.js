function setup() {
    createCanvas(640, 240);
}

function draw() {
    background(220);

    let mouse = createVector(mouseX, mouseY);
    let origin = createVector(width / 2, height / 2);
    mouse.sub(origin);

    translate(origin.x, origin.y);
    stroke(200);
    strokeWeight(1);
    line(0, 0, mouse.x, mouse.y);

    mouse.normalize();
    mouse.mult(50);
    stroke(0);
    strokeWeight(8);
    line(0, 0, mouse.x, mouse.y);
}
