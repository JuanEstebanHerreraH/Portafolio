/**
 * background.js — Signal Field
 * Un único lienzo. Una malla de trazos ("señal") que se orientan según un
 * campo de flujo lento y GIRAN alrededor del cursor, iluminándose al acercarse.
 * Paquetes de datos ámbar cruzan la malla de vez en cuando (guiño a redes).
 * Reemplaza por completo a background/orbs/shatter.
 */
(function () {
  'use strict';
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let W = 0, H = 0, dpr = 1;
  let cols = 0, rows = 0, step = 46;
  const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
  let t = 0;
  let packets = [];

  const CFG = {
    baseStep: 46,       // separación de la malla (px)
    len: 13,            // largo base de cada trazo
    influence: 210,     // radio de acción del cursor
    swirl: 1.15,        // fuerza del giro alrededor del cursor
    flowScale: 0.0016,  // escala espacial del campo de flujo
    flowSpeed: 0.00022, // velocidad de rotación del campo
  };

  function colors() {
    const light = document.documentElement.getAttribute('data-theme') === 'light';
    // En claro subimos alfa y grosor para que la malla se aprecie sobre fondo pálido
    return light
      ? { base: '43,84,214', hot: '214,116,31', packet: '214,116,31', baseA: 0.22, hotA: 0.95, lw: 1.2 }
      : { base: '91,134,255', hot: '120,190,255', packet: '255,157,84', baseA: 0.12, hotA: 0.90, lw: 1.0 };
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // Malla más densa en pantallas grandes, más suelta en chicas
    step = W < 640 ? 60 : CFG.baseStep;
    cols = Math.ceil(W / step) + 1;
    rows = Math.ceil(H / step) + 1;
  }

  // Ángulo base del campo de flujo (ruido barato y suave)
  function flowAngle(x, y) {
    return Math.sin(x * CFG.flowScale + t) * 1.4
         + Math.cos(y * CFG.flowScale - t * 0.8) * 1.4
         + Math.sin((x + y) * CFG.flowScale * 0.6 + t * 0.5);
  }

  function spawnPacket() {
    const horizontal = Math.random() < 0.5;
    if (horizontal) {
      const row = Math.floor(Math.random() * rows) * step;
      const dir = Math.random() < 0.5 ? 1 : -1;
      packets.push({ x: dir > 0 ? -20 : W + 20, y: row, vx: (2.2 + Math.random() * 2.2) * dir, vy: 0, life: 1 });
    } else {
      const col = Math.floor(Math.random() * cols) * step;
      const dir = Math.random() < 0.5 ? 1 : -1;
      packets.push({ x: col, y: dir > 0 ? -20 : H + 20, vx: 0, vy: (2.2 + Math.random() * 2.2) * dir, life: 1 });
    }
    if (packets.length > 6) packets.shift();
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const c = colors();
    t += CFG.flowSpeed * 16;

    // Suavizado del cursor
    mouse.x += (mouse.tx - mouse.x) * 0.12;
    mouse.y += (mouse.ty - mouse.y) * 0.12;

    ctx.lineCap = 'round';

    for (let gy = 0; gy < rows; gy++) {
      for (let gx = 0; gx < cols; gx++) {
        const px = gx * step;
        const py = gy * step;

        let ang = flowAngle(px, py);
        let alpha = c.baseA;
        let len = CFG.len;
        let col = c.base;

        // Influencia del cursor: giro tangencial + brillo
        const dx = px - mouse.x;
        const dy = py - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < CFG.influence) {
          const f = 1 - dist / CFG.influence;        // 0..1
          const tangential = Math.atan2(dy, dx) + Math.PI / 2; // perpendicular = swirl
          // Mezcla del ángulo del campo hacia el giro
          ang = ang * (1 - f * CFG.swirl) + tangential * (f * CFG.swirl);
          alpha = c.baseA + (c.hotA - c.baseA) * (f * f);
          len = CFG.len + f * 14;
          if (f > 0.55) col = c.hot;
        }

        const hx = Math.cos(ang) * len * 0.5;
        const hy = Math.sin(ang) * len * 0.5;
        ctx.beginPath();
        ctx.moveTo(px - hx, py - hy);
        ctx.lineTo(px + hx, py + hy);
        ctx.strokeStyle = `rgba(${col},${alpha})`;
        ctx.lineWidth = alpha > 0.4 ? c.lw + 0.6 : c.lw;
        ctx.stroke();
      }
    }

    // Paquetes de datos
    for (const p of packets) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < -40 || p.x > W + 40 || p.y < -40 || p.y > H + 40) p.life = 0;
      // estela
      const tailX = p.x - p.vx * 6, tailY = p.y - p.vy * 6;
      const grad = ctx.createLinearGradient(tailX, tailY, p.x, p.y);
      grad.addColorStop(0, `rgba(${c.packet},0)`);
      grad.addColorStop(1, `rgba(${c.packet},0.85)`);
      ctx.beginPath();
      ctx.moveTo(tailX, tailY); ctx.lineTo(p.x, p.y);
      ctx.strokeStyle = grad; ctx.lineWidth = 2; ctx.stroke();
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${c.packet},0.95)`; ctx.fill();
    }
    packets = packets.filter(p => p.life > 0);

    requestAnimationFrame(draw);
  }

  /* Eventos */
  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('mousemove', e => {
    mouse.tx = e.clientX; mouse.ty = e.clientY;
    document.body.classList.add('has-pointer');
  }, { passive: true });
  window.addEventListener('mouseleave', () => { mouse.tx = -9999; mouse.ty = -9999; });

  resize();
  if (reduced) {
    // Render estático (sin animación continua)
    t = 1.2; draw();
  } else {
    if (window.matchMedia('(pointer: fine)').matches) {
      setInterval(spawnPacket, 2600);
    }
    draw();
  }
})();
