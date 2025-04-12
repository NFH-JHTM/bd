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

// 🔓 Unlock autoplay nhạc khi user tương tác
window.addEventListener("click", () => {
  if (!audioReady) {
    audio.load();
    audioReady = true;
  }
  canPlayMusic = true;
});

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

// 🎬 Hiển thị text với hiệu ứng "bay màu"
function showText(content, delay, showFlash = false) {
  setTimeout(() => {
    const oldText = cutsceneText.textContent.trim();

    if (oldText.length > 0) {
      // 🔥 Bay màu từng ký tự
      const chars = oldText.split("");
      cutsceneText.innerHTML = "";
      chars.forEach((char, index) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.classList.add("char-out");

        span.style.setProperty("--x", `${Math.random() * 60 - 30}px`);
        span.style.setProperty("--y", `${-60 - Math.random() * 40}px`);
        span.style.setProperty("--r", `${Math.random()}turn`);
        span.style.animationDelay = `${index * 20}ms`;
        cutsceneText.appendChild(span);
      });

      cutsceneText.classList.remove("show");
      cutsceneText.classList.add("hide");
    }

    setTimeout(() => {
      cutsceneText.innerHTML = content
        .split("")
        .map(char => `<span class="char-in">${char}</span>`)
        .join("");

      cutsceneText.classList.remove("hide");
      cutsceneText.classList.add("show");

      if (showFlash) {
        flash.classList.add("show");

        // ⏱️ Cho phép click flash sau 2s
        setTimeout(() => {
          flashClickable = true;
        }, 2000);
      }
    }, oldText.length > 0 ? 1500 : 0);
  }, delay);
}

function checkBirthday() {
  if (triggered) return; // Ngừng nếu đã được kích hoạt

  if (parseInt(day.value) === 13 && parseInt(month.value) === 4) {
    triggered = true;
    day.disabled = true;
    month.disabled = true;

    // Tắt nhạc nếu có
    if (!bgm2.paused) {
      bgm2.pause();
      bgm2.currentTime = 0;
    }

    // Hiển thị blackout
    blackout.classList.add("show");

    // Chạy đoạn cắt cảnh
    runCutscene(); // Đảm bảo rằng function này chạy sau khi sự kiện này xảy ra.
  }
}



    // 🎵 Phát nhạc
    setTimeout(() => {
      if (audioReady && canPlayMusic) {
        audio.volume = 0.4;
        audio.play().catch((e) => {
          console.warn("Autoplay bị chặn", e);
        });
      }
    }, 500);

    // Cutscene chill dài hơn
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

// ⭐ Flash click
flash.addEventListener("click", () => {
  if (!flashClickable) return;

  // Tắt nhạc
  audio.pause();
  audio.currentTime = 0;

  flash.classList.add("zoom-fullscreen");

  setTimeout(() => {
    window.location.href = "https://www.roblox.com/games/103960960602294/Untitled-Game";
  }, 1300);
});

const preloader = document.getElementById("preloader");
const loadingText = document.querySelector(".loading-text");
const continueText = document.querySelector(".continue-text");
const bgm2 = document.getElementById("bgm2");

window.addEventListener("load", () => {
  // Sau 2.5s loading xong
  setTimeout(() => {
    loadingText.style.display = "none";
    continueText.style.display = "block";

    // Chờ user bấm phím bất kỳ
    window.addEventListener("keydown", () => {
      preloader.classList.add("hide");

      // Phát nhạc khi vào trang
      setTimeout(() => {
        try {
          bgm2.volume = 0.4;
          bgm2.play();
        } catch (e) {
          console.warn("Autoplay bị chặn!", e);
        }
        preloader.remove();
      }, 1500); // delay nhẹ sau mở cửa
    }, { once: true });
  }, 2500); // thời gian loading giả
});
