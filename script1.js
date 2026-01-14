const runButton = document.getElementById('runButton');
const startButton = document.getElementById('startButton');
const arena = document.getElementById('arena');
const timeText = document.getElementById('time');
const triesText = document.getElementById('tries');
const resultText = document.getElementById('result');
const recordText = document.getElementById('record');
const bar = document.getElementById('bar');
const levelSelect = document.getElementById('level');

let time, timer, tries, gameRunning = false;
let record = localStorage.getItem('bestRecord');
recordText.textContent = record || '—';

const levels = {
  easy:   { time: 20, speed: 1 },
  normal: { time: 15, speed: 1.3 },
  hard:   { time: 13, speed: 1.7 },
  insane: { time: 10,  speed: 2.2 }
};

function randomPosition() {
  const maxX = arena.clientWidth - runButton.offsetWidth;
  const maxY = arena.clientHeight - runButton.offsetHeight;
  runButton.style.left = Math.random() * maxX + 'px';
  runButton.style.top  = Math.random() * maxY + 'px';
}

runButton.addEventListener('mouseenter', () => {
  if (!gameRunning) return;
  tries++;
  triesText.textContent = tries;
  randomPosition();
});

runButton.addEventListener('click', () => {
  if (!gameRunning) return;
  clearInterval(timer);
  gameRunning = false;
  resultText.textContent = `🏆 Победа за ${tries} попыток!`;

  if (!record || tries < record) {
    record = tries;
    localStorage.setItem('bestRecord', record);
    recordText.textContent = record;
  }
});

startButton.addEventListener('click', () => {
  const level = levels[levelSelect.value];

  time = level.time;
  tries = 0;
  gameRunning = true;

  timeText.textContent = time;
  triesText.textContent = 0;
  resultText.textContent = '';
  bar.style.width = '100%';

  randomPosition();
  clearInterval(timer);

  timer = setInterval(() => {
    time--;
    timeText.textContent = time;
    bar.style.width = (time / level.time) * 100 + '%';

    if (time <= 0) {
      clearInterval(timer);
      gameRunning = false;
      resultText.textContent = '💀 Время вышло!';
    }
  }, 1000 / level.speed);
});
