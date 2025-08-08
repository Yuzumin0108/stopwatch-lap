const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStop');
const lapBtn = document.getElementById('lap');
const resetBtn = document.getElementById('reset');
const lapsTbody = document.querySelector('#laps tbody');

let running = false;
let startTime = 0;      // timestamp when started
let elapsed = 0;        // accumulated time when stopped
let timerId = null;
let lapTimes = [];

function format(ms) {
  const centis = Math.floor(ms / 10) % 100; // centiseconds
  const totalSec = Math.floor(ms / 1000);
  const secs = totalSec % 60;
  const mins = Math.floor(totalSec / 60) % 60;
  const hrs = Math.floor(totalSec / 3600);
  return (
    (hrs < 10 ? '0' + hrs : hrs) + ':' +
    (mins < 10 ? '0' + mins : mins) + ':' +
    (secs < 10 ? '0' + secs : secs) + '.' +
    centis.toString().padStart(2, '0')
  );
}

function updateDisplay() {
  const now = performance.now();
  const diff = running ? now - startTime + elapsed : elapsed;
  display.textContent = format(diff);
}

function tick() {
  updateDisplay();
}

function start() {
  running = true;
  startTime = performance.now();
  timerId = setInterval(tick, 10); // update every 10ms for smoother centisecond display
  startStopBtn.textContent = 'Stop';
  lapBtn.disabled = false;
  resetBtn.disabled = false;
}

function stop() {
  running = false;
  clearInterval(timerId);
  elapsed += performance.now() - startTime;
  startStopBtn.textContent = 'Start';
  lapBtn.disabled = true;
}

function reset() {
  running = false;
  clearInterval(timerId);
  startTime = 0;
  elapsed = 0;
  lapTimes = [];
  lapsTbody.innerHTML = '';
  updateDisplay();
  startStopBtn.textContent = 'Start';
  lapBtn.disabled = true;
  resetBtn.disabled = true;
}

function lap() {
  const now = running ? performance.now() - startTime + elapsed : elapsed;
  const lapTime = lapTimes.length === 0 ? now : now - lapTimes.reduce((a, b) => a + b, 0);
  lapTimes.push(lapTime);

  const row = document.createElement('tr');
  const idxCell = document.createElement('td');
  const lapCell = document.createElement('td');
  const totalCell = document.createElement('td');

  idxCell.textContent = lapTimes.length;
  lapCell.textContent = format(lapTime);
  totalCell.textContent = format(now);

  row.appendChild(idxCell);
  row.appendChild(lapCell);
  row.appendChild(totalCell);
  lapsTbody.prepend(row); // latest lap on top
}

startStopBtn.addEventListener('click', () => {
  running ? stop() : start();
});

lapBtn.addEventListener('click', lap);
resetBtn.addEventListener('click', reset);

// initialize display
updateDisplay();
