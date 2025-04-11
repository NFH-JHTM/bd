const day = document.getElementById("day");
const month = document.getElementById("month");
const blackout = document.getElementById("blackout");
const text1 = document.getElementById("text1");
const text2 = document.getElementById("text2");
const flash = document.getElementById("flash");

let triggered = false;

// Tạo dropdown
for (let i = 1; i <= 31; i++) {
  const opt = document.createElement("option");
  opt.value = i;
  opt.textContent = i;
  day.appendChild(opt);
}

for (let i = 1; i <= 12; i++) {
  const opt = document.createElement("option");
  opt.value = i;
  opt.textContent = `Tháng ${i}`;
  month.appendChild(opt);
}

function checkBirthday() {
  if (triggered) return;
  if (parseInt(day.value) === 13 && parseInt(month.value) === 4) {
    triggered = true;
    day.disabled = true;
    month.disabled = true;

    blackout.classList.add("show");

    // Text 1 hiện
    setTimeout(() => {
      text1.classList.add("show");
    }, 1500);

    // Text 1 ẩn
    setTimeout(() => {
      text1.classList.remove("show");
    }, 3500);

    // Flash hiện
    setTimeout(() => {
      flash.classList.add("show");
    }, 4000);

    // Text 2 hiện
    setTimeout(() => {
      text2.classList.add("show");
    }, 5000);
  }
}

day.addEventListener("change", checkBirthday);
month.addEventListener("change", checkBirthday);

// Flash click → toàn màn hình zoom → chuyển trang
flash.addEventListener("click", () => {
  blackout.classList.add("zoom-out");

  setTimeout(() => {
    window.location.href = "next.html"; // đổi nếu muốn
  }, 1000);
});
