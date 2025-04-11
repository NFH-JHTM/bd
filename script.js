const day = document.getElementById("day");
const month = document.getElementById("month");
const blackout = document.getElementById("blackout");
const text1 = document.getElementById("text1");
const text2 = document.getElementById("text2");
const flash = document.getElementById("flash");

let triggered = false;

// 👉 Tạo dropdown ngày
for (let i = 1; i <= 31; i++) {
  const opt = document.createElement("option");
  opt.value = i;
  opt.textContent = i;
  day.appendChild(opt);
}

// 👉 Tạo dropdown tháng
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

    // Show blackout
    blackout.classList.add("show");

    // Text 1
    setTimeout(() => {
      text1.classList.add("show");
    }, 1500);

    // Flash appear
    setTimeout(() => {
      flash.classList.add("show");
    }, 3500);

    // Text 2
    setTimeout(() => {
      text2.classList.add("show");
    }, 5000);
  }
}

day.addEventListener("change", checkBirthday);
month.addEventListener("change", checkBirthday);

// 👉 Flash click → zoom & chuyển trang
flash.addEventListener("click", () => {
  flash.classList.add("zoom");
  setTimeout(() => {
    window.location.href = "next.html"; // 👉 đổi link tại đây nếu muốn
  }, 1000);
});
