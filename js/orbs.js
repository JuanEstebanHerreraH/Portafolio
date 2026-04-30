/**
 * orbs.js — Morphing Orbs Background
 *
 * Concepto: Orbes de plasma que flotan en el espacio con física real.
 * - Cada orbe tiene su propia órbita elíptica + oscilación
 * - El mouse crea una onda de repulsión que deforma sus trayectorias
 * - Al mover el mouse rápido se generan "shockwaves" visibles
 * - Se adapta a modo claro/oscuro
 * - Visible en hero al 100%; se comprime a los márgenes cuando hay sección abierta
 */
(function () {
  'use strict';

  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, dpr;
  let orbs = [];
  let shockwaves = [];
  const mouse = { x: -9999, y: -9999, vx: 0, vy: 0, px: -9999, py: -9999 };
  let heroVisible = true;

  /* ── Config ── */
  const CFG = {
    orbCount:    7,
    minR:        55,
    maxR:        120,
    baseSpeed:   0.35,
    mouseRepel:  180,   // radius of mouse repulsion
    repelStr:    0.06,
    waveDecay:   0.015,
    waveSpeed:   4,
  };

  /* ── Colour palettes ── */
  function palette() {
    const dark = document.documentElement.getAttribute('data-theme') !== 'light';
    if (dark) return [
      ['rgba(0,180,255,', 'rgba(0,80,200,'],
      ['rgba(120,0,255,', 'rgba(60,0,160,'],
      ['rgba(0,220,160,', 'rgba(0,120,80,'],
      ['rgba(200,50,255,', 'rgba(100,0,180,'],
      ['rgba(0,140,255,', 'rgba(0,60,180,'],
      ['rgba(80,200,255,', 'rgba(20,80,180,'],
      ['rgba(140,80,255,', 'rgba(60,20,180,'],
    ];
    return [
      ['rgba(0,100,200,', 'rgba(0,60,160,'],
      ['rgba(80,0,200,',  'rgba(40,0,140,'],
      ['rgba(0,160,120,', 'rgba(0,80,60,'],
      ['rgba(160,30,220,','rgba(80,0,160,'],
      ['rgba(0,100,220,', 'rgba(0,40,140,'],
      ['rgba(40,140,220,','rgba(10,60,140,'],
      ['rgba(100,60,200,','rgba(40,10,140,'],
    ];
  }

  /* ── Orb class ── */
  class Orb {
    constructor(i) {
      this.i = i;
      this.reset();
    }
    reset() {
      const colors = palette();
      const c = colors[this.i % colors.length];
      this.c1 = c[0];
      this.c2 = c[1];
      // Orbital parameters
      this.cx   = W * (0.15 + Math.random() * 0.7);  // orbital center
      this.cy   = H * (0.15 + Math.random() * 0.7);
      this.rx   = W  * (0.12 + Math.random() * 0.18); // orbit semi-axis x
      this.ry   = H  * (0.08 + Math.random() * 0.14);
      this.ang  = Math.random() * Math.PI * 2;         // current angle on orbit
      this.spd  = (0.003 + Math.random() * 0.004) * (Math.random() < 0.5 ? 1 : -1);
      this.r    = CFG.minR + Math.random() * (CFG.maxR - CFG.minR);
      // Blob deformation
      this.blobPhase = Math.random() * Math.PI * 2;
      this.blobSpd   = 0.02 + Math.random() * 0.03;
      // Position
      this.x = this.cx + Math.cos(this.ang) * this.rx;
      this.y = this.cy + Math.sin(this.ang) * this.ry;
      // Velocity for repulsion physics
      this.vx = 0; this.vy = 0;
      this.baseAlpha = heroVisible ? (0.12 + Math.random() * 0.10) : (0.06 + Math.random() * 0.05);
      this.alpha = this.baseAlpha;
    }

    update(t) {
      // Advance angle on orbit
      this.ang += this.spd;
      const orbitX = this.cx + Math.cos(this.ang) * this.rx;
      const orbitY = this.cy + Math.sin(this.ang) * this.ry;

      // Mouse repulsion
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const d  = Math.hypot(dx, dy);
      if (d > 0 && d < CFG.mouseRepel) {
        const f = (1 - d / CFG.mouseRepel) * CFG.repelStr;
        this.vx += (dx / d) * f * 8;
        this.vy += (dy / d) * f * 8;
      }

      // Spring back to orbit
      this.vx += (orbitX - this.x) * 0.04;
      this.vy += (orbitY - this.y) * 0.04;
      this.vx *= 0.88;
      this.vy *= 0.88;
      this.x += this.vx;
      this.y += this.vy;

      // Alpha
      const target = this.baseAlpha * (heroVisible ? 1 : 0.45);
      this.alpha += (target - this.alpha) * 0.05;

      // Blob wobble phase
      this.blobPhase += this.blobSpd;
    }

    draw() {
      const t = this.blobPhase;
      // Draw a wobbly gradient blob
      ctx.save();
      ctx.globalAlpha = this.alpha;

      // Wobbly radius
      const pts = 8;
      ctx.beginPath();
      for (let i = 0; i <= pts; i++) {
        const angle = (i / pts) * Math.PI * 2;
        const wobble = 1 + 0.18 * Math.sin(angle * 3 + t) + 0.10 * Math.cos(angle * 2 - t * 0.7);
        const r = this.r * wobble;
        const px = this.x + Math.cos(angle) * r;
        const py = this.y + Math.sin(angle) * r * 0.75;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();

      // Radial gradient fill
      const g = ctx.createRadialGradient(
        this.x - this.r * 0.2, this.y - this.r * 0.2, 0,
        this.x, this.y, this.r * 1.2
      );
      g.addColorStop(0,   this.c1 + '1)');
      g.addColorStop(0.5, this.c1 + '0.5)');
      g.addColorStop(1,   this.c2 + '0)');
      ctx.fillStyle = g;
      ctx.fill();
      ctx.restore();
    }

    recolor() {
      const colors = palette();
      const c = colors[this.i % colors.length];
      this.c1 = c[0]; this.c2 = c[1];
    }
  }

  /* ── Shockwave class ── */
  class Shockwave {
    constructor(x, y, strength) {
      this.x = x; this.y = y;
      this.r = 10;
      this.maxR = 120 + strength * 80;
      this.alpha = 0.5;
      this.alive = true;
    }
    update() {
      this.r     += CFG.waveSpeed + (this.r / this.maxR) * 3;
      this.alpha -= CFG.waveDecay;
      if (this.r >= this.maxR || this.alpha <= 0) this.alive = false;
    }
    draw() {
      const dark = document.documentElement.getAttribute('data-theme') !== 'light';
      const color = dark ? `rgba(0,200,255,${this.alpha * 0.4})` : `rgba(0,80,200,${this.alpha * 0.3})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }

  /* ── Init ── */
  function init() {
    dpr = window.devicePixelRatio || 1;
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width  = W + 'px';
    canvas.style.height = H + 'px';
    ctx.scale(dpr, dpr);
    orbs = Array.from({ length: CFG.orbCount }, (_, i) => new Orb(i));
    shockwaves = [];
  }

  /* ── Mouse tracking + shockwave spawn ── */
  let lastShock = 0;
  window.addEventListener('mousemove', e => {
    const now = performance.now();
    mouse.vx = e.clientX - mouse.px;
    mouse.vy = e.clientY - mouse.py;
    const speed = Math.hypot(mouse.vx, mouse.vy);

    // Spawn shockwave on fast mouse movement
    if (speed > 22 && now - lastShock > 180) {
      shockwaves.push(new Shockwave(e.clientX, e.clientY, Math.min(speed / 60, 1)));
      lastShock = now;
    }
    mouse.px = mouse.x; mouse.py = mouse.y;
    mouse.x = e.clientX; mouse.y = e.clientY;
  }, { passive: true });

  window.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });

  // Touch support
  window.addEventListener('touchmove', e => {
    const t = e.touches[0];
    mouse.x = t.clientX; mouse.y = t.clientY;
  }, { passive: true });

  window.addEventListener('resize', () => {
    init();
  }, { passive: true });

  /* ── Section visibility: compress orbs when panel open ── */
  const heroEl = document.getElementById('hero-text');
  if (heroEl) {
    new MutationObserver(() => {
      heroVisible = !heroEl.classList.contains('hidden');
      // Rebase alpha targets
      orbs.forEach(o => {
        o.baseAlpha = heroVisible ? (0.12 + Math.random() * 0.10) : (0.05 + Math.random() * 0.04);
      });
    }).observe(heroEl, { attributes: true, attributeFilter: ['class'] });
  }

  // Theme change: recolor orbs
  new MutationObserver(() => {
    orbs.forEach(o => o.recolor());
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  /* ── Animation loop ── */
  let frame = 0;
  function animate() {
    ctx.clearRect(0, 0, W, H);
    frame++;

    // Draw orbs (back to front by radius)
    orbs.sort((a, b) => b.r - a.r);
    orbs.forEach(o => { o.update(frame); o.draw(); });

    // Draw shockwaves
    shockwaves = shockwaves.filter(s => {
      s.update(); s.draw(); return s.alive;
    });

    requestAnimationFrame(animate);
  }

  init();
  animate();
})();
