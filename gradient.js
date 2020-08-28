var c1, c2;

function setup() {
    createCanvas(600, 600);
    // Define colors
//     c1 = color(255, 0, 0);
//     c2 = color(0);
//     setGradient(c1, c2);
}

function draw() {
    colorMode(RGB);
    stroke(255);
    background(51);
    let from = color(255, 0, 0);
    let to = color(0);
    // let from = color(255, 0, 0);
    // let to = color(0);
    colorMode(RGB); // Try changing to HSB.
    let interA = lerpColor(from, to, 0.18);
    let interC = lerpColor(from, to, 0.36);
    let interE = lerpColor(from, to, 0.54);
    let interG = lerpColor(from, to, 0.72);
    fill(from);
    rect(10, 20, 40, 550);
    fill(interA);
    rect(30, 20, 40, 550);
    fill(interC);
    rect(50, 20, 40, 550);
    fill(interE);
    rect(70, 20, 40, 550);
    fill(interG);
    rect(90, 20, 40, 550);
    fill(to);
    rect(110, 20, 20, 550);
}

// function setGradient(c1, c2) {
//     // noprotect
//     noFill();
//     for (var x = 0; x < width; x++) {
//         var inter = map(x, 0, width, 0, 1);
//         var c = lerpColor(c1, c2, inter);
//         stroke(c);
//         line(x, 0, 0, height);
//     }
// }