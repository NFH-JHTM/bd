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
  if (balloons.length >= 20) return; // ⚠️ giảm max bóng
  const x = Math.random() * balloonCanvas.width;
  const color = `hsl(${Math.random() * 360}, 70%, 80%)`;
  balloons.push({
    x,
    y: balloonCanvas.height + 30,
    radius: Math.random() * 10 + 20,
    speed: Math.random() * 1 + 0.5,
    color,
    life: 8000,
    alpha: 1
  });
}

function drawBalloons() {
  bCtx.clearRect(0, 0, balloonCanvas.width, balloonCanvas.height);
  balloons.forEach((b, i) => {
    b.y -= b.speed;
    b.life -= 16;

    // fade-out dần
    if (b.life < 1500) {
      b.alpha = b.life / 1500; // từ 1 → 0
    }

    if (b.life <= 0 || b.y + b.radius < 0) {
      balloons.splice(i, 1);
      return;
    }

    // Dây
    bCtx.beginPath();
    bCtx.moveTo(b.x, b.y + b.radius);
    bCtx.lineTo(b.x, b.y + b.radius + 20);
    bCtx.strokeStyle = `rgba(170, 170, 170, ${b.alpha})`;
    bCtx.stroke();

    // Bóng
    bCtx.beginPath();
    bCtx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
    bCtx.fillStyle = b.color.replace('70%', `${b.alpha * 100}%`);
    bCtx.fill();
  });
}

function animateBalloons() {
  if (Math.random() < 0.03) createBalloon(); // tần suất thấp hơn
  drawBalloons();
  requestAnimationFrame(animateBalloons);
}
animateBalloons();
