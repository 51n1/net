var position; // float[][]
var pointer; // int
var amount; // float
var zdepth; // float
var on; // boolean
var hint1 = "<h2>1st Step</h2><p>Keep dragging on screen and then if release, the drawn lines will start moving with sound. If muted sound, please turn on sound button of menu bar.</p>";
var hint2 = "<h2>2nd Step</h2><p>You can rotate a drawing object by sliding your mouse or finger. If make new one, push space bar or touch with two fingers.</p>";
var mysound;
var analyzer;

//function preload() {
//  mysound = loadSound('./sounds/20170924.wav');
//}

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.parent("p5canvas");
  var p5title = "Drawing + Motion + 3D + Audio";
  document.title = p5title + " - " + document.title;
  select("#p5title").html(p5title);
  select("body").style("background-color", color(10));
  select("#p5help").html(hint1);
  select("#p5text").html("Draw a line and select sound !!");
  select("#p5text").style("color", color(255));

  position = new Array(500);
  for (var i = 0; i < position.length; i++) {
    position[i] = new Array(3);
  }
  pointer = 0;
  amount = 2.0;
  zdepth = 1.5;
  on = false;

  //analyzer = new p5.Amplitude(); // create a new Amplitude analyzer
  //analyzer.setInput(mysound); // Patch the input to an volume analyzer
  //mysound.play();
  //mysound.loop();
  //mysound.stop();
  //mysound.setVolume(0.1);
}

function draw() {
  background(10);

  if((on == false) && (pointer > 0)) { // After Memory
    camera(0, 0, pointer*zdepth*1);
    //orbitControl();
    rotateX(radians(map(mouseY, -height*0.5, height*0.5, 0, 360)));
    rotateY(radians(map(mouseX, -width*0.5, width*0.5, 0, 360)));
    rotateZ(frameCount*0.005);
    fill(255);
    var rms = analyzer.getLevel();
    rms = map(rms, 0, 1, 0, 10);
    //console.log(rms);
    //rms = random(1) > 0.5 ? rms*-1 : rms*+1;
    beginShape();
    var addition = random(-rms, rms);
    for(var i = 0; i < pointer; i++) {
      //position[i][0] += map(noise(offset), 0, 1, -5, 5);
      //position[i][1] += map(noise(offset), 0, 1, -5, 5);
      //position[i][2] += map(noise(offset), 0, 1, -5, 5);
      position[i][0] += random(-rms*amount, rms*amount);
      position[i][1] += random(-rms*amount, rms*amount);
      position[i][2] += random(-rms*amount, rms*amount);
      var newx = position[i][0] + addition*2;
      var newy = position[i][1] + addition*2;
      var newz = position[i][2] + addition*2;
      vertex(position[i][0], position[i][1], position[i][2]);
      vertex(newx, newy, newz);
    }
    endShape();
  } else { // During Memory
    camera(0, 0, pointer*zdepth*0.1); // Z-axis
    fill(0,255,255);
    beginShape();
    for(var i = 0; i < pointer; i++) {
      vertex(position[i][0], position[i][1], 0);
    }
    endShape();
  }
}

function mousePressed() {
  if( pointer == 0 ) {
    on = true;
  } else if( pointer > 0 && touches.length > 1 ) {
    initSketch();
  }
}

function mouseDragged() {
  if( on == true && pointer < position.length ) {
    position[pointer][0] = mouseX - width*0.5;
    position[pointer][1] = mouseY - height*0.5;
    position[pointer][2] = 0;
    pointer++;
    //console.log(pointer);
  } else {
    if( on == true ) start3D();
  }
}

function mouseReleased() {
  if( on == true && pointer > 0 ) start3D();
}

function keyTyped() {
  if (pointer > 0 && key === ' ') {
    initSketch();
  }
  //return false;
}

function initSketch() {
  pointer = 0;
  on = false;
  select("#p5help").html(hint1);
}

function start3D() {
  on = false;
  for (var i=0; i<pointer; i++){
    position[i][2] = pointer*zdepth*0.5 - i*zdepth;
  }
  select("#p5help").html(hint2);
}
