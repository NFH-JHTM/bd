const fireworksCanvas = document.getElementById("fireworks");
const fCtx = fireworksCanvas.getContext("2d");
let fireworks = [];

function resizeFireworksCanvas() {
  fireworksCanvas.width = window.innerWidth;
  fireworksCanvas.height = window.innerHeight;
}
resizeFireworksCanvas();
window.addEventListener("resize", resizeFireworksCanvas);

function createFirework() {
  const x = Math.random() * fireworksCanvas.width;
  const y = fireworksCanvas.height;
  const color = `hsl(${Math.random() * 360}, 100%, 70%)`;

  for (let i = 0; i < 50; i++) {
    fireworks.push({
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * -5 - 4,
      alpha: 1,
      size: Math.random() * 2 + 1,
      color: color
    });
  }
}

function updateFireworks() {
  fCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
  fireworks.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= 0.015;
    if (p.alpha <= 0) fireworks.splice(i, 1);

    fCtx.beginPath();
    fCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    fCtx.fillStyle = p.color.replace('70%', `${p.alpha * 100}%`);
    fCtx.fill();
  });
}

function animateFireworks() {
  if (Math.random() < 0.03) createFirework();
  updateFireworks();
  requestAnimationFrame(animateFireworks);
}
animateFireworks();
