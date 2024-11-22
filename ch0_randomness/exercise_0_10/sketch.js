
// each frame we start at a different y location
// this lets us move through the landscape over time
let yStart = 0.0;
// the speed at which we move through the landscape
let ySpeed = 0.03;

// noise step size between adjacent vertices
let xStep = 0.1;
let yStep = 0.1;

// number of vertices in the plane
let xTiles = 50;
let yTiles = 50;

// how large each tile is
let geomScaling = 10;

// elevation range to map into
let minElevation = -50;
let maxElevation = 50;

function setup() {
    createCanvas(640, 240, WEBGL);
}

function draw() {
    background(220);

    let xoff = 0.0;

    // position ourselves so we can see our quad strips
    // in perspective
    translate(-200, -150, -500);
    rotateX(45);

    for (let x = 0; x < xTiles; x++) {
        beginShape(QUAD_STRIP);

        let yoff = yStart;

        for (let y = 0; y < yTiles; y++) {
            let elevation = map(noise(xoff, yoff), 0, 1, minElevation, maxElevation);

            vertex(x * geomScaling, y * geomScaling, elevation);

            elevation = map(noise(xoff + xStep, yoff), 0, 1, minElevation, maxElevation);
            vertex((x + 1) * geomScaling, y * geomScaling, elevation);

            yoff += yStep;
        }

        xoff += xStep;
        endShape();

    }

    yStart -= ySpeed;
}
