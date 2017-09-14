var position; // float[][]
var pointer; // int
var amount; // float
var zdepth; // float
var on; // boolean
var title = "Drawing + Motion + 3D";
var hint1 = "Keep dragging on screen, and then if release, drawn lines will start moving.";
var hint2 = "You can turn a drawing object by sliding your mouse or finger. If make new one, push Enter key or touch with two fingers.";

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.parent("p5canvas");
  select("body").style("background-color", color(10));
  select("#p5title").html(title);
  select("#p5title").style("color", color(200));
  select("#p5help").html(hint1);
  select("#p5help").style("color", color(200));
  //select("#p5help").style("display", "block");
  
  position = new Array(500);
  for (var i = 0; i < position.length; i++) {
    position[i] = new Array(3);
  }
  pointer = 0;
  amount = 3.0;
  zdepth = 1.5;
  on = false;
}

function draw() {
  background(10);
  if((on == false) && (pointer > 0)) { // After Memory
    camera(0, 0, pointer*zdepth*1);
    //orbitControl();
    rotateX(radians(map(mouseY, -height*0.5, height*0.5, 0, 360)));
    rotateY(radians(map(mouseX, -width*0.5, width*0.5, 0, 360)));
    rotateZ(frameCount*0.005);
    //background(10);
    fill(255);
    beginShape();
    for(var i = 0; i < pointer; i++) {
      position[i][0] += random(-amount, amount);
      position[i][1] += random(-amount, amount);
      position[i][2] += random(-amount, amount);
      vertex(position[i][0], position[i][1], position[i][2]);
    }
    endShape();
  } else { // During Memory
    camera(0, 0, pointer*zdepth*0.1); // Z-axis
    //background(10);
    fill(0,255,255);
    beginShape();
    for(var i = 0; i < pointer; i++) {
      vertex(position[i][0], position[i][1], 0);
    }
    endShape();
  }
  if( pointer > 0 && (touches.length > 1 || keyIsDown(ENTER)) ) {
    pointer = 0;
    on = false;
    select("#p5help").html(hint1);
    //select("#p5help").style("display", "block");
  }
}

function mousePressed() {
  if( pointer == 0 ) {
    on = true;
  }
}

function mouseDragged() {
  if( on == true && pointer < position.length ) {
    position[pointer][0] = mouseX - width*0.5;
    position[pointer][1] = mouseY - height*0.5;
    position[pointer][2] = 0;
    pointer++;
    select("#p5help").html(pointer);
  } else {
    if( on == true ) start3D();
  }
}

function mouseReleased() {
  if( on == true && pointer > 0 ) start3D();
}

function start3D() {
  on = false;
  for (var i=0; i<pointer; i++){
    position[i][2] = pointer*zdepth*0.5 - i*zdepth;
  }
  select("#p5help").html(hint2);
}
