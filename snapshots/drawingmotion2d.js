var position; // float[][]
var pointer; // int
var amount; // float
var on; // boolean

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5canvas");
  var p5title = "Drawing + Motion + 2D";
  document.title = p5title + " - " + document.title;
  select("#p5title").html(p5title);
  select("body").style("background-color", color(230));
  select("#p5help").html("Click and move on screen, then if release, drawn lines will be moving.");
  
  position = new Array(200);
  for (var i = 0; i < 200; i++) {
    position[i] = new Array(2);
  }
  pointer = 0;
  amount = 0.5;
  on = false;
  
  fill(230);
  background(230);
}

function draw() {
  if((on == false) && (pointer > 0)) { // After Memory
    //fill(230);
    noStroke();
    rect(0, 0, width, height);
    stroke(0);
    for(var i = 0; i < pointer - 1; i++) {
      position[i][0] += random(-amount, amount);
      line(position[i][0], position[i][1], position[i+1][0], position[i+1][1]);
    }
  } else { // During Memory
    for(var i = 0; i < pointer - 1; i++) {
      stroke(0, 0, 255);
      line(position[i][0], position[i][1], position[i+1][0], position[i+1][1]);
    }
  }
}

function mousePressed() {
  on = true;
  if(pointer > 0) {
    pointer = 0;
    //fill(230);
    noStroke();
    rect(0, 0, width, height);
    //stroke(0);
  }
}

function mouseDragged() {
  if(pointer < position.length) {
    position[pointer][0] = mouseX;
    position[pointer][1] = mouseY;
    pointer++;
  } else {
    on = false;
  }
}

function mouseReleased() {
  on = false;
}
