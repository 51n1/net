// Rotation of Circle
// Created: 2017/09/05
// Updated: 2019/05/08

let innerRadius, innerRadiusMax, innerRadiusMin;
let innerAccel = 1;
let outerRadius;
let innerRotation = 0;
let outerRotation = 0;
let outerPositions;
let rotatingDirectionFlag = true;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5canvas");
  let title = "Rotation of Circle";
  document.title = title + " - " + document.title;
  select("#p5title").html(title);
  select("body").style("background-color", color(255));

  innerRadiusMax = width > height ? height * 0.45 : width * 0.45;
  innerRadiusMin = width > height ? height * 0.05 : width * 0.05;
  innerRadius = innerRadiusMin;
  outerRadius = width > height ? height * 0.45 : width * 0.45;

  outerPositions = new Array(72);
  for (let i = 0; i < 360; i += 5) {
    outerPositions[i] = new Array(2);
  }
}

function draw() {
  background(255);
  stroke(200);
  noFill();
  // Outer Circle
  beginShape();
  for(let i = 0; i < 360; i += 5) {
    let angle = i - outerRotation;
    outerPositions[i][0] = width * 0.5 + outerRadius * sin(radians(angle));
    outerPositions[i][1] = height * 0.5 + outerRadius * cos(radians(angle));
    let x = outerPositions[i][0];
    let y = outerPositions[i][1];
    curveVertex(x, y);
    ellipse(x, y, 5, 5);
  }
  endShape(CLOSE);
  outerRotation += rotatingDirectionFlag ? 0.3 : -0.3;

  // Inner Circle
  beginShape();
  for(let i = 0; i < 360; i += 5) {
    let angle = i - innerRotation;
    let x = width * 0.5 + innerRadius * sin(radians(angle));
    let y = height * 0.5 + innerRadius * cos(radians(angle));
    curveVertex(x, y);
    ellipse(x, y, 5, 5);
    push();
    stroke(100);
    line(x, y, outerPositions[i][0], outerPositions[i][1]);
    pop();
  }
  endShape(CLOSE);
  innerRotation += rotatingDirectionFlag ? -0.6 : 0.6;
  if (innerRadius > innerRadiusMax || innerRadius < innerRadiusMin) innerAccel *= -1;
  innerRadius += innerAccel;
}

function mousePressed() {
  rotatingDirectionFlag = !rotatingDirectionFlag;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  innerRadiusMax = width > height ? height * 0.45 : width * 0.45;
  innerRadiusMin = width > height ? height * 0.05 : width * 0.05;
  innerRadius = innerRadiusMin;
  outerRadius = width > height ? height * 0.45 : width * 0.45;
}
