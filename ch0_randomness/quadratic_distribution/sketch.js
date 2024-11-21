let randomCounts = [];
const total = 100;

function setup() {
    createCanvas(640, 640);

    for (let i = 0; i < total; i++) {
        randomCounts[i] = 0;
    }
}

function draw() {
    background(220);

    let index = floor(accept_reject() * total);
    randomCounts[index]++;

    stroke(0);
    fill(127);
    let w = width / randomCounts.length;

    for (let x = 0; x < randomCounts.length; x++) {
        rect(x * w, height - randomCounts[x], w - 1, randomCounts[x]);
    }
}

function accept_reject() {
    while (true) {
        let r1 = random();
        let probability = r1 * r1;
        let r2 = random();
        if (r2 < probability) {
            return r1;
        }
    }
}
