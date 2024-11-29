let position;
let velocity;

function setup() {
    createCanvas(640, 480, WEBGL);

    position = createVector(10, 10, 10);
    velocity = createVector(2.5, 2, 3.5);
}

function draw() {
    background(220, 10);

    position.add(velocity);

    if (position.x > 100 || position.x < -100) {
        velocity.x *= -1;
    }

    if (position.y > 100 || position.y < -100) {
        velocity.y *= -1;
    }

    // not quite a box but it's more dramatic this way
    if (position.z > 300 || position.z < -300) {
        velocity.z *= -1;
    }


    stroke(0);
    fill(127);
    translate(position.x, position.y, position.z);
    sphere();
}
