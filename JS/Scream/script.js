const btn = document.querySelector("#Play");
const btn2 = document.querySelector("#Stop");

let bgInterval = null;

const audio1 = new Audio('./Video Project.mp3');
const audio2 = new Audio('./Video Project 2.m4a');

audio1.loop = true;

function random(number) {
  return Math.floor(Math.random() * (number + 1));
}

function flashBackground() {
  const rndCol = `rgb(${random(255)} ${random(255)} ${random(255)})`;
  document.body.style.backgroundColor = rndCol;
}

btn.addEventListener("click", () => {
  if (bgInterval) return; // prevent stacking

  audio1.currentTime = 0;
  audio1.play().catch(err => console.log(err));

  bgInterval = setInterval(flashBackground, 100);
});

btn2.addEventListener("click", () => {
  clearInterval(bgInterval);
  bgInterval = null;

  document.body.style.backgroundColor = "white";

  audio1.pause();
  audio1.currentTime = 0;

  audio2.play().catch(err => console.log(err));
});
