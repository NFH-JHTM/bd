const balloonCanvas = document.getElementById("balloons");
const bCtx = balloonCanvas.getContext("2d");
let balloons = [];

function resizeBalloonCanvas() {
  balloonCanvas.width = window.innerWidth;
  balloonCanvas.height = window.innerHeight;
}
resizeBalloonCanvas();
window.addEventListener("resize", resizeBalloonCanvas);

function createBalloon() {
  if (balloons.length >= 20) return;
  const x = Math.random() * balloonCanvas.width;
  const color = `hsl(${Math.random() * 360}, 70%, 80%)`;
  balloons.push({
    x,
    y: balloonCanvas.height + 30,
    radius: Math.random() * 10 + 20,
    speed: Math.random() * 1 + 0.5,
    color,
    alpha: 1,
    fading: false
  });
}

function drawBalloons() {
  bCtx.clearRect(0, 0, balloonCanvas.width, balloonCanvas.height);
  balloons.forEach((b, i) => {
    b.y -= b.speed;

    // Bắt đầu fade-out khi bay hết màn hình
    if (!b.fading && b.y + b.radius < 0) {
      b.fading = true;
    }

    // Fade mượt
    if (b.fading) {
      b.alpha -= 0.01;
    }

    if (b.alpha <= 0) {
      balloons.splice(i, 1);
      return;
    }

    // Dây uốn éo
    const waveLength = 20;
    const waveHeight = 4;
    const steps = 10;

    bCtx.beginPath();
    for (let j = 0; j <= steps; j++) {
      const progress = j / steps;
      const dx = Math.sin(progress * Math.PI * 2 + performance.now() / 500 + i) * waveHeight;
      const dy = progress * waveLength;
      const px = b.x + dx;
      const py = b.y + b.radius + dy;
      if (j === 0) bCtx.moveTo(px, py);
      else bCtx.lineTo(px, py);
    }

    bCtx.strokeStyle = `rgba(170, 170, 170, ${b.alpha})`;
    bCtx.lineWidth = 1;
    bCtx.stroke();

    // Bóng
    bCtx.beginPath();
    bCtx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
    bCtx.fillStyle = b.color.replace('70%', `${b.alpha * 100}%`);
    bCtx.fill();
  });
}

function animateBalloons() {
  if (Math.random() < 0.03) createBalloon();
  drawBalloons();
  requestAnimationFrame(animateBalloons);
}
animateBalloons();
