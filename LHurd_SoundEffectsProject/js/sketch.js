let img;
let initTone = true;
let pitch = 600;
let osc = new Tone.FMOscillator(pitch, 'sine', 'sine').start();
let gain = new Tone.Gain().toDestination();
let pan = new Tone.Panner().connect(gain);
let ampEnv = new Tone.AmplitudeEnvelope({
  attack: 0.1,
  decay: 0.5,
  sustain: 1.0,
  release: 1.0
}).connect(pan);
osc.connect(ampEnv);


let noise = new Tone.Noise('pink').start();
let noiseEnv = new Tone.AmplitudeEnvelope({
  attack: 0.1,
  decay: 0.8,
  sustain: 1.0,
  release: 0.8
}).connect(gain);

function preload(){
  img = loadImage('media/alarm.png');
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  if(mouseIsPressed){
    background(img);
  }
  fill(250);
  text('press to start car alarm effect',130,50);
}

function keyPressed() {
  if (keyCode === 32 && initTone === true) {
    console.log('spacebar pressed');

    Tone.start();
    initTone = false;
  }
}

function mousePressed() {
  ampEnv.triggerAttackRelease('4n');
  ampEnv.triggerAttackRelease('4n', '+1');
  ampEnv.triggerAttackRelease('4n', '+2');
}
