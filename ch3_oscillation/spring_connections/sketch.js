class Bob {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.velocity = createVector();
        this.acceleration = createVector();

        this.mass = 24;
        this.damping = 0.98; // arbitrary

        this.dragOffset = createVector()
        this.dragging = false;
    }

    update() {
        this.velocity.add(this.acceleration);
        this.velocity.mult(this.damping);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    applyForce(force) {
        let f = force.copy();
        f.div(this.mass);
        this.acceleration.add(f);
    }

    show() {
        stroke(0);
        fill(127);
        circle(this.position.x, this.position.y, this.mass * 2);
    }

    handleClick(mx, my) {
        this.dragging = true;
        this.dragOffset.x = this.position.x - mx;
        this.dragOffset.y = this.position.y - my;
    }

    stopDragging() {
        this.dragging = false;
    }

    handleDrag(mx, my) {
        if (this.dragging) {
            this.position.x = mx + this.dragOffset.x;
            this.position.y = my + this.dragOffset.y;
        }
    }
}

let bob;

function setup() {
    createCanvas(400, 400);

    bob = new Bob(width / 2, 100);
}

function draw() {
    background(220);

    let gravity = createVector(0, 2);
    bob.applyForce(gravity);
    bob.update();
    bob.handleDrag(mouseX, mouseY);



    bob.show();
}

function mousePressed() {
    bob.handleClick(mouseX, mouseY);
}

function mouseReleased() {
    bob.stopDragging();
}
