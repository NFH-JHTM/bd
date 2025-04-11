const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let stars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function createStar() {
  if (stars.length >= 50) return; // max stars
  const star = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 1.5 + 0.5,
    opacity: Math.random() * 0.5 + 0.5,
    life: Math.random() * 3000 + 2000
  };
  stars.push(star);
  setTimeout(() => {
    stars = stars.filter(s => s !== star);
  }, star.life);
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${s.opacity})`;
    ctx.fill();
  });
}

function animate() {
  createStar();
  drawStars();
  requestAnimationFrame(animate);
}
animate();
