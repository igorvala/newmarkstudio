const hero = document.getElementById('hero');
const card = document.getElementById('tilt-card');
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let dots = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  dots = Array.from({ length: Math.min(170, Math.floor(window.innerWidth / 10)) }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    z: Math.random() * 1 + 0.2,
    radius: Math.random() * 1.4 + 0.3,
  }));
}

function renderStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  dots.forEach((dot) => {
    dot.y += dot.z;
    if (dot.y > canvas.height) {
      dot.y = 0;
      dot.x = Math.random() * canvas.width;
    }

    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(151, 206, 255, ${0.15 + dot.z / 1.3})`;
    ctx.fill();
  });

  requestAnimationFrame(renderStars);
}

hero.addEventListener('pointermove', (event) => {
  const { left, top, width, height } = hero.getBoundingClientRect();
  const x = (event.clientX - left) / width - 0.5;
  const y = (event.clientY - top) / height - 0.5;

  const rotateX = y * -8;
  const rotateY = x * 10;

  card.style.transform = `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(12px)`;

  hero.style.backgroundPosition = `${50 + x * 2}% ${50 + y * 2}%`;
});

hero.addEventListener('pointerleave', () => {
  card.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg)';
});

window.addEventListener('resize', resizeCanvas);

resizeCanvas();
renderStars();
