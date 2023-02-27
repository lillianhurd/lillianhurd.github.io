

//let sound1 = new Tone.Player('media/creature.mp3');
let sounds = new Tone.Players({
  'beep': 'media/creature.mp3',
  'beepbeep': 'media/beep1.mp3',
  'beepie': 'media/beep2.mp3',
  'bloop': 'media/beep3.mp3'
});

const delay = new Tone.FeedbackDelay("8n", 0.5);

let soundNames = ["beep", "beepbeep", "beepie","bloop"];
let buttons = [];

let dSlider;
let fSlider;

function setup() {
  createCanvas(400, 400);
  sounds.connect(delay);
  delay.toDestination();

  soundNames.forEach((word, index) => {
    buttons[index] = createButton(word);
    buttons[index].position(index+150, index*50+75);
    buttons[index].mousePressed( () => buttonSound(word))
  })

  dSlider = createSlider(0., 1., 0.5, 0.05);
  dSlider.position(110,315);
  dSlider.mouseReleased( () => {
    delay.delayTime.value = dSlider.value();
  })


}

function draw() {
  background(150, 105, 185);
  textAlign(CENTER);
  textSize(20);
  fill(255);
  text('Press the buttons to make sounds!', 200, 50)
  
  text('Move the slider to change the effect!',200,290);
}

function buttonSound(whichSound) {
    sounds.player(whichSound).start();
}