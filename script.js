const focusInput = document.getElementById("focusMin");
const breakInput = document.getElementById("breakMin");
const applyBtn = document.getElementById("apply");

const modeEl = document.getElementById("mode");
const timeEl = document.getElementById("time");

const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");

let focusSeconds = 25 * 60;
let breakSeconds = 5 * 60;

let isFocus = true;
let remaining = focusSeconds;
let timerId = null;

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function updateUI() {
  modeEl.textContent = isFocus ? "Focus" : "Break";
  timeEl.textContent = formatTime(remaining);
}

function tick() {
  remaining--;

  if (remaining < 0) {
    isFocus = !isFocus;
    remaining = isFocus ? focusSeconds : breakSeconds;
  }

  updateUI();
}

startBtn.onclick = () => {
  if (timerId) return;
  timerId = setInterval(tick, 1000);
};

pauseBtn.onclick = () => {
  clearInterval(timerId);
  timerId = null;
};

resetBtn.onclick = () => {
  clearInterval(timerId);
  timerId = null;
  isFocus = true;
  remaining = focusSeconds;
  updateUI();
};

applyBtn.onclick = () => {
  focusSeconds = Math.max(1, focusInput.value) * 60;
  breakSeconds = Math.max(1, breakInput.value) * 60;

  if (!timerId) {
    remaining = isFocus ? focusSeconds : breakSeconds;
    updateUI();
  }
};

updateUI();
