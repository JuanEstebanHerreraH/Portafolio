/**
 * app.js — Signal Field Edition
 * Render de contenido + interacciones (spotlight/tilt), hero rotator y contadores.
 */
(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;

  /* ════ THEME ════ */
  function applyTheme(t) { root.setAttribute('data-theme', t); localStorage.setItem('portfolio-theme', t); }
  applyTheme(localStorage.getItem('portfolio-theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'));
  document.getElementById('theme-toggle')?.addEventListener('click', () =>
    applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));

  /* ════ FOOTER YEAR ════ */
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ════ HELPERS ════ */
  const esc = s => typeof s === 'string'
    ? s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;') : '';

  const LANG_COLORS = {
    python:'#3572A5', javascript:'#f1e05a', js:'#f1e05a',
    typescript:'#3178c6', ts:'#3178c6', dart:'#00B4AB',
    flutter:'#54c5f8', rust:'#dea584', go:'#00ADD8',
    html:'#e34c26', css:'#563d7c', shell:'#89e051', bash:'#89e051', powershell:'#5391FE',
    java:'#f89820', 'c++':'#00599c', csharp:'#239120', 'c#':'#239120',
    svelte:'#ff3e00', react:'#61dafb', 'next.js':'#888888', vite:'#7c5cbf', tailwind:'#38bdf8',
  };
  const langColor = lang => LANG_COLORS[(lang||'').toLowerCase()] || 'var(--signal)';
  function isDark(hex) {
    if (!hex || !hex.startsWith('#')) return true;
    const r=parseInt(hex.slice(1,3),16), g=parseInt(hex.slice(3,5),16), b=parseInt(hex.slice(5,7),16);
    return (r*299+g*587+b*114)/1000 < 140;
  }

  /* Años transcurridos desde career_start. Se recalcula en cada carga:
     no hay ningún número de experiencia escrito a mano en el código. */
  function yearsSince(iso) {
    if (!iso) return 0;
    const start = new Date(iso);
    if (isNaN(start)) return 0;
    return Math.max(0, (Date.now() - start.getTime()) / (365.25 * 24 * 3600 * 1000));
  }

  function animCount(el, target, decimals) {
    const start = performance.now();
    (function step(now) {
      const p = Math.min((now-start)/1000, 1);
      const e = p===1 ? 1 : 1-Math.pow(2,-10*p);
      const v = target*e;
      el.textContent = decimals ? v.toFixed(decimals) : Math.round(v);
      if (p<1) requestAnimationFrame(step);
    })(start);
  }


  /* ════ ICONOS ════
     SVG monocromo en lugar de emoji: hereda currentColor, respeta la paleta
     y se ve igual en Windows, macOS y Android. */
  const ICON = {
    signal:  '<path d="M4 16a10 10 0 0116 0M7.5 13.5a6 6 0 019 0"/><circle cx="12" cy="19" r="1.6"/>',
    convert: '<path d="M4 8h12l-3-3M20 16H8l3 3"/>',
    audio:   '<path d="M4 10v4M8 7v10M12 4v16M16 8v8M20 11v2"/>',
    palette: '<path d="M12 3a9 9 0 100 18c1.1 0 1.7-.9 1.4-1.8-.3-.9.3-1.8 1.3-1.8h1.6A4.7 4.7 0 0021 12.7C21 7.3 17 3 12 3z"/><circle cx="7.5" cy="12" r="1"/><circle cx="10" cy="8" r="1"/><circle cx="15" cy="8.5" r="1"/>',
    shield:  '<path d="M12 3l7 3v6c0 4.2-2.9 7.6-7 9-4.1-1.4-7-4.8-7-9V6z"/><path d="M9.5 12l1.8 1.8L15 10"/>',
    network: '<rect x="3" y="4" width="6" height="5" rx="1"/><rect x="15" y="4" width="6" height="5" rx="1"/><rect x="9" y="15" width="6" height="5" rx="1"/><path d="M6 9v3h12V9M12 12v3"/>',
    radar:   '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.5"/><path d="M12 12l6-4"/>',
    coffee:  '<path d="M4 8h13v6a5 5 0 01-5 5H9a5 5 0 01-5-5z"/><path d="M17 10h1.6a2.4 2.4 0 010 4.8H17"/><path d="M8 3v2M12 3v2"/>',
    vault:   '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="12" cy="12" r="4"/><path d="M12 8v-1M12 17v-1M16 12h1M7 12h1"/>',
    key:     '<circle cx="8" cy="12" r="4"/><path d="M12 12h9M18 12v3M15.5 12v2.4"/>',
    folder:  '<path d="M3 7a2 2 0 012-2h4l2 2.5h8a2 2 0 012 2V17a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>',
    cart:    '<circle cx="9.5" cy="19" r="1.4"/><circle cx="17" cy="19" r="1.4"/><path d="M3 4h2.2l2.4 11h11L21 7H6"/>',
    game:    '<rect x="2.5" y="7" width="19" height="10" rx="4"/><path d="M7 10v4M5 12h4M15.5 11.5h.01M18 13.5h.01"/>',
    app:     '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    download:'<path d="M12 4v11M7.5 11l4.5 4.5L16.5 11M5 19h14"/>',
  };
  function icon(name, cls) {
    const body = ICON[name] || ICON.app;
    return `<svg class="${cls||'ico'}" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
  }

  /* ════ CAPTURA CON RESPALDO ════
     Si assets/shots/<slug>.png no existe, dibujamos un patrón de señal con el
     color del proyecto. Nunca se ve una imagen rota. */
  function shotHtml(p) {
    const seed = (p.slug || p.name).split('').reduce((a,c)=>a+c.charCodeAt(0),0);
    const bars = Array.from({length: 22}, (_, i) => {
      const h = 8 + ((seed * (i+3)) % 46);
      return `<rect x="${i*4.4}" y="${56-h}" width="2.2" height="${h}" rx="1"/>`;
    }).join('');
    const fallback = `<svg class="shot-fallback" viewBox="0 0 96 56" preserveAspectRatio="none" aria-hidden="true">${bars}</svg>`;
    const img = p.shot ? `<img class="shot-img" src="${esc(p.shot)}" alt="Captura de ${esc(p.name)}" loading="lazy"
        onload="this.parentNode.classList.add('has-shot')" onerror="this.remove()">` : '';
    return `<div class="proj-shot">${fallback}${img}</div>`;
  }

  /* ════ CARD INTERACTION: spotlight + tilt ════ */
  function bindCardFX(selector) {
    document.querySelectorAll(selector).forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const mx = (e.clientX - r.left) / r.width;
        const my = (e.clientY - r.top) / r.height;
        card.style.setProperty('--mx', (mx*100).toFixed(1) + '%');
        card.style.setProperty('--my', (my*100).toFixed(1) + '%');
        if (!reduced) {
          const rx = (0.5 - my) * 6;   // grados
          const ry = (mx - 0.5) * 8;
          card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-3px)`;
        }
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }

  /* Escalonado de entrada */
  function stagger(container) {
    if (!container) return;
    [...container.children].forEach((el, i) => { el.style.animationDelay = (Math.min(i, 14) * 0.04) + 's'; });
  }

  /* ════ DROPDOWN DE FILTRO (reutilizable) ════ */
  function makeDropdown(mount, { label, options, value, onSelect }) {
    if (!mount) return;
    mount.innerHTML = '';
    let current = value;
    const btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'fd-btn';
    const menu = document.createElement('div');
    menu.className = 'fd-menu';

    const optOf = v => options.find(o => o.value === v);
    function renderBtn() {
      const o = optOf(current) || { label: current, color: null };
      const dot = o.color ? `<span class="fd-btn-dot" style="background:${o.color}"></span>` : '';
      btn.innerHTML = `<span class="fd-btn-label">${esc(label)}:</span>${dot}<span class="fd-btn-value">${esc(o.label)}</span><span class="fd-caret">▾</span>`;
    }
    function renderMenu() {
      menu.innerHTML = options.map(o => {
        const dot = `<span class="fd-opt-dot" style="background:${o.color || 'var(--text-mute)'}"></span>`;
        const count = (o.count != null) ? `<span class="fd-opt-count">${o.count}</span>` : '';
        return `<button type="button" class="fd-opt${o.value === current ? ' active' : ''}" data-value="${esc(o.value)}">${dot}<span class="fd-opt-label">${esc(o.label)}</span>${count}</button>`;
      }).join('');
      menu.querySelectorAll('.fd-opt').forEach(b => b.addEventListener('click', () => {
        current = b.dataset.value; renderBtn(); renderMenu(); close(); onSelect(current);
      }));
    }
    const open  = () => { btn.classList.add('open'); menu.classList.add('open'); };
    const close = () => { btn.classList.remove('open'); menu.classList.remove('open'); };
    btn.addEventListener('click', e => { e.stopPropagation(); menu.classList.contains('open') ? close() : open(); });
    document.addEventListener('click', e => { if (!mount.contains(e.target)) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

    renderBtn(); renderMenu();
    mount.appendChild(btn); mount.appendChild(menu);
  }

  /* ════ HERO ROTATOR ════ */
  (function heroRotator() {
    const el = document.getElementById('hero-rotator-word');
    if (!el) return;
    const words = ['software que se usa','apps offline-first','herramientas de red','sistemas full-stack','productos reales'];
    if (reduced) { el.textContent = words[0]; return; }
    let wi = 0, ci = 0, deleting = false;
    function tick() {
      const word = words[wi];
      if (!deleting) {
        el.textContent = word.slice(0, ++ci);
        if (ci === word.length) { deleting = true; return setTimeout(tick, 1600); }
      } else {
        el.textContent = word.slice(0, --ci);
        if (ci === 0) { deleting = false; wi = (wi+1) % words.length; }
      }
      setTimeout(tick, deleting ? 34 : 68);
    }
    setTimeout(tick, 1200);
  })();

  /* ════ ABOUT STAT COUNTERS ════ */
  const aboutPanel = document.getElementById('section-about');
  if (aboutPanel) new MutationObserver(() => {
    if (aboutPanel.classList.contains('visible')) {
      ['stat-projects','stat-certs'].forEach(id => {
        const el = document.getElementById(id);
        if (el && el.dataset.done !== '1') { el.dataset.done='1'; animCount(el, parseInt(el.dataset.target||0)); }
      });
      const yearsEl = document.getElementById('stat-years');
      if (yearsEl && yearsEl.dataset.done !== '1') {
        yearsEl.dataset.done = '1';
        animCount(yearsEl, parseFloat(yearsEl.dataset.target || 0), 1);
      }
    }
  }).observe(aboutPanel, { attributes:true, attributeFilter:['class'] });

  /* ════ PROJECT FILTER ════ */
  let activeProjLang = 'all', projSearch = '';
  function buildProjFilter(list) {
    const langs = list.map(p => p.language).filter(Boolean);
    const counts = {}; langs.forEach(l => counts[l] = (counts[l]||0)+1);
    const opts = [{ label: 'Todos', value: 'all', color: null, count: list.length }]
      .concat([...new Set(langs)].sort().map(l => ({ label: l, value: l, color: langColor(l), count: counts[l] })));
    makeDropdown(document.getElementById('proj-filter'), { label: 'Lenguaje', options: opts, value: 'all', onSelect: filterProjects });
  }
  function filterProjects(lang) { activeProjLang = lang; applyProjVisibility(); }
  function applyProjVisibility() {
    let visible = 0, total = 0;
    document.querySelectorAll('#projects-grid .proj-card').forEach(c => {
      total++;
      const langMatch = activeProjLang==='all' || c.dataset.lang===activeProjLang;
      const searchMatch = !projSearch || c.textContent.toLowerCase().includes(projSearch);
      const show = langMatch && searchMatch;
      c.classList.toggle('hidden', !show);
      if (show) visible++;
    });
    const cnt = document.getElementById('proj-count');
    if (cnt) cnt.innerHTML = `<b>${visible}</b> de ${total}`;
  }

  /* ════ CERT FILTERS ════ */
  let certFilters = { tag:'all', inst:'all', year:'all', q:'' };
  let certSort = 'desc';
  let certMasterList = [];
  function applyCertFilters() {
    const grid = document.getElementById('certs-table-body');
    if (!grid) return;
    let list = certMasterList.slice();
    if (certSort === 'desc') list.sort((a,b)=>(b.year||0)-(a.year||0));
    else if (certSort === 'asc') list.sort((a,b)=>(a.year||0)-(b.year||0));
    else list.sort((a,b)=>a.name.localeCompare(b.name));
    let visible = 0; grid.innerHTML = '';
    list.forEach(c => {
      const tags = c.tags || [];
      const ok = (certFilters.tag==='all' || tags.indexOf(certFilters.tag)>-1)
        && (certFilters.inst==='all' || c.institution===certFilters.inst)
        && (certFilters.year==='all' || String(c.year)===certFilters.year)
        && (!certFilters.q || c.name.toLowerCase().indexOf(certFilters.q)>-1 || (c.platform||'').toLowerCase().indexOf(certFilters.q)>-1);
      if (!ok) return;
      visible++;
      const tagsHtml = tags.map(t=>`<span class="cert-card-tag">${esc(t)}</span>`).join('');
      const linkHtml = (c.url && c.url.trim())
        ? `<a class="cert-card-link" href="${esc(c.url)}" target="_blank" rel="noopener">Ver credencial →</a>` : '';
      const card = document.createElement('div');
      card.className = 'cert-card';
      card.innerHTML =
        `<div class="cert-card-header"><span class="cert-card-badge">${c.badge||'🏅'}</span><span class="cert-card-name">${esc(c.name)}</span></div>`
        + `<div class="cert-card-meta"><span class="cert-card-platform">${esc(c.institution||c.platform||'')}</span><span class="cert-card-year">${esc(String(c.year||''))}</span></div>`
        + (tagsHtml ? `<div class="cert-card-tags">${tagsHtml}</div>` : '')
        + linkHtml;
      grid.appendChild(card);
    });
    if (!visible) grid.innerHTML = '<div class="cert-no-results">Sin resultados para este filtro.</div>';
    const cnt = document.getElementById('cert-visible-count');
    if (cnt) cnt.textContent = visible;
  }
  function initCertFilters(list) {
    certMasterList = list;
    const catSel = document.getElementById('cert-cat-select');
    if (catSel) {
      const set = {}; list.forEach(c => (c.tags||[]).forEach(t => set[t]=1));
      catSel.innerHTML = '<option value="all">Todas</option>';
      Object.keys(set).sort().forEach(tag => {
        const o = document.createElement('option'); o.value = tag; o.textContent = tag; catSel.appendChild(o);
      });
      catSel.addEventListener('change', () => { certFilters.tag = catSel.value; applyCertFilters(); });
    }
    const instSel = document.getElementById('cert-inst-select');
    if (instSel) {
      const set = {}; list.forEach(c => set[c.institution||c.platform||'']=1);
      instSel.innerHTML = '<option value="all">Todos</option>';
      Object.keys(set).sort().forEach(i => { const o=document.createElement('option'); o.value=i; o.textContent=i; instSel.appendChild(o); });
      instSel.addEventListener('change', () => { certFilters.inst=instSel.value; applyCertFilters(); });
    }
    const yearSel = document.getElementById('cert-year-select');
    if (yearSel) {
      const set = {}; list.forEach(c => { if(c.year) set[String(c.year)]=1; });
      yearSel.innerHTML = '<option value="all">Todos</option>';
      Object.keys(set).sort().reverse().forEach(y => { const o=document.createElement('option'); o.value=y; o.textContent=y; yearSel.appendChild(o); });
      yearSel.addEventListener('change', () => { certFilters.year=yearSel.value; applyCertFilters(); });
    }
    const sortSel = document.getElementById('cert-sort-select');
    if (sortSel) sortSel.addEventListener('change', () => { certSort=sortSel.value; applyCertFilters(); });
    const inp = document.getElementById('search-certs');
    if (inp) inp.addEventListener('input', () => { certFilters.q=inp.value.trim().toLowerCase(); applyCertFilters(); });
  }

  /* ════ APP TECH FILTER ════ */
  let activeAppTech = 'all', appSearch = '';
  function buildAppFilter(list) {
    const techs = list.flatMap(a => a.tech || []);
    const counts = {}; techs.forEach(t => counts[t] = (counts[t]||0)+1);
    const opts = [{ label: 'Todas', value: 'all', color: null, count: list.length }]
      .concat([...new Set(techs)].sort().map(t => ({ label: t, value: t, color: langColor(t), count: counts[t] })));
    makeDropdown(document.getElementById('app-filter'), { label: 'Tecnología', options: opts, value: 'all', onSelect: filterApps });
  }
  function filterApps(tech) { activeAppTech = tech; applyAppVisibility(); }
  function applyAppVisibility() {
    let visible = 0, total = 0;
    document.querySelectorAll('#apps-grid .app-card').forEach(c => {
      total++;
      const techs = (c.dataset.techs||'').split(',');
      const techMatch = activeAppTech==='all' || techs.includes(activeAppTech);
      const searchMatch = !appSearch || c.textContent.toLowerCase().includes(appSearch);
      const show = techMatch && searchMatch;
      c.classList.toggle('hidden', !show);
      if (show) visible++;
    });
    const cnt = document.getElementById('app-count');
    if (cnt) cnt.innerHTML = `<b>${visible}</b> de ${total}`;
  }

  /* ════ GENERIC SEARCH ════ */
  function bindSearch(inputId, rowSel, onFilter) {
    const inp = document.getElementById(inputId);
    if (!inp) return;
    inp.addEventListener('input', () => {
      const q = inp.value.trim().toLowerCase();
      if (onFilter) return onFilter(q);
      document.querySelectorAll(rowSel).forEach(el =>
        el.classList.toggle('hidden', !!q && !el.textContent.toLowerCase().includes(q)));
    });
  }

  /* ════ RENDER: TECH STACK ════ */
  function renderTechStack(techstack) {
    const container = document.getElementById('techstack-container');
    if (!container) return;
    if (!techstack || !Object.keys(techstack).length) { container.innerHTML='<div class="empty-state">Agrega techstack en content.json</div>'; return; }
    const catColors = {
      'Lenguajes':'#5b86ff', 'Frameworks & Librerías':'#a855f7',
      'Runtime & Plataformas':'#2dd4bf', 'Bases de Datos':'#34d399', 'Cloud & Deployment':'#ff9d54',
    };
    container.innerHTML = Object.entries(techstack).map(([category, chips]) => {
      const accent = catColors[category] || '#5b86ff';
      const chipsHtml = chips.map(chip => {
        const bg = chip.color || '#1a2a3a';
        return `<div class="tcard">
          <div class="tcard-glow" style="background:${bg}"></div>
          <div class="tcard-inner">
            <span class="tcard-icon" style="color:${bg}">${chip.icon||'◉'}</span>
            <span class="tcard-name">${esc(chip.name)}</span>
          </div>
        </div>`;
      }).join('');
      return `<div class="tech-section">
        <div class="tech-section-head">
          <span class="tech-section-line" style="background:${accent}"></span>
          <span class="tech-section-label" style="color:${accent}">${esc(category)}</span>
          <span class="tech-section-line" style="background:${accent}"></span>
        </div>
        <div class="tcard-row">${chipsHtml}</div>
      </div>`;
    }).join('');
  }

  /* ════ RENDER: PROJECTS ════ */
  function renderProjects(list) {
    const g = document.getElementById('projects-grid');
    if (!g) return;
    if (!list.length) { g.innerHTML='<div class="empty-state">Agrega proyectos en content.json</div>'; return; }
    buildProjFilter(list);
    g.innerHTML = list.map(p => {
      const col = langColor(p.language||'');
      const dark = isDark(col.startsWith('#') ? col : '#003366');
      const demo = p.demo ? `<a href="${esc(p.demo)}" class="proj-demo" target="_blank" rel="noopener">Demo ↗</a>` : '';
      return `
        <div class="proj-card" data-lang="${esc(p.language||'')}" style="--card-accent:${col}">
          <div class="proj-card-accent"></div>
          ${shotHtml(p)}
          <div class="proj-card-header">
            <span class="proj-icon">${icon(p.icon,'ico')}</span>
            <span class="proj-name">${esc(p.name)}</span>
            <span class="proj-lang-badge" style="background:${col};color:${dark?'#fff':'#111'}">${esc(p.language||'')}</span>
          </div>
          <p class="proj-desc">${esc(p.description)}</p>
          <div class="proj-footer">
            <a href="${esc(p.url)}" class="proj-link" target="_blank" rel="noopener">Ver repo →</a>
            ${demo}
          </div>
        </div>`;
    }).join('');
    stagger(g);
    bindSearch('search-projects', null, q => { projSearch=q; applyProjVisibility(); });
    bindCardFX('#projects-grid .proj-card');
    applyProjVisibility();
  }

  /* ════ RENDER: APPLICATIONS ════ */
  function renderApplications(list) {
    const g = document.getElementById('apps-grid');
    if (!g) return;
    if (!list.length) { g.innerHTML='<div class="empty-state">Agrega apps en content.json</div>'; return; }
    buildAppFilter(list);
    g.innerHTML = list.map(a => {
      const techs = a.tech||[];
      const demo = a.demo ? `<a href="${esc(a.demo)}" class="app-link app-link-demo" target="_blank" rel="noopener">Ver online ↗</a>` : '';
      return `
        <div class="app-card" data-techs="${esc(techs.join(','))}" style="--card-accent:var(--signal)">
          <div class="app-card-header">
            <span class="app-icon">${icon(a.icon,'ico')}</span>
            <span class="app-license">${esc(a.license||'MIT')}</span>
          </div>
          <h3>${esc(a.name)}</h3>
          <p>${esc(a.description)}</p>
          ${techs.length ? `<div class="app-tech">${techs.map(t=>`<span class="app-tech-tag">${esc(t)}</span>`).join('')}</div>` : ''}
          <div class="app-footer">
            <a href="${esc(a.release_url || a.url)}" class="app-link app-link-install" target="_blank" rel="noopener">${icon('download','ico-sm')} <span data-i18n="apps.download">Descargar</span></a>
            ${demo}
          </div>
        </div>`;
    }).join('');
    stagger(g);
    bindSearch('search-apps', null, q => { appSearch=q; applyAppVisibility(); });
    bindCardFX('#apps-grid .app-card');
    applyAppVisibility();
  }

  /* ════ RENDER: CERTS ════ */
  function renderCerts(list, featuredDegree, featuredOracle) {
    const el = id => document.getElementById(id);
    const hero = el('degree-hero');
    if (hero && featuredDegree) {
      hero.style.display = 'block';
      if (el('degree-hero-title')) el('degree-hero-title').textContent = featuredDegree.title || '';
      if (el('degree-hero-inst'))  el('degree-hero-inst').textContent  = featuredDegree.institution || '';
      if (el('degree-hero-year'))  el('degree-hero-year').textContent  = featuredDegree.year || '';
    }
    const ohero = el('oracle-hero');
    if (ohero && featuredOracle) {
      ohero.style.display = 'flex';
      if (el('oracle-hero-title')) el('oracle-hero-title').textContent = featuredOracle.title || '';
      if (el('oracle-hero-inst'))  el('oracle-hero-inst').textContent  = featuredOracle.institution || '';
      if (el('oracle-hero-year'))  el('oracle-hero-year').textContent  = featuredOracle.year || '';
    }
    if (!list.length) { const g=el('certs-table-body'); if(g) g.innerHTML='<div class="cert-no-results">Agrega certificaciones en content.json</div>'; return; }
    const sc = el('certs-summary-count');
    if (sc) sc.textContent = list.length;
    initCertFilters(list);
    applyCertFilters();
  }

  /* ════ CONTACT ════ */
  function updateContact(c) {
    const map = { '[href*="github"]':c.github, '[href^="mailto"]':c.email?'mailto:'+c.email:null, '[href*="linkedin"]':c.linkedin };
    for (const [sel,val] of Object.entries(map)) {
      if (!val) continue;
      const el = document.querySelector('.contact-link'+sel);
      if (!el) continue;
      el.href = val;
      if (sel.includes('mailto')) { const lb=el.querySelector('.contact-label'); if(lb) lb.textContent=c.email; }
    }
  }

  /* ════ HERO META (contadores en vivo) ════ */
  function fillHeroMeta(d) {
    const set = (id, n) => { const el=document.getElementById(id); if(el) animCount(el, n); };
    const projects = d.projects || [];
    set('hero-num-projects', projects.length);
    set('hero-num-apps', (d.applications||[]).length);
    /* Lenguajes distintos con proyecto real detrás. Preferimos este número al
       de certificados: dice algo sobre lo construido, no sobre lo cursado. */
    set('hero-num-langs', new Set(projects.map(p => p.language).filter(Boolean)).size);
  }

  /* ════ HERO: PROYECTOS DESTACADOS ════ */
  function renderHeroFeatured(list) {
    const mount = document.getElementById('hero-featured');
    if (!mount) return;
    const featured = list.filter(p => p.featured).slice(0, 3);
    if (!featured.length) { mount.innerHTML = ''; return; }
    mount.innerHTML = featured.map(p => {
      const col = langColor(p.language || '');
      return `<a class="hf-card" href="${esc(p.url)}" target="_blank" rel="noopener" style="--card-accent:${col}">
        <span class="hf-ico">${icon(p.icon,'ico')}</span>
        <span class="hf-body">
          <span class="hf-name">${esc(p.name)}</span>
          <span class="hf-lang">${esc(p.language||'')}</span>
        </span>
        <span class="hf-arrow" aria-hidden="true">→</span>
      </a>`;
    }).join('');
  }

  /* ════ LOAD CONTENT ════ */
  async function loadContent() {
    try {
      const r = await fetch('data/content.json');
      if (!r.ok) throw new Error('no content');
      const d = await r.json();
      const sp=document.getElementById('stat-projects'), sc=document.getElementById('stat-certs'), sy=document.getElementById('stat-years');
      if(sp) sp.dataset.target=(d.projects||[]).length;
      if(sc) sc.dataset.target=(d.certifications||[]).length;
      if(sy) sy.dataset.target = yearsSince(d.profile && d.profile.career_start);
      fillHeroMeta(d);
      renderTechStack(d.techstack||{});
      renderProjects(d.projects||[]);
      renderHeroFeatured(d.projects||[]);
      renderCerts(d.certifications||[], d.featured_degree||null, d.featured_oracle||null);
      renderApplications(d.applications||[]);
      if(d.contact) updateContact(d.contact);
    } catch(_) {
      console.info('[Portfolio] Inicia un servidor local: python3 -m http.server 8080');
      renderTechStack({}); renderProjects([]); renderCerts([]); renderApplications([]);
    }
  }

  /* ════ PROFILE PHOTO ════ */
  (function initProfilePhoto() {
    const real = document.getElementById('photo-real');
    const ph   = document.getElementById('photo-placeholder');
    if (!real || !ph) return;
    /* La imagen ya viene visible desde el HTML: si el JS no corre, la cara
       se ve igual. Acá solo cubrimos el caso de que el archivo falte. */
    ph.style.display = 'none';
    real.addEventListener('error', () => { real.style.display='none'; ph.style.display='flex'; });
    if (real.complete && real.naturalWidth === 0) { real.style.display='none'; ph.style.display='flex'; }
  })();

  /* Botones del hero */
  document.querySelectorAll('[data-goto]').forEach(b =>
    b.addEventListener('click', () => window.__nav?.open(b.dataset.goto)));

  I18N.init();
  loadContent();

  /* ════ MOBILE HAMBURGER ════ */
  (function(){
    const btn = document.getElementById('hamburger-btn');
    const drawer = document.getElementById('mobile-drawer');
    if (!btn || !drawer) return;
    const close = () => { btn.classList.remove('open'); btn.setAttribute('aria-expanded','false'); drawer.classList.remove('open'); drawer.setAttribute('aria-hidden','true'); };
    btn.addEventListener('click', () => {
      const open = drawer.classList.toggle('open');
      btn.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open);
      drawer.setAttribute('aria-hidden', !open);
    });
    drawer.querySelectorAll('.mobile-nav-item').forEach(item => {
      item.addEventListener('click', () => { close(); window.__nav?.open(item.dataset.section); });
    });
    document.addEventListener('click', e => {
      if (drawer.classList.contains('open') && !drawer.contains(e.target) && !btn.contains(e.target)) close();
    });
  })();

  console.log('%c[ jeh.dev · Signal Field ]', 'color:#5b86ff;font-family:monospace;font-size:1rem;font-weight:bold;');
})();
