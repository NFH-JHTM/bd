// DOM Elements
const day = document.getElementById("day");
const month = document.getElementById("month");
const blackout = document.getElementById("blackout");
const flash = document.getElementById("flash");
const cutsceneText = document.getElementById("cutscene-text");
const audio = document.getElementById("bgm");
const bgm2 = document.getElementById("bgm2") || { pause: () => {} }; // Safe fallback

// Text sequence
const texts = [
  "Nơi này... từng là nơi chúng ta cười đùa.",
  "Một thời gian tưởng như chẳng bao giờ trôi qua.",
  "Nhưng kỷ niệm... cũng có ngày tàn.",
  "Không ai rời đi... chỉ là mọi thứ dừng lại.",
  "Và rồi... nơi này chìm vào tĩnh lặng.",
  "Chúng ta không thể quay lại...",
  "Nhưng có thể giữ lại một phần nhỏ...",
  "Một ánh sáng... của điều từng là đẹp nhất.",
  "Hãy chạm vào nó nếu bạn muốn..."
];

// State variables
let triggered = false;
let flashClickable = false;
let audioReady = false;
let canPlayMusic = false;

// Audio initialization
window.addEventListener("click", initAudio);
function initAudio() {
  if (!audioReady) {
    audio.load();
    audioReady = true;
  }
  canPlayMusic = true;
  window.removeEventListener("click", initAudio);
}

// Create date dropdowns
function createDropdowns() {
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
}
createDropdowns();

// Text animation system
function showText(content, delay, showFlash = false) {
  return new Promise(resolve => {
    setTimeout(async () => {
      // Animate out old text if exists
      const oldText = cutsceneText.textContent.trim();
      if (oldText.length > 0) {
        await animateTextOut(oldText);
      }

      // Animate in new text
      await animateTextIn(content);

      // Handle flash appearance
      if (showFlash) {
        flash.classList.add("show");
        flashClickable = false;
        
        // Enable flash after last text + 3 seconds
        setTimeout(() => {
          flashClickable = true;
          flash.classList.add("pulse");
        }, 3000);
      }
      resolve();
    }, delay);
  });
}

function animateTextOut(text) {
  return new Promise(resolve => {
    cutsceneText.innerHTML = "";
    const chars = text.split("");
    
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

    setTimeout(resolve, 1500);
  });
}

function animateTextIn(text) {
  return new Promise(resolve => {
    cutsceneText.innerHTML = text
      .split("")
      .map(char => `<span class="char-in">${char}</span>`)
      .join("");

    cutsceneText.classList.remove("hide");
    cutsceneText.classList.add("show");

    setTimeout(resolve, 500);
  });
}

// Birthday check
function checkBirthday() {
  if (triggered) return;

  if (parseInt(day.value) === 13 && parseInt(month.value) === 4) {
    triggered = true;
    day.disabled = true;
    month.disabled = true;

    // Stop background music
    bgm2.pause();
    bgm2.currentTime = 0;

    // Start sequence
    blackout.classList.add("show");
    
    // Play audio with fade in
    setTimeout(() => {
      if (audioReady && canPlayMusic) {
        audio.volume = 0;
        audio.play().catch(console.warn);
        fadeAudioIn(audio, 0.4, 2000);
      }
    }, 500);

    // Run text sequence with smooth timing
    runTextSequence();
  }
}

function fadeAudioIn(audioElement, targetVolume, duration) {
  const startVolume = audioElement.volume;
  const startTime = performance.now();
  
  function updateVolume() {
    const elapsed = performance.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    audioElement.volume = startVolume + (targetVolume - startVolume) * progress;
    
    if (progress < 1) {
      requestAnimationFrame(updateVolume);
    }
  }
  
  updateVolume();
}

async function runTextSequence() {
  await showText(texts[0], 2000);
  await showText(texts[1], 6000);
  await showText(texts[2], 6000);
  await showText(texts[3], 6000);
  await showText(texts[4], 6000);
  await showText(texts[5], 6000);
  await showText(texts[6], 6000);
  await showText(texts[7], 6000, true); // Show flash here
  await showText(texts[8], 6000); // Last text
}

// Flash click handler
flash.addEventListener("click", handleFlashClick);
function handleFlashClick() {
  if (!flashClickable) return;

  // Fade out audio
  fadeAudioOut(audio, 1300);
  
  // Zoom effect
  flash.classList.add("zoom-fullscreen");
  
  // Redirect after animation completes
  setTimeout(() => {
    window.location.href = "https://www.roblox.com/games/103960960602294/Untitled-Game";
  }, 1300);
}

function fadeAudioOut(audioElement, duration) {
  const startVolume = audioElement.volume;
  const startTime = performance.now();
  
  function updateVolume() {
    const elapsed = performance.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    audioElement.volume = startVolume * (1 - progress);
    
    if (progress < 1) {
      requestAnimationFrame(updateVolume);
    } else {
      audioElement.pause();
      audioElement.currentTime = 0;
    }
  }
  
  updateVolume();
}

// Event listeners
day.addEventListener("change", checkBirthday);
month.addEventListener("change", checkBirthday);
