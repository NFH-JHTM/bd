const day = document.getElementById("day");
const month = document.getElementById("month");
const blackout = document.getElementById("blackout");
const text1 = document.getElementById("text1");
const text2 = document.getElementById("text2");
const flash = document.getElementById("flash");

let triggered = false;

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

// Flash click to zoom + redirect
flash.addEventListener("click", () => {
  flash.classList.add("zoom");
  setTimeout(() => {
    window.location.href = "next.html"; // 👉 đổi link ở đây nếu cần
  }, 1000);
});
