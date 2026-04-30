/**
 * shatter.js — Fragment Explosion Engine
 * Cuando el usuario hace click en un nav item:
 *   1. El item "cae"
 *   2. Se rompe en fragmentos que explotan hacia afuera
 *   3. La sección objetivo aparece con animación de ensamblaje
 */
class ShatterEffect {
  constructor() {
    this.canvas     = document.getElementById('shatter-canvas');
    this.ctx        = this.canvas.getContext('2d');
    this.fragments  = [];
    this.running    = false;
    this.raf        = null;
    this._resize();
    window.addEventListener('resize', () => this._resize(), { passive: true });
  }

  _resize() {
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  /**
   * Trigger shatter from a rect position
   * @param {DOMRect} rect  - bounding rect of the element
   * @param {string}  color - CSS color string
   * @param {Function} onComplete - callback when done
   */
  trigger(rect, color, onComplete) {
    if (this.running) {
      cancelAnimationFrame(this.raf);
    }

    this.running = true;
    this.canvas.style.opacity = '1';
    this.fragments = [];

    const x = rect.left;
    const y = rect.top;
    const w = rect.width;
    const h = rect.height;

    const cx = x + w / 2;  // center X
    const cy = y + h / 2;  // center Y

    // Build Voronoi-approximated fragments using a jittered grid
    const COLS = 10;
    const ROWS = 7;
    const fw   = w / COLS;
    const fh   = h / ROWS;

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        // Fragment center with jitter
        const fcx = x + c * fw + fw * 0.5 + (Math.random() - 0.5) * fw * 0.5;
        const fcy = y + r * fh + fh * 0.5 + (Math.random() - 0.5) * fh * 0.5;

        // Explosion direction from center
        const angle     = Math.atan2(fcy - cy, fcx - cx) + (Math.random() - 0.5) * 1.2;
        const speed     = 4 + Math.random() * 14;
        const rotSpeed  = (Math.random() - 0.5) * 0.25;
        const fragW     = fw * (0.7 + Math.random() * 0.6);
        const fragH     = fh * (0.7 + Math.random() * 0.6);

        this.fragments.push({
          x:          fcx,
          y:          fcy,
          vx:         Math.cos(angle) * speed,
          vy:         Math.sin(angle) * speed - 2,   // slight upward bias
          rotation:   Math.random() * Math.PI * 2,
          rotSpeed:   rotSpeed,
          w:          fragW,
          h:          fragH,
          alpha:      1,
          color:      color,
          glow:       true,
        });
      }
    }

    // Add some extra small spark fragments
    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 6 + Math.random() * 16;
      this.fragments.push({
        x:          cx + (Math.random() - 0.5) * w,
        y:          cy + (Math.random() - 0.5) * h,
        vx:         Math.cos(angle) * speed,
        vy:         Math.sin(angle) * speed - 3,
        rotation:   0,
        rotSpeed:   (Math.random() - 0.5) * 0.4,
        w:          1 + Math.random() * 3,
        h:          1 + Math.random() * 3,
        alpha:      1,
        color:      '#ffe566',
        glow:       true,
        spark:      true,
      });
    }

    this._animate(onComplete);
  }

  _animate(onComplete) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    let anyAlive = false;

    for (const f of this.fragments) {
      if (f.alpha <= 0) continue;
      anyAlive = true;

      // Physics
      f.vx      *= 0.965;
      f.vy      *= 0.965;
      f.vy      += 0.35;        // gravity
      f.x       += f.vx;
      f.y       += f.vy;
      f.rotation += f.rotSpeed;
      f.alpha   -= f.spark ? 0.045 : 0.022;

      // Draw
      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, f.alpha);
      this.ctx.translate(f.x, f.y);
      this.ctx.rotate(f.rotation);

      if (f.glow) {
        this.ctx.shadowColor = f.color;
        this.ctx.shadowBlur  = f.spark ? 14 : 10;
      }

      this.ctx.fillStyle   = f.color;
      this.ctx.strokeStyle = f.color;
      this.ctx.lineWidth   = 0.5;

      if (f.spark) {
        // Sparks: circles
        this.ctx.beginPath();
        this.ctx.arc(0, 0, f.w, 0, Math.PI * 2);
        this.ctx.fill();
      } else {
        // Fragments: irregular quadrilaterals
        const jx = (Math.random() - 0.5) * 3;
        const jy = (Math.random() - 0.5) * 3;
        this.ctx.beginPath();
        this.ctx.moveTo(-f.w / 2 + jx, -f.h / 2);
        this.ctx.lineTo( f.w / 2,      -f.h / 2 + jy);
        this.ctx.lineTo( f.w / 2 + jx,  f.h / 2);
        this.ctx.lineTo(-f.w / 2,       f.h / 2 + jy);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
      }

      this.ctx.restore();
    }

    if (!anyAlive) {
      this._finish(onComplete);
      return;
    }

    this.raf = requestAnimationFrame(() => this._animate(onComplete));
  }

  _finish(onComplete) {
    this.running = false;
    this.canvas.style.opacity = '0';
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (typeof onComplete === 'function') onComplete();
  }
}

// Global instance
window.shatterEffect = new ShatterEffect();
