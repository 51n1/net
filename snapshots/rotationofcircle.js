var radius;
var rotation;

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5canvas");
  select("#p5title").html("Rotation of Circle");
  select("body").style("background-color", color(255));
  radius = width > height ? height*0.4 : width*0.4;
  rotation = 0;
}

function draw() {
  background(255);
  beginShape();
  for(var i = 0; i < 360; i += 10) {
    var angle = i - rotation;
    var x = width*0.5 + radius * sin(radians(angle));
    var y = height*0.5 + radius * cos(radians(angle));

    stroke(0);
    noFill();
    vertex(x, y);

    ellipse(x, y, 5, 5);
  }
  endShape(CLOSE);
  rotation += 0.5;
}
