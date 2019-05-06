// Rotation of Circle
// Created: 2017/09/05
// Updated: 2019/05/06

let innerRadius, outerRadius;
let innerRotation = 0;
let outerRotation = 0;
let outerPositions;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5canvas");
  let title = "Rotation of Circle";
  document.title = title + " - " + document.title;
  select("#p5title").html(title);
  select("body").style("background-color", color(255));

  innerRadius = width > height ? height * 0.25 : width * 0.25;
  outerRadius = width > height ? height * 0.4 : width * 0.4;

  outerPositions = new Array(36);
  for (let i = 0; i < 360; i += 10) {
    outerPositions[i] = new Array(2);
  }
}

function draw() {
  background(255);
  stroke(0);
  noFill();

  // Outer Circle
  //beginShape();
  for(let i = 0; i < 360; i += 10) {
    let angle = i - outerRotation;
    outerPositions[i][0] = width * 0.5 + outerRadius * sin(radians(angle));
    outerPositions[i][1] = height * 0.5 + outerRadius * cos(radians(angle));
    let x = outerPositions[i][0];
    let y = outerPositions[i][1];
    //vertex(x, y);
    ellipse(x, y, 5, 5);
  }
  //endShape(CLOSE);
  outerRotation += 0.2;

  // Inner Circle
  //beginShape();
  for(let i = 0; i < 360; i += 10) {
    let angle = i - innerRotation;
    let x = width * 0.5 + innerRadius * sin(radians(angle));
    let y = height * 0.5 + innerRadius * cos(radians(angle));
    //vertex(x, y);
    ellipse(x, y, 5, 5);
    line(x, y, outerPositions[i][0], outerPositions[i][1])
  }
  //endShape(CLOSE);
  innerRotation += 0.6;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  innerRadius = width > height ? height * 0.25 : width * 0.25;
  outerRadius = width > height ? height * 0.4 : width * 0.4;
}
