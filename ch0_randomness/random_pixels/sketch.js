
let xoff = 0.0;
let yoff = 0.0;

function setup() {
    createCanvas(640, 240);

    pixelDensity(1);
}

function draw() {
    drawPerlinNoisePixels();
}

function drawRandomPixels() {
    loadPixels();

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let index = (x + y * width) * 4;
            let brightness = random(255);
            pixels[index] = brightness;
            pixels[index + 1] = brightness;
            pixels[index + 2] = brightness;
            pixels[index + 3] = brightness;
        }
    }

    updatePixels();
}

function drawPerlinNoisePixels() {
    loadPixels();

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let index = (x + y * width) * 4;
            let brightness = map(noise((x / 1_000) + xoff, (y / 10) + yoff), 0, 1, 0, 255);
            pixels[index] = brightness;
            pixels[index + 1] = brightness;
            pixels[index + 2] = brightness;
            pixels[index + 3] = 255;
        }
    }

    // xoff += 0.01;
    yoff += 0.1;

    updatePixels();
}
