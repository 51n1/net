var position; // float[][]
var pointer; // int
var amount; // float
var zdepth; // float
var on; // boolean

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight,WEBGL);
  canvas.parent("p5canvas");
  select("#p5output").html("Drawing + Motion + 3D");
  select("#p5text").html("Click or touch and drag on screen, then if release, drawn lines will be moving. Push Enter key or touch with two fingers for reset of sketch. ");
  select("body").style("background-color", color(10));
  select("#p5output").style("color", color(200));
  select("#p5text").style("color", color(200));
  select("#p5text").style("display", "block");
  
  position = new Array(500);
  for (var i = 0; i < position.length; i++) {
    position[i] = new Array(3);
  }
  pointer = 0;
  amount = 3.0;
  zdepth = 1.5;
  on = false;
  
  var fov = 60 / 180 * PI;
  var cameraZ = (height/2.0) / tan(fov/2.0);
  //perspective(60 / 180 * PI, width/height, cameraZ * 0.1, cameraZ * 10);
  perspective(30 / 180 * PI, width/height, 1, 10000);
}

function draw() {
  //translate(-width*0.5, -height*0.5, 0);
  //camera(width*0.5, height*0.5, 0);
  
  if((on == false) && (pointer > 0)) { // After Memory
    //translate(0, 0, -pointer*zdepth*2)
    orbitControl();
    background(10);
    fill(255);
    beginShape();
    vertex(position[0][0], position[0][1], position[0][2]);
    for(var i = 0; i < pointer; i++) {
      position[i][0] += random(-amount, amount);
      position[i][1] += random(-amount, amount);
      position[i][2] += random(-amount, amount);
      vertex(position[i][0], position[i][1], position[i][2]);
    }
    endShape();
  } else { // During Memory
    background(10);
    fill(0,255,255);
    beginShape();
    vertex(position[0][0], position[0][1], 0);
    for(var i = 0; i < pointer; i++) {
      vertex(position[i][0], position[i][1], 0);
    }
    endShape();
  }
  if( pointer > 0 && (touches.length > 1 || keyIsDown(" ")) ) {
    pointer = 0;
    on = false;
  }
}

function mousePressed() {
  if( pointer == 0 ) on = true;
}

function mouseDragged() {
  if( on == true && pointer < position.length ) {
    position[pointer][0] = mouseX - width*0.5;
    position[pointer][1] = mouseY - height*0.5;
    position[pointer][2] = -pointer*zdepth;
    pointer++;
  } else {
    on = false;
  }
}

function mouseReleased() {
  if( on == true ) on = false;
}
