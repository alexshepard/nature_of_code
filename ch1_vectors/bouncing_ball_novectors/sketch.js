let x = 100;
let y = 100;
let xspeed = 2.5;
let yspeed = 2;

const r = 24;

function setup() {
    createCanvas(640, 240);
}

function draw() {
    background(222, 10);

    x += xspeed;
    y += yspeed;

    if (x > width - r || x < r) {
        xspeed *= -1;
    }

    if (y > height - r || y < r) {
        yspeed *= -1;
    }

    stroke(0);
    fill(127);
    circle(x, y, r * 2);
}