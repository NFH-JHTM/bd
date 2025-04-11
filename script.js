let triggered = false;
const daySelect = document.getElementById("day");
const monthSelect = document.getElementById("month");
const overlay = document.getElementById("overlay");
const text1 = document.getElementById("text1");
const bulbContainer = document.getElementById("bulb-container");
const pull = document.getElementById("pull");

// Check ngày sinh
function checkBirthday() {
  if (triggered) return;

  const day = parseInt(daySelect.value);
  const month = parseInt(monthSelect.value);

  if (day === 13 && month === 4) {
    triggered = true;

    // Khoá chọn ngày tháng
    daySelect.disabled = true;
    monthSelect.disabled = true;

    // Làm đen màn hình
    overlay.classList.add("show");

    // Hiện text sau 1.5s
    setTimeout(() => {
      text1.style.display = "block";
    }, 1500);

    // Hiện bóng đèn sau 4.5s
    setTimeout(() => {
      bulbContainer.style.display = "block";
    }, 4500);

    // Hiện dây kéo sau 6s
    setTimeout(() => {
      pull.classList.add("show");
    }, 6000);
  }
}

// Kéo dây đèn
pull.addEventListener("click", () => {
  const clickSound = document.getElementById("click-sound");
  clickSound.play();

  // Fade out overlay
  overlay.classList.remove("show");
  overlay.classList.add("fade-out");

  // Chuyển tab hoặc trang khác
  setTimeout(() => {
    window.location.href = "your-next-page.html"; // thay bằng link thật
  }, 2000);
});
