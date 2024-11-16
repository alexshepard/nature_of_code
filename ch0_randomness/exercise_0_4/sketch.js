
let baseRed;
let baseGreen;
let baseBlue;

let sdSlider;

function setup() {
    createCanvas(640, 240);

    background(220);

    baseRed = random(255);
    baseGreen = random(255);
    baseBlue = random(255);

    sdSlider = createSlider(0, 100, 45, 1);
}

function draw() {
    let x = randomGaussian(320, 45);
    let y = randomGaussian(120, 45);

    noStroke();

    const r = randomGaussian(baseRed, sdSlider.value());
    const g = randomGaussian(baseGreen, sdSlider.value());
    const b = randomGaussian(baseBlue, sdSlider.value());

    fill(r, g, b, 45);
    circle(x, y, 16);
}
