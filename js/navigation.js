/**
 * navigation.js v1.1
 *
 * Comportamiento:
 *  - Hover nav item  → chispas continuas
 *  - Click (sección cerrada) → caída + explosión + sección se ensambla
 *  - Click (misma sección)   → nada (ya está abierta)
 *  - Click (diferente sección) → sección anterior se RECONSTRUYE (vuela hacia arriba),
 *                                 palito/cadena anterior se apaga,
 *                                 nueva sección cae + explota + ensambla
 *  - Chain activa            → palito se ilumina en dorado (sparks animados)
 *  - Botón ✕ / Escape        → cierra con reconstrucción
 */
(function () {
  'use strict';

  let activeSection    = null;   // ID de sección activa (string) o null
  let activeWrapper    = null;   // DOM wrapper del nav item activo
  let isAnimating      = false;
  let sparkIntervals   = new Map();

  /* ════════════════════════
     SPARKS
  ════════════════════════ */
  function spawnSpark(btn) {
    const rect  = btn.getBoundingClientRect();
    const spark = document.createElement('div');
    spark.className = 'spark';
    const ox   = rect.left + Math.random() * rect.width;
    const oy   = rect.top  + Math.random() * rect.height;
    const ang  = Math.random() * Math.PI * 2;
    const dist = 22 + Math.random() * 56;
    const sz   = 1.5 + Math.random() * 2.5;
    spark.style.cssText = `left:${ox}px;top:${oy}px;width:${sz}px;height:${sz}px;--sx:${Math.cos(ang)*dist}px;--sy:${Math.sin(ang)*dist}px;animation-duration:${0.35+Math.random()*0.3}s;animation-delay:${Math.random()*0.12}s;`;
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 700);
  }

  function startSparks(wrapper) {
    if (sparkIntervals.has(wrapper)) return;
    const btn = wrapper.querySelector('.nav-item');
    const id  = setInterval(() => { for (let i = 0; i < 3; i++) spawnSpark(btn); }, 90);
    sparkIntervals.set(wrapper, id);
  }

  function stopSparks(wrapper) {
    if (!sparkIntervals.has(wrapper)) return;
    clearInterval(sparkIntervals.get(wrapper));
    sparkIntervals.delete(wrapper);
  }

  /* ════════════════════════
     CHAIN GLOW
  ════════════════════════ */
  function setChainActive(wrapper, active) {
    if (!wrapper) return;
    wrapper.classList.toggle('section-active', active);
  }

  /* ════════════════════════
     RECONSTRUCT (close old section visually)
  ════════════════════════ */
  function reconstructSection(sectionId, onDone) {
    const panel = document.getElementById('section-' + sectionId);
    if (!panel || !panel.classList.contains('visible')) {
      onDone && onDone(); return;
    }

    panel.classList.remove('visible');
    panel.classList.add('reconstructing');

    // Flash the old nav chain as it "reassembles"
    if (activeWrapper) {
      const dot = activeWrapper.querySelector('.chain-dot');
      if (dot) {
        dot.style.animation = 'none';
        dot.style.boxShadow = '0 0 30px rgba(255,229,102,0.9), 0 0 60px rgba(255,229,102,0.5)';
        setTimeout(() => { dot.style.boxShadow = ''; dot.style.animation = ''; }, 350);
      }
    }

    panel.addEventListener('animationend', function handler() {
      panel.removeEventListener('animationend', handler);
      panel.classList.remove('reconstructing');
      onDone && onDone();
    }, { once: true });

    // Safety timeout
    setTimeout(() => { panel.classList.remove('reconstructing'); onDone && onDone(); }, 600);
  }

  /* ════════════════════════
     OPEN SECTION
  ════════════════════════ */
  function openSection(sectionId, wrapper) {
    const btn    = wrapper.querySelector('.nav-item');
    const rect   = btn.getBoundingClientRect();
    const theme  = document.documentElement.getAttribute('data-theme');
    const color  = theme === 'light' ? 'rgba(0,80,180,0.88)' : 'rgba(0,210,255,0.92)';

    isAnimating = true;

    // Hide hero
    document.getElementById('hero-text')?.classList.add('hidden');

    // Mark nav item falling
    btn.classList.add('falling');

    // Activate chain
    setChainActive(wrapper, true);

    setTimeout(() => {
      window.shatterEffect.trigger(rect, color, () => {
        btn.classList.remove('falling');

        const panel = document.getElementById('section-' + sectionId);
        if (panel) {
          panel.classList.remove('reconstructing');
          panel.classList.add('visible');
          panel.scrollTop = 0;
        }

        // Update state
        activeSection = sectionId;
        activeWrapper = wrapper;

        // Update nav active state (visual only, chain handles glow)
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        btn.classList.add('active');

        isAnimating = false;
      });
    }, 280);
  }

  /* ════════════════════════
     CLOSE SECTION
  ════════════════════════ */
  function closeSection(onDone) {
    if (!activeSection) { onDone && onDone(); return; }

    const prevSection = activeSection;
    const prevWrapper = activeWrapper;

    // Deactivate chain
    setChainActive(prevWrapper, false);
    prevWrapper?.querySelector('.nav-item')?.classList.remove('active');

    reconstructSection(prevSection, () => {
      activeSection = null;
      activeWrapper = null;

      // Show hero only if nothing will open next
      onDone && onDone();
    });
  }

  /* ════════════════════════
     NAVIGATE
  ════════════════════════ */
  function navigateTo(sectionId, wrapper) {
    if (isAnimating) return;

    // Same section clicked → ignore (already open)
    if (activeSection === sectionId) return;

    if (activeSection) {
      // Reconstruct previous, then open new
      const prevSection = activeSection;
      const prevWrapper = activeWrapper;

      activeSection = null;
      activeWrapper = null;

      setChainActive(prevWrapper, false);
      prevWrapper?.querySelector('.nav-item')?.classList.remove('active');

      isAnimating = true;

      reconstructSection(prevSection, () => {
        isAnimating = false;
        openSection(sectionId, wrapper);
      });
    } else {
      openSection(sectionId, wrapper);
    }
  }

  /* ════════════════════════
     BIND NAV ITEMS
  ════════════════════════ */
  document.querySelectorAll('.nav-item-wrapper').forEach(wrapper => {
    const btn = wrapper.querySelector('.nav-item');
    if (!btn) return;
    const sectionId = wrapper.dataset.section;

    wrapper.addEventListener('mouseenter', () => {
      if (!btn.classList.contains('falling')) startSparks(wrapper);
    });
    wrapper.addEventListener('mouseleave', () => stopSparks(wrapper));

    btn.addEventListener('click', () => {
      if (btn.classList.contains('falling') || isAnimating) return;
      navigateTo(sectionId, wrapper);
    });
  });

  /* ════════════════════════
     CLOSE BUTTONS
  ════════════════════════ */
  document.querySelectorAll('.close-section').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
      if (isAnimating) return;
      closeSection(() => {
        document.getElementById('hero-text')?.classList.remove('hidden');
      });
    });
  });

  /* ════════════════════════
     KEYBOARD
  ════════════════════════ */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && activeSection && !isAnimating) {
      closeSection(() => {
        document.getElementById('hero-text')?.classList.remove('hidden');
      });
    }
  });

  window.Navigation = { navigateTo, closeSection };
})();
