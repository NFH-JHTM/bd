const day = document.getElementById("day");
const month = document.getElementById("month");
const blackout = document.getElementById("blackout");
const flash = document.getElementById("flash");
const cutsceneText = document.getElementById("cutscene-text");
const audio = document.getElementById("bgm");

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
let audioReady = false;
let canPlayMusic = false;

// 🔓 Unlock autoplay khi user click bất kỳ lần đầu
window.addEventListener("click", () => {
  if (!audioReady) {
    audio.load(); // preload để không bị block
    audioReady = true;
  }
  canPlayMusic = true;
});

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

// Hiện từng đoạn thoại + flash nếu cần
function showText(content, delay, showFlash = false) {
  setTimeout(() => {
    cutsceneText.classList.remove("show");
    cutsceneText.classList.add("hide");

    setTimeout(() => {
      cutsceneText.textContent = content;
      cutsceneText.classList.remove("hide");
      cutsceneText.classList.add("show");

      if (showFlash) {
        flash.classList.add("show");
      }
    }, 1500);
  }, delay);
}

// Kiểm tra sinh nhật
function checkBirthday() {
  if (triggered) return;
  if (parseInt(day.value) === 13 && parseInt(month.value) === 4) {
    triggered = true;
    day.disabled = true;
    month.disabled = true;

    blackout.classList.add("show");

    // 🎵 Phát nhạc sau blackout 0.5s
    setTimeout(() => {
      if (audioReady && canPlayMusic) {
        audio.volume = 0.4;
        audio.play().catch((e) => {
          console.warn("Autoplay bị chặn sau blackout", e);
        });
      }
    }, 500);

    // Cutscene sequence
    showText(texts[0], 2000);
    showText(texts[1], 6000);
    showText(texts[2], 10000);
    showText(texts[3], 14000);
    showText(texts[4], 18000);
    showText(texts[5], 22000);
    showText(texts[6], 26000);
    showText(texts[7], 30500, true);
    showText(texts[8], 34500);

    setTimeout(() => {
      flashClickable = true;
    }, 35500);
  }
}

day.addEventListener("change", checkBirthday);
month.addEventListener("change", checkBirthday);

// Flash click → chuyển tab
flash.addEventListener("click", () => {
  if (!flashClickable) return;

  flash.classList.add("zoom-fullscreen");

  setTimeout(() => {
    window.location.href = "next.html";
  }, 1300);
});
