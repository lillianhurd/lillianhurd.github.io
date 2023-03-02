let slider;

const synth = new Tone.DuoSynth();
const reverb = new Tone.JCReverb(0.4);
synth.connect(reverb);

const osc = new Tone.OmniOscillator("C#4", "pwm").start();

const filter = new Tone.Filter(1500, "highpass").toDestination();

const ampEnv = new Tone.AmplitudeEnvelope({
  attack: 0.5,
  decay: 0.6,
  sustain: 0.3,
  release: 0.2
})

let notes = {
  'a': 'C4',
  's': 'D4',
  'd': 'E4',
  'f': 'F4',
  'g': 'G4',
  'h': 'A4',
  'j': 'B4',
  'k': 'C5'
}

function setup() {
  createCanvas(400, 400);

  slider = new Nexus.Slider("#slider");
  reverb.toDestination();

  synth.release = 1;
  synth.resonance = 0.98;

  slider.on('change', (v) =>  {
    reverb.roomSize.value = v;
  }); 

  filter.connect(ampEnv);
  osc.connect(ampEnv);
  ampEnv.connect(reverb);
}

function draw() {
  background(220);
}

function mousePressed() {
  Tone.start();
}

function keyPressed() {
  let toPlay = notes[key];
  console.log(toPlay);

  filter.frequency.rampTo(20000,25);
  osc.frequency.value = toPlay;
  ampEnv.triggerAttackRelease('8n');

}