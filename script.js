let startTime, interval, elapsed = 0;
const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const laps = document.getElementById('laps');

function formatTime(ms) {
  let date = new Date(ms);
  return `${String(date.getUTCHours()).padStart(2, '0')}:${String(date.getUTCMinutes()).padStart(2, '0')}:${String(date.getUTCSeconds()).padStart(2, '0')}.${String(date.getUTCMilliseconds()).padStart(3, '0')}`;
}

function updateDisplay() {
  display.textContent = formatTime(elapsed + (Date.now() - startTime));
}

startBtn.addEventListener('click', () => {
  if (!interval) {
    startTime = Date.now();
    interval = setInterval(updateDisplay, 10);
  }
});

pauseBtn.addEventListener('click', () => {
  if (interval) {
    elapsed += Date.now() - startTime;
    clearInterval(interval);
    interval = null;
  }
});

resetBtn.addEventListener('click', () => {
  clearInterval(interval);
  interval = null;
  startTime = null;
  elapsed = 0;
  display.textContent = '00:00:00.000';
  laps.innerHTML = '';
});

lapBtn.addEventListener('click', () => {
  if (interval || elapsed > 0) {
    const li = document.createElement('li');
    li.textContent = formatTime(elapsed + (interval ? (Date.now() - startTime) : 0));
    laps.appendChild(li);
  }
});
