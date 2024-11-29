function setup() {
    createCanvas(640, 240);
}

function draw() {
    background(220);

    let mouse = createVector(mouseX, mouseY);
    let origin = createVector(width / 2, height / 2);

    stroke(200);
    strokeWeight(4);
    line(0, 0, mouse.x, mouse.y);
    line(0, 0, origin.x, origin.y);

    mouse.sub(origin);
    stroke(0);
    // use translate to get to the origin since we
    // subtracted
    translate(width / 2, height / 2);
    line(0, 0, mouse.x, mouse.y);
}
