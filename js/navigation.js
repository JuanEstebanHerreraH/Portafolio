/**
 * navigation.js — Panel reveal
 * Click en nav → el panel aparece (fade + lift). El indicador se desliza bajo
 * el item activo. Cerrar con ✕, Escape, o volviendo a clickear el item activo.
 * Conserva el contrato: .section-active en el wrapper y .visible en el panel.
 */
(function () {
  'use strict';

  let active = null; // id de sección (sin prefijo) o null
  const nav = document.getElementById('main-nav');
  const indicator = nav ? nav.querySelector('.nav-indicator') : null;
  const wrappers = Array.from(document.querySelectorAll('.nav-item-wrapper'));

  function panelOf(section) { return document.getElementById('section-' + section); }
  function wrapperOf(section) { return document.querySelector('.nav-item-wrapper[data-section="' + section + '"]'); }

  function moveIndicator(section) {
    if (!indicator || !nav) return;
    const w = section ? wrapperOf(section) : null;
    if (!w) { indicator.style.opacity = '0'; return; }
    indicator.style.left = w.offsetLeft + 'px';
    indicator.style.width = w.offsetWidth + 'px';
    indicator.style.opacity = '1';
  }

  function open(section) {
    const panel = panelOf(section);
    if (!panel) return;

    // Cerrar el anterior
    if (active && active !== section) {
      const prev = panelOf(active);
      if (prev) { prev.classList.remove('visible'); prev.setAttribute('aria-hidden', 'true'); }
      const pw = wrapperOf(active);
      if (pw) pw.classList.remove('section-active');
    }

    active = section;
    document.body.classList.add('panel-open');
    panel.classList.add('visible');
    panel.setAttribute('aria-hidden', 'false');
    const w = wrapperOf(section);
    if (w) w.classList.add('section-active');
    moveIndicator(section);

    // Reiniciar el scroll del panel al abrir
    const scroll = panel.querySelector('.panel-scroll');
    if (scroll) scroll.scrollTop = 0;
  }

  function closeAll() {
    if (!active) return;
    const panel = panelOf(active);
    if (panel) { panel.classList.remove('visible'); panel.setAttribute('aria-hidden', 'true'); }
    const w = wrapperOf(active);
    if (w) w.classList.remove('section-active');
    active = null;
    document.body.classList.remove('panel-open');
    moveIndicator(null);
  }

  function toggle(section) {
    if (active === section) closeAll();
    else open(section);
  }

  // Nav desktop
  wrappers.forEach(w => {
    const section = w.dataset.section;
    const btn = w.querySelector('.nav-item');
    if (btn) btn.addEventListener('click', () => toggle(section));
  });

  // Botones de cierre
  document.querySelectorAll('.close-section').forEach(btn => {
    btn.addEventListener('click', closeAll);
  });

  // Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const modal = document.getElementById('lang-modal');
      if (modal && !modal.hidden) return; // el modal maneja su propio escape
      closeAll();
    }
  });

  // Reposicionar indicador al cambiar tamaño / idioma (cambia el ancho del texto)
  window.addEventListener('resize', () => { if (active) moveIndicator(active); }, { passive: true });
  const langObserver = new MutationObserver(() => { if (active) moveIndicator(active); });
  document.querySelectorAll('.nav-item').forEach(n => langObserver.observe(n, { childList: true, characterData: true, subtree: true }));

  // API mínima para el drawer móvil (usada por app.js)
  window.__nav = { open, closeAll, toggle };
})();
