// Based on The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let noiseline;
let randomline;
let imgsize;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5canvas");
  let title = "Comparison of Randomness by Line Drawings";
  document.title = title + " - " + document.title;
  select("#p5title").html(title);
  select("body").style("background-color", color(255));

  imgsize = width*0.33;
  noiseline = new NoiseLine(imgsize, 20);
  randomline = new RandomLine(imgsize, 20);
  background(255);
}

function draw() {

  push();
  translate( width * 0.25 - imgsize * 0.5, height * 0.5 - imgsize * 0.5 );
  noiseline.step();
  noiseline.render();
  pop();

  push ();
  translate( width * 0.75 - imgsize * 0.5, height * 0.5 - imgsize * 0.5 );
  randomline.step();
  randomline.render();
  pop();

}

class NoiseLine {
  constructor(_s, _c) {
    this.s = _s;
    this.cols = _c;
    this.y = [];
    this.ty = [];
    for (let i = 0; i < this.cols + 1; i++) {
      this.y[i] = 0;
      this.ty[i] = i * 10000;
    }
  }

  render() {
    stroke(0);
    strokeWeight(1);
    fill(255, 10);
    rect(-1, 0, this.s + 1, this.s);
    noFill();
    beginShape();
    for (let i = 0; i < this.cols + 1; i++) {
      let x1 = this.s / this.cols * i;
      if( i == 0 || i == this.cols ) curveVertex(x1, this.y[i]);
      curveVertex(x1, this.y[i]);
    }
    endShape();
  }

  step() {
    for (let i = 0; i < this.cols + 1; i++) {
      this.y[i] = map(noise(this.ty[i]), 0, 1, 0, this.s);
      this.ty[i] += 0.01;
    }
  }
}

class RandomLine {
  constructor(_s, _c) {
    this.s = _s;
    this.cols = _c;
    this.y = [];
    for (let i = 0; i < this.cols + 1; i++) {
      this.y[i] = this.s * 0.5;
    }
  }

  render() {
    stroke(0);
    strokeWeight(1);
    fill(255, 10);
    rect(0, 0, this.s, this.s);
    noFill();
    for (let i = 0; i < this.cols; i++) {
      let x1 = this.s / this.cols * i;
      let x2 = this.s / this.cols * (i + 1);
      line(x1, this.y[i], x2, this.y[i + 1]);
    }
  }

  step() {
    for (let i = 0; i < this.cols + 1; i++) {
      let stepy = random(-1, 1)*5;
      this.y[i] += stepy;
      this.y[i] = constrain(this.y[i], 0, this.s);
    }
  }
}
