const day = document.getElementById("day");
const month = document.getElementById("month");
const blackout = document.getElementById("blackout");
const flash = document.getElementById("flash");

const texts = [
  "Nơi này... từng là nơi chúng ta cười đùa.",
  "Một thời gian tưởng như chẳng bao giờ trôi qua.",
  "Nhưng kỷ niệm... cũng có ngày tàn.",
  "Không ai rời đi... chỉ là mọi thứ dừng lại.",
  "Và rồi... nơi này chìm vào tĩnh lặng.",
  "Chúng ta không thể quay lại...",
  "Nhưng có thể giữ lại một phần nhỏ...",
  "Một ánh sáng... của điều từng là đẹp nhất.",
  "Bạn có muốn chạm vào ký ức đó không?"
];

let triggered = false;
let flashClickable = false;
let currentText = null;

// Tạo dropdown ngày/tháng
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

// Hàm hiển thị lời thoại theo từng mốc thời gian
function showText(content, delay) {
  setTimeout(() => {
    if (currentText) currentText.remove();

    const newText = document.createElement("div");
    newText.className = "fade-text show";
    newText.textContent = content;
    blackout.appendChild(newText);
    currentText = newText;
  }, delay);
}

// Kiểm tra ngày sinh
function checkBirthday() {
  if (triggered) return;
  if (parseInt(day.value) === 13 && parseInt(month.value) === 4) {
    triggered = true;
    day.disabled = true;
    month.disabled = true;
    blackout.classList.add("show");

    // Chuỗi thoại bí ẩn - điện ảnh
    showText(texts[0], 2000);
    showText(texts[1], 6000);
    showText(texts[2], 9500);
    showText(texts[3], 13000);
    showText(texts[4], 16500);

    // Hiện đốm sáng lấp lánh
    setTimeout(() => {
      flash.classList.add("show");
    }, 20000);

    // Các dòng sau ánh sáng
    showText(texts[5], 21500);
    showText(texts[6], 24500);
    showText(texts[7], 27500);
    showText(texts[8], 30500);

    // Cho phép click sau 32s
    setTimeout(() => {
      flashClickable = true;
    }, 32000);
  }
}

day.addEventListener("change", checkBirthday);
month.addEventListener("change", checkBirthday);

// Khi click đốm sáng
flash.addEventListener("click", () => {
  if (!flashClickable) return;

  flash.classList.add("zoom-fullscreen");

  setTimeout(() => {
    window.location.href = "next.html"; // 👉 thay bằng link bro muốn
  }, 1200);
});
