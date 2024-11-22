let xslider, yslider;
let lodSlider, falloffSlider;

function setup() {
    createCanvas(640, 240);

    pixelDensity(1);

    xslider = createSlider(0.0, 1.0, 0.01, 0.001);
    yslider = createSlider(0.0, 1.0, 0.01, 0.001);
    lodSlider = createSlider(1, 10, 3, 1);
    falloffSlider = createSlider(0, 1, 0.25, 0.1);
}

function draw() {
    drawPerlinNoisePixels();
}

function drawPerlinNoisePixels() {
    noiseDetail(lodSlider.value(), falloffSlider.value());

    loadPixels();

    let blue_xoff = 0.0;
    let red_xoff = 300.0;
    let green_xoff = 900.0;

    for (let x = 0; x < width; x++) {
        let yoff = 0.0;

        for (let y = 0; y < height; y++) {
            let index = (x + y * width) * 4;
            let blue = map(noise(blue_xoff, yoff), 0, 1, 0, 255);
            let red = map(noise(red_xoff, yoff), 0, 1, 0, 255);
            let green = map(noise(green_xoff, yoff), 0, 1, 0, 255);

            pixels[index] = red;
            pixels[index + 1] = green;
            pixels[index + 2] = blue;
            pixels[index + 3] = 255;
            yoff += yslider.value();

        }
        blue_xoff += xslider.value();
        red_xoff += xslider.value();
        green_xoff += xslider.value();
    }


    updatePixels();
}
