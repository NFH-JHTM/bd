const daySelect = document.getElementById('day');
const monthSelect = document.getElementById('month');
const text1 = document.getElementById('text1');
const bulb = document.getElementById('bulb');
const pull = document.getElementById('pull');
let triggered = false;

// Tạo dropdown ngày và tháng
for (let i = 1; i <= 31; i++) {
  const option = document.createElement('option');
  option.value = i;
  option.textContent = i;
  daySelect.appendChild(option);
}
for (let i = 1; i <= 12; i++) {
  const option = document.createElement('option');
  option.value = i;
  option.textContent = `Tháng ${i}`;
  monthSelect.appendChild(option);
}

function checkDate() {
  const day = parseInt(daySelect.value);
  const month = parseInt(monthSelect.value);
  
  if (day === 13 && month === 4 && !triggered) {
    triggered = true;
    document.body.classList.add('dark-mode');

    setTimeout(() => {
      text1.classList.add('show');
    }, 1500);

    setTimeout(() => {
      bulb.classList.add('show');
    }, 4000);

    setTimeout(() => {
      pull.classList.add('show');
    }, 5500);
  }
}

daySelect.addEventListener('change', checkDate);
monthSelect.addEventListener('change', checkDate);

pull.addEventListener('click', () => {
  const clickSound = document.getElementById('click-sound');
  clickSound.play();

  setTimeout(() => {
    window.location.href = "next.html";
  }, 500);
});
