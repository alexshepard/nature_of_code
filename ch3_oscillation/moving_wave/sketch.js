let deltaAngleSlider;
let angleVelocitySlider;
let startAngle = 0.0;

function setup() {
    createCanvas(640, 240);

    deltaAngleSlider = createSlider(0.0, 1.0, 0.2, 0);
    deltaAngleSlider.position(10, 260);

    angleVelocitySlider = createSlider(0.0, 1.0, 0.2, 0);
    angleVelocitySlider.position(10, 280);

}

function draw() {
    background(255);

    let angle = startAngle;
    let deltaAngle = deltaAngleSlider.value();
    let amplitude = 100;

    stroke(0);
    fill(127, 127);

    for (let x = 0; x <= width; x += 8) {
        let y = amplitude * sin(angle);
        circle(x, y + height / 2, 24);
        angle += deltaAngle;
    }

    startAngle += angleVelocitySlider.value();
}