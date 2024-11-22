let zoff = 0.0;

function setup() {
    createCanvas(640, 240);

    pixelDensity(1);
}

function draw() {
    drawPerlinNoisePixels();
}


function drawPerlinNoisePixels() {
    loadPixels();

    let xoff = 0.0;

    for (let x = 0; x < width; x++) {
        let yoff = 0.0;

        for (let y = 0; y < height; y++) {
            let index = (x + y * width) * 4;
            let brightness = map(noise(xoff, yoff, zoff), 0, 1, 0, 255);
            pixels[index] = brightness;
            pixels[index + 1] = brightness;
            pixels[index + 2] = brightness;
            pixels[index + 3] = 255;

            yoff += 0.01;
        }

        xoff += 0.01;
    }

    zoff += 0.003;

    updatePixels();
}
