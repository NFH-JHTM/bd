const preloader = document.getElementById("preloader");
const loadingText = document.querySelector(".loading-text");
const continueText = document.querySelector(".continue-text");
const bgm2 = document.getElementById("bgm2");

// GATE mở sau tương tác
window.addEventListener("load", () => {
  setTimeout(() => {
    loadingText.style.display = "none";
    continueText.style.display = "block";

    window.addEventListener("pointerdown", () => {
      preloader.classList.add("gates-open");

      setTimeout(() => {
        bgm2.volume = 0.4;
        bgm2.play().catch(e => console.warn("Autoplay bị chặn", e));

        preloader.classList.add("hide");
        setTimeout(() => preloader.remove(), 1500);
      }, 2000); // chờ animation gate
    }, { once: true });
  }, 6000); // ⏳ kéo dài loading 6s
});
