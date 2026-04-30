/**
 * background.js — Particle Network
 * Constelación de partículas que reacciona al movimiento del mouse
 */
(function () {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');

  let W, H, particles;
  const mouse = { x: -9999, y: -9999 };

  const CONFIG = {
    count:          75,
    connectDist:    130,
    mouseRadius:    200,
    mouseForce:     0.28,
    baseSpeed:      0.35,
    damping:        0.982,
    particleRadius: { min: 0.6, max: 2 },
    alphaRange:     { min: 0.15, max: 0.55 },
  };

  /* ─── Particle ─── */
  class Particle {
    constructor() { this.init(); }

    init() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.vx = (Math.random() - 0.5) * CONFIG.baseSpeed * 2;
      this.vy = (Math.random() - 0.5) * CONFIG.baseSpeed * 2;
      this.r  = CONFIG.particleRadius.min +
                Math.random() * (CONFIG.particleRadius.max - CONFIG.particleRadius.min);
      this.baseAlpha = CONFIG.alphaRange.min +
                       Math.random() * (CONFIG.alphaRange.max - CONFIG.alphaRange.min);
      this.alpha = this.baseAlpha;
    }

    update() {
      const dx   = mouse.x - this.x;
      const dy   = mouse.y - this.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 0 && dist < CONFIG.mouseRadius) {
        const force = (1 - dist / CONFIG.mouseRadius) * CONFIG.mouseForce;
        this.vx += (dx / dist) * force;
        this.vy += (dy / dist) * force;
        this.alpha = Math.min(this.baseAlpha * 2.5, CONFIG.alphaRange.max * 1.8);
      } else {
        this.alpha += (this.baseAlpha - this.alpha) * 0.05;
      }

      this.vx *= CONFIG.damping;
      this.vy *= CONFIG.damping;

      this.x += this.vx;
      this.y += this.vy;

      // Wrap edges
      if (this.x < -10) this.x = W + 10;
      if (this.x > W + 10) this.x = -10;
      if (this.y < -10) this.y = H + 10;
      if (this.y > H + 10) this.y = -10;
    }

    draw(color) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color}, ${this.alpha})`;
      ctx.fill();
    }
  }

  /* ─── Get theme color ─── */
  function getColor() {
    return document.documentElement.getAttribute('data-theme') === 'light'
      ? '0, 80, 180'
      : '0, 210, 255';
  }

  /* ─── Draw connections ─── */
  function drawConnections(color) {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < CONFIG.connectDist) {
          const alpha = (1 - dist / CONFIG.connectDist) * 0.18;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${color}, ${alpha})`;
          ctx.lineWidth   = 0.6;
          ctx.stroke();
        }
      }
    }
  }

  /* ─── Init ─── */
  function init() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    particles = Array.from({ length: CONFIG.count }, () => new Particle());
  }

  /* ─── Animate ─── */
  function animate() {
    ctx.clearRect(0, 0, W, H);

    const color = getColor();
    drawConnections(color);
    particles.forEach(p => {
      p.update();
      p.draw(color);
    });

    requestAnimationFrame(animate);
  }

  /* ─── Events ─── */
  window.addEventListener('resize', init, { passive: true });

  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    // Update cursor glow
    const glow = document.getElementById('cursor-glow');
    if (glow) {
      glow.style.left = e.clientX + 'px';
      glow.style.top  = e.clientY + 'px';
    }
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  /* ─── Boot ─── */
  init();
  animate();
})();
