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

// 🔓 Unlock autoplay khi user tương tác lần đầu
window.addEventListener("click", () => {
  if (!audioReady) {
    audio.load();
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

// Cutscene từng đoạn, có hiệu ứng bay màu
function showText(content, delay, showFlash = false, isLast = false) {
  setTimeout(() => {
    // Bay màu từng ký tự
    const chars = cutsceneText.textContent.split("");
    cutsceneText.innerHTML = "";
    chars.forEach((char, index) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.classList.add("char-out");

      // Random hiệu ứng bay
      span.style.setProperty("--x", `${Math.random() * 60 - 30}px`);
      span.style.setProperty("--y", `${-60 - Math.random() * 40}px`);
      span.style.setProperty("--r", `${Math.random()}turn`);

      span.style.animationDelay = `${index * 20}ms`;
      cutsceneText.appendChild(span);
    });

    cutsceneText.classList.remove("show");
    cutsceneText.classList.add("hide");

    setTimeout(() => {
      // Hiện text mới
      cutsceneText.innerHTML = content
        .split("")
        .map(char => `<span class="char-in">${char}</span>`)
        .join("");

      cutsceneText.classList.remove("hide");
      cutsceneText.classList.add("show");

      if (showFlash) {
        flash.classList.add("show");

        // Chờ thêm 2s sau khi text hiện mới cho click đốm sáng
        setTimeout(() => {
          flashClickable = true;
        }, 2000);
      }
    }, 1400);
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

    // 🎵 Nhạc bắt đầu
    setTimeout(() => {
      if (audioReady && canPlayMusic) {
        audio.volume = 0.4;
        audio.play().catch(e => console.warn("Autoplay chặn", e));
      }
    }, 500);

    // 🎬 Cutscene kéo dài hơn
    showText(texts[0], 2000);
    showText(texts[1], 8000);
    showText(texts[2], 14000);
    showText(texts[3], 20000);
    showText(texts[4], 26000);
    showText(texts[5], 32000);
    showText(texts[6], 38000);
    showText(texts[7], 45000, true);
    showText(texts[8], 51000);
  }
}

day.addEventListener("change", checkBirthday);
month.addEventListener("change", checkBirthday);

// Click đốm sáng → zoom + tắt nhạc + chuyển tab
flash.addEventListener("click", () => {
  if (!flashClickable) return;

  audio.pause();
  audio.currentTime = 0;

  flash.classList.add("zoom-fullscreen");

  setTimeout(() => {
    window.location.href = "next.html";
  }, 1300);
});
