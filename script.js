const day = document.getElementById("day");
const month = document.getElementById("month");
const blackout = document.getElementById("blackout");
const text1 = document.getElementById("text1");
const text2 = document.getElementById("text2");
const flash = document.getElementById("flash");

let triggered = false;

// Dropdown
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

    // Text 1 hiện sau 2s
    setTimeout(() => {
      text1.classList.add("show");
    }, 2000);

    // Text 1 ẩn sau 5.5s
    setTimeout(() => {
      text1.classList.remove("show");
    }, 5500);

    // Flash hiện sau 6.5s
    setTimeout(() => {
      flash.classList.add("show");
    }, 6500);

    // Text 2 hiện tại vị trí cũ sau 8s
    setTimeout(() => {
      text2.classList.add("show");
    }, 8000);
  }
}

day.addEventListener("change", checkBirthday);
month.addEventListener("change", checkBirthday);

// Click flash => toàn màn hình zoom và chuyển trang
flash.addEventListener("click", () => {
  flash.classList.add("zoom-fullscreen");

  setTimeout(() => {
    window.location.href = "next.html"; // 👈 chỉnh link nếu cần
  }, 1200);
});
