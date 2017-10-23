let radius;
let rotation;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5canvas");
  let p5title = "Rotation of Circle";
  document.title = p5title + " - " + document.title;
  select("#p5title").html(p5title);
  select("body").style("background-color", color(255));

  radius = width > height ? height*0.4 : width*0.4;
  rotation = 0;
}

function draw() {
  background(255);
  beginShape();
  for(let i = 0; i < 360; i += 10) {
    let angle = i - rotation;
    let x = width*0.5 + radius * sin(radians(angle));
    let y = height*0.5 + radius * cos(radians(angle));

    stroke(0);
    noFill();
    vertex(x, y);

    ellipse(x, y, 5, 5);
  }
  endShape(CLOSE);
  rotation += 0.5;
}
