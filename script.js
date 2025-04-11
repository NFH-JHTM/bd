const daySelect = document.getElementById('daySelect');
const monthSelect = document.getElementById('monthSelect');
const text1 = document.getElementById('text1');
const pull = document.getElementById('pull');
const overlay = document.getElementById('overlay');
const clickSound = document.getElementById('clickSound');

let triggered = false;

// Populate dropdowns
for (let d = 1; d <= 31; d++) {
  let opt = document.createElement("option");
  opt.value = d;
  opt.text = d;
  daySelect.appendChild(opt);
}

const months = [
  "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
  "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
];

months.forEach((m, i) => {
  let opt = document.createElement("option");
  opt.value = i + 1;
  opt.text = m;
  monthSelect.appendChild(opt);
});

// Event
function checkBirthday() {
  if (triggered) return;

  const day = parseInt(daySelect.value);
  const month = parseInt(monthSelect.value);

  if (day === 13 && month === 4) {
    triggered = true;
    daySelect.disabled = true;
    monthSelect.disabled = true;

    overlay.classList.add("show");

    setTimeout(() => {
      text1.classList.add("show");
    }, 1500);

    setTimeout(() => {
      document.getElementById("bulb-container").classList.add("show");
    }, 4000);

    setTimeout(() => {
      pull.classList.add("show");
    }, 5500);
  }
}

daySelect.addEventListener("change", checkBirthday);
monthSelect.addEventListener("change", checkBirthday);

// Click to switch tab
pull.addEventListener("click", () => {
  clickSound.play();
  setTimeout(() => {
    window.location.href = "surprise.html"; // tab khác
  }, 1000);
});
