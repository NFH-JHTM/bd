const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function createFirework() {
  const x = Math.random() * canvas.width;
  const y = canvas.height;
  const color = `hsl(${Math.random() * 360}, 100%, 70%)`;

  for (let i = 0; i < 50; i++) {
    particles.push({
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

function updateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= 0.015;
    if (p.alpha <= 0) particles.splice(i, 1);

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = p.color.replace('70%', `${p.alpha * 100}%`);
    ctx.fill();
  });
}

function animate() {
  if (Math.random() < 0.03) createFirework(); // tốc độ bắn
  updateParticles();
  requestAnimationFrame(animate);
}
animate();
