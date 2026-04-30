/**
 * app.js v1.4
 */
(function () {
  'use strict';

  /* ════ THEME ════ */
  const root = document.documentElement;
  function applyTheme(t) { root.setAttribute('data-theme', t); localStorage.setItem('portfolio-theme', t); }
  applyTheme(localStorage.getItem('portfolio-theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'));
  document.getElementById('theme-toggle')?.addEventListener('click', () =>
    applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));

  /* ════ CURSOR ════ */
  const glow = document.getElementById('cursor-glow');
  const dot  = document.getElementById('cursor-dot');
  let mx=-999, my=-999, glowX=-999, glowY=-999, dotX=-999, dotY=-999;
  window.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; }, { passive: true });
  (function loop() {
    glowX += (mx-glowX)*.18; glowY += (my-glowY)*.18;
    dotX  += (mx-dotX)*.65;  dotY  += (my-dotY)*.65;
    if (glow) { glow.style.left=glowX+'px'; glow.style.top=glowY+'px'; }
    if (dot)  { dot.style.left =dotX+'px';  dot.style.top =dotY+'px';  }
    requestAnimationFrame(loop);
  })();
  const iSel = 'a,button,.nav-item,.lang-opt,.proj-card,.cert-row,.app-card,.tech-chip,.contact-link,.tag-filter,.lang-filter-btn';
  document.addEventListener('mouseover', e => { if(e.target.closest(iSel)) document.body.classList.add('cursor-hover'); });
  document.addEventListener('mouseout',  e => { if(e.target.closest(iSel)) document.body.classList.remove('cursor-hover'); });
  document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
  document.addEventListener('mouseup',   () => document.body.classList.remove('cursor-click'));
  if (window.matchMedia('(pointer: coarse)').matches) {
    const s = document.createElement('style');
    s.textContent = 'body,button,a{cursor:auto!important}#cursor-glow,#cursor-dot{display:none!important}';
    document.head.appendChild(s);
  }

  /* ════ FOOTER YEAR ════ */
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ════ STAT COUNTER ════ */
  function animCount(el, target) {
    const start = performance.now();
    (function step(now) {
      const p = Math.min((now-start)/1100, 1);
      const e = p===1 ? 1 : 1-Math.pow(2,-10*p);
      el.textContent = Math.round(target*e);
      if (p<1) requestAnimationFrame(step);
    })(start);
  }
  const aboutPanel = document.getElementById('section-about');
  if (aboutPanel) new MutationObserver(() => {
    if (aboutPanel.classList.contains('visible')) {
      ['stat-projects','stat-certs'].forEach(id => {
        const el = document.getElementById(id);
        if (el) animCount(el, parseInt(el.dataset.target||0));
      });
      // years is static
      const yearsEl = document.getElementById('stat-apps');
      if(yearsEl && yearsEl.textContent === '0') yearsEl.textContent = '2.4';
    }
  }).observe(aboutPanel, {attributes:true});

  /* ════ ESC ════ */
  const esc = s => typeof s==='string' ? s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;') : '';

  /* ════ LANG → COLOR MAP ════ */
  const LANG_COLORS = {
    python:'#3572A5', javascript:'#f1e05a', js:'#f1e05a',
    typescript:'#3178c6', ts:'#3178c6', dart:'#00B4AB',
    flutter:'#54c5f8', rust:'#dea584', go:'#00ADD8',
    html:'#e34c26', css:'#563d7c', shell:'#89e051',
    bash:'#89e051', java:'#f89820', 'c++':'#00599c',
    csharp:'#239120', 'c#':'#239120',
  };
  function langColor(lang) { return LANG_COLORS[(lang||'').toLowerCase()] || 'var(--primary)'; }
  function isDark(hex) {
    if (!hex.startsWith('#')) return true;
    const r=parseInt(hex.slice(1,3),16), g=parseInt(hex.slice(3,5),16), b=parseInt(hex.slice(5,7),16);
    return (r*299+g*587+b*114)/1000 < 128;
  }

  /* ════ PROJECT FILTER ════ */
  let activeProjLang = 'all';
  let projSearch = '';

  function buildProjLangBar(langs) {
    const bar = document.getElementById('proj-lang-bar');
    if (!bar) return;
    bar.innerHTML = '';
    const mkBtn = (label, lang, col) => {
      const b = document.createElement('button');
      b.className = 'filter-pill' + (lang==='all' ? ' active' : '');
      b.dataset.lang = lang;
      if (col) { b.style.setProperty('--pill-dot', col); }
      const dot = lang!=='all' ? `<span class="pill-dot" style="background:${col||'var(--primary)'}"></span>` : '';
      b.innerHTML = dot + esc(label);
      b.addEventListener('click', () => filterProjects(lang));
      bar.appendChild(b);
    };
    mkBtn('Todos','all');
    [...new Set(langs)].sort().forEach(lang => mkBtn(lang, lang, langColor(lang)));
  }

  function filterProjects(lang) {
    activeProjLang = lang;
    document.getElementById('proj-lang-bar')?.querySelectorAll('.filter-pill').forEach(b => {
      b.classList.toggle('active', b.dataset.lang===lang);
    });
    applyProjVisibility();
  }

  function applyProjVisibility() {
    document.querySelectorAll('#projects-grid .proj-card').forEach(c => {
      const langMatch = activeProjLang==='all' || c.dataset.lang===activeProjLang;
      const searchMatch = !projSearch || c.textContent.toLowerCase().includes(projSearch);
      c.classList.toggle('hidden', !langMatch || !searchMatch);
    });
  }

  /* ════ CERT FILTERS v2 ════ */
  var certFilters = { tag:'all', inst:'all', year:'all', q:'' };
  var certSort = 'desc';
  var certMasterList = [];

  function applyCertFilters() {
    var grid = document.getElementById('certs-table-body');
    if (!grid) return;
    var list = certMasterList.slice();
    if (certSort === 'desc') list.sort(function(a,b){ return (b.year||0)-(a.year||0); });
    else if (certSort === 'asc') list.sort(function(a,b){ return (a.year||0)-(b.year||0); });
    else list.sort(function(a,b){ return a.name.localeCompare(b.name); });
    var visible = 0;
    grid.innerHTML = '';
    list.forEach(function(c) {
      var tags = c.tags || [];
      var matchT = certFilters.tag === 'all' || tags.indexOf(certFilters.tag) > -1;
      var matchI = certFilters.inst === 'all' || c.institution === certFilters.inst;
      var matchY = certFilters.year === 'all' || String(c.year) === certFilters.year;
      var matchQ = !certFilters.q || c.name.toLowerCase().indexOf(certFilters.q) > -1
                   || (c.platform||'').toLowerCase().indexOf(certFilters.q) > -1;
      if (!(matchT && matchI && matchY && matchQ)) return;
      visible++;
      var tagsHtml = tags.map(function(t){ return '<span class="cert-card-tag">'+esc(t)+'</span>'; }).join('');
      var linkHtml = (c.url && c.url.trim())
        ? '<a class="cert-card-link" href="'+esc(c.url)+'" target="_blank" rel="noopener">Ver credencial \u2192</a>' : '';
      var card = document.createElement('div');
      card.className = 'cert-card';
      card.innerHTML =
        '<div class="cert-card-header">'
        + '<span class="cert-card-badge">'+(c.badge||'\ud83c\udfc5')+'</span>'
        + '<span class="cert-card-name">'+esc(c.name)+'</span>'
        + '</div>'
        + '<div class="cert-card-meta">'
        + '<span class="cert-card-platform">'+esc(c.institution||c.platform||'')+'</span>'
        + '<span class="cert-card-year">'+esc(String(c.year||''))+'</span>'
        + '</div>'
        + (tagsHtml ? '<div class="cert-card-tags">'+tagsHtml+'</div>' : '')
        + linkHtml;
      grid.appendChild(card);
    });
    if (!visible) grid.innerHTML = '<div class="cert-no-results">Sin resultados para este filtro.</div>';
    var cnt = document.getElementById('cert-visible-count');
    if (cnt) cnt.textContent = visible;
  }

  function initCertFilters(list) {
    certMasterList = list;
    // categories
    var catList = document.getElementById('cert-cat-list');
    if (catList) {
      var allTagsSet = {};
      list.forEach(function(c){ (c.tags||[]).forEach(function(t){ allTagsSet[t]=1; }); });
      var allTags = Object.keys(allTagsSet).sort();
      catList.innerHTML = '<button class="certs-cat-btn active" data-tag="all">Todas las categor\u00edas</button>';
      catList.querySelector('[data-tag="all"]').addEventListener('click', function(){
        certFilters.tag = 'all';
        catList.querySelectorAll('.certs-cat-btn').forEach(function(b){ b.classList.toggle('active', b.dataset.tag==='all'); });
        applyCertFilters();
      });
      allTags.forEach(function(tag) {
        var btn = document.createElement('button');
        btn.className = 'certs-cat-btn'; btn.dataset.tag = tag; btn.textContent = tag;
        btn.addEventListener('click', function(){
          certFilters.tag = tag;
          catList.querySelectorAll('.certs-cat-btn').forEach(function(b){ b.classList.toggle('active', b.dataset.tag===tag); });
          applyCertFilters();
        });
        catList.appendChild(btn);
      });
    }
    // institutions
    var instSel = document.getElementById('cert-inst-select');
    if (instSel) {
      var instSet = {};
      list.forEach(function(c){ instSet[c.institution||c.platform||'']=1; });
      var insts = Object.keys(instSet).sort();
      instSel.innerHTML = '<option value="all">Todos los emisores</option>';
      insts.forEach(function(i){ var o=document.createElement('option'); o.value=i; o.textContent=i; instSel.appendChild(o); });
      instSel.addEventListener('change', function(){ certFilters.inst=instSel.value; applyCertFilters(); });
    }
    // years
    var yearSel = document.getElementById('cert-year-select');
    if (yearSel) {
      var yearSet = {};
      list.forEach(function(c){ if(c.year) yearSet[String(c.year)]=1; });
      var years = Object.keys(yearSet).sort().reverse();
      yearSel.innerHTML = '<option value="all">Todos los a\u00f1os</option>';
      years.forEach(function(y){ var o=document.createElement('option'); o.value=y; o.textContent=y; yearSel.appendChild(o); });
      yearSel.addEventListener('change', function(){ certFilters.year=yearSel.value; applyCertFilters(); });
    }
    // sort
    var sortSel = document.getElementById('cert-sort-select');
    if (sortSel) sortSel.addEventListener('change', function(){ certSort=sortSel.value; applyCertFilters(); });
    // search
    var inp = document.getElementById('search-certs');
    if (inp) inp.addEventListener('input', function(){ certFilters.q=inp.value.trim().toLowerCase(); applyCertFilters(); });
  }

  /* ════ APP TECH FILTER ════ */
  function buildAppTagBar(techs) {
    const bar = document.getElementById('app-tag-bar');
    if (!bar) return;
    bar.innerHTML='';
    const mkBtn = (label, tag, col) => {
      const b = document.createElement('button');
      b.className = 'filter-pill' + (tag==='all' ? ' active' : '');
      b.dataset.tag = tag;
      const dot = tag!=='all' ? `<span class="pill-dot" style="background:${col||'var(--primary)'}"></span>` : '';
      b.innerHTML = dot + esc(label);
      b.addEventListener('click', () => filterApps(tag));
      bar.appendChild(b);
    };
    mkBtn('Todas','all');
    [...new Set(techs)].sort().forEach(t => mkBtn(t, t, langColor(t)));
  }

  function filterApps(tech) {
    document.getElementById('app-tag-bar')?.querySelectorAll('.filter-pill').forEach(b =>
      b.classList.toggle('active', b.dataset.tag===tech));
    document.querySelectorAll('#apps-grid .app-card').forEach(c => {
      const techs=(c.dataset.techs||'').split(',');
      c.classList.toggle('hidden', tech!=='all' && !techs.includes(tech));
    });
  }

  /* ════ GENERIC SEARCH ════ */
  function bindSearch(inputId, rowSel, onFilter) {
    const inp = document.getElementById(inputId);
    if (!inp) return;
    inp.addEventListener('input', () => {
      const q = inp.value.trim().toLowerCase();
      if (onFilter) { onFilter(q); return; }
      document.querySelectorAll(rowSel).forEach(el => {
        el.classList.toggle('hidden', !!q && !el.textContent.toLowerCase().includes(q));
      });
    });
  }

  /* ════ RENDER: TECH STACK ════ */
  function renderTechStack(techstack) {
    var container = document.getElementById('techstack-container');
    if (!container) return;
    if (!techstack || !Object.keys(techstack).length) {
      container.innerHTML='<div class="empty-state">Agrega techstack en content.json</div>'; return;
    }
    // Build flat list of all techs for the orbit display
    var allTechs = [];
    Object.entries(techstack).forEach(function([cat, chips]){ chips.forEach(function(c){ allTechs.push({cat:cat, ...c}); }); });

    // Category accent colors
    var catColors = {
      'Lenguajes':             '#00dcff',
      'Frameworks & Librerías':'#a855f7',
      'Runtime & Plataformas': '#22d3ee',
      'Bases de Datos':        '#10b981',
      'Cloud & Deployment':    '#f59e0b',
    };

    container.innerHTML = Object.entries(techstack).map(function([category, chips]){
      var accent = catColors[category] || '#00dcff';
      var chipsHtml = chips.map(function(chip){
        var bg   = chip.color || '#1a2a3a';
        var dark = chip.dark !== undefined ? chip.dark : isDark(bg);
        var fg   = dark ? '#ffffff' : '#111111';
        return `<div class="tcard" style="--tc:#${bg.replace('#','')}">
          <div class="tcard-glow" style="background:${bg}"></div>
          <div class="tcard-inner" style="border-color:${bg}22">
            <span class="tcard-icon">${chip.icon||'◉'}</span>
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
    const langs = list.map(p => p.language).filter(Boolean);
    buildProjLangBar(langs);
    g.innerHTML = list.map(p => {
      const col = langColor(p.language||'');
      const dark = isDark(col.startsWith('#') ? col : '#003366');
      return `
        <div class="proj-card" data-lang="${esc(p.language||'')}">
          <div class="proj-card-accent" style="background:${col}"></div>
          <div class="proj-card-header">
            <span class="proj-icon">${p.icon||'⚡'}</span>
            <span class="proj-name">${esc(p.name)}</span>
            <span class="proj-lang-badge" style="background:${col};color:${dark?'#fff':'#111'};border-color:transparent">${esc(p.language||'')}</span>
          </div>
          <p class="proj-desc">${esc(p.description)}</p>
          <div class="proj-footer">
            <a href="${esc(p.url)}" class="proj-link" target="_blank" rel="noopener">Ver repo →</a>
          </div>
        </div>`;
    }).join('');
    bindSearch('search-projects', null, q => {
      projSearch = q; applyProjVisibility();
    });
  }

  /* ════ RENDER: CERTIFICATIONS v2 ════ */
  function renderCerts(list, featuredDegree, featuredOracle) {
    var el = function(id){ return document.getElementById(id); };
    // Degree hero
    var hero = el('degree-hero');
    if (hero && featuredDegree) {
      hero.style.display = 'block';
      if (el('degree-hero-title')) el('degree-hero-title').textContent = featuredDegree.title || '';
      if (el('degree-hero-inst'))  el('degree-hero-inst').textContent  = featuredDegree.institution || '';
      if (el('degree-hero-year'))  el('degree-hero-year').textContent  = featuredDegree.year || '';
    }
    // Oracle ONE hero
    var ohero = el('oracle-hero');
    if (ohero && featuredOracle) {
      ohero.style.display = 'flex';
      if (el('oracle-hero-icon'))  el('oracle-hero-icon').textContent  = featuredOracle.icon || '\u{1f3db}';
      if (el('oracle-hero-title')) el('oracle-hero-title').textContent = featuredOracle.title || '';
      if (el('oracle-hero-inst'))  el('oracle-hero-inst').textContent  = featuredOracle.institution || '';
      if (el('oracle-hero-year'))  el('oracle-hero-year').textContent  = featuredOracle.year || '';
      var tagsEl = el('oracle-hero-tags');
      if (tagsEl) tagsEl.innerHTML = ''; // tags hidden
    }
    if (!list.length) {
      var g = el('certs-table-body');
      if(g) g.innerHTML = '<div class="cert-no-results">Agrega certificaciones en content.json</div>';
      return;
    }
    initCertFilters(list);
    applyCertFilters();
  }

  /* ════ RENDER: APPLICATIONS ════ */
  function renderApplications(list) {
    const g = document.getElementById('apps-grid');
    if (!g) return;
    buildAppTagBar(list.flatMap(a => a.tech||[]));
    if (!list.length) { g.innerHTML='<div class="empty-state">Agrega apps en content.json</div>'; return; }
    g.innerHTML = list.map(a => {
      const techs = a.tech||[];
      return `
        <div class="app-card" data-techs="${esc(techs.join(','))}">
          <div class="app-card-header">
            <span class="app-icon">${a.icon||'💻'}</span>
            <span class="app-license">${esc(a.license||'MIT')}</span>
          </div>
          <h3>${esc(a.name)}</h3>
          <p>${esc(a.description)}</p>
          ${techs.length ? `<div class="app-tech">${techs.map(t=>`<span class="app-tech-tag">${esc(t)}</span>`).join('')}</div>` : ''}
          <div class="app-footer">
            <a href="${esc(a.release_url || a.url)}" class="app-link app-link-install" target="_blank" rel="noopener">⬇ Descargar</a>
          </div>
        </div>`;
    }).join('');
    bindSearch('search-apps', '#apps-grid .app-card');
  }

  /* ════ CONTACT ════ */
  function updateContact(c) {
    const map = {
      '[href*="github"]':   c.github,
      '[href^="mailto"]':   c.email ? 'mailto:'+c.email : null,
      '[href*="linkedin"]': c.linkedin,
    };
    for (const [sel,val] of Object.entries(map)) {
      if (!val) continue;
      const el = document.querySelector('.contact-link'+sel);
      if (!el) continue;
      el.href = val;
      if (sel.includes('mailto')) { const lb=el.querySelector('.contact-label'); if(lb) lb.textContent=c.email; }
    }
  }

  /* ════ LOAD CONTENT ════ */
  async function loadContent() {
    try {
      const r = await fetch('data/content.json');
      if (!r.ok) throw new Error('no content');
      const d = await r.json();
      const sp=document.getElementById('stat-projects');
      const sc=document.getElementById('stat-certs');
      const sa=document.getElementById('stat-apps');
      if(sp) sp.dataset.target=(d.projects||[]).length;
      if(sc) sc.dataset.target=(d.certifications||[]).length;
      // "Años" is fixed at 2.4 — not animated, just displayed
      if(sa){ sa.dataset.target=0; sa.textContent='2.4'; }
      renderTechStack(d.techstack||{});
      renderProjects(d.projects||[]);
      renderCerts(d.certifications||[], d.featured_degree||null, d.featured_oracle||null);
      renderApplications(d.applications||[]);
      if(d.contact) updateContact(d.contact);
    } catch(_) {
      console.info('[Portfolio] Inicia un servidor local: python3 -m http.server 8080');
      renderTechStack({});
      renderProjects([]);
      renderCerts([]);
      renderApplications([]);
    }
  }


  /* ════ PROFILE PHOTO ════ */
  function initProfilePhoto() {
    const real = document.getElementById('photo-real');
    const ph   = document.getElementById('photo-placeholder');
    if (!real || !ph) return;
    // Try loading the photo — if it exists show it, otherwise keep placeholder
    const testImg = new Image();
    testImg.onload = () => {
      real.style.display = 'block';
      ph.style.display   = 'none';
      // Add cache-buster so changes in admin app show immediately
      real.src = 'assets/photo.jpg?v=' + Date.now();
    };
    testImg.onerror = () => {
      real.style.display = 'none';
      ph.style.display   = 'flex';
    };
    testImg.src = 'assets/photo.jpg';
  }
  initProfilePhoto();
  I18N.init();
  loadContent();

  console.log('%c[ PORTFOLIO v1.4 ]\n%c// Morphing Orbs Edition', 'color:#00dcff;font-family:monospace;font-size:1.2rem;font-weight:bold;','color:#888;font-family:monospace;');

  /* ════ MOBILE HAMBURGER ════ */
  (function(){
    var btn    = document.getElementById('hamburger-btn');
    var drawer = document.getElementById('mobile-drawer');
    if (!btn || !drawer) return;

    function closeDrawer(){
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded','false');
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden','true');
    }
    function toggleDrawer(){
      var isOpen = drawer.classList.toggle('open');
      btn.classList.toggle('open', isOpen);
      btn.setAttribute('aria-expanded', isOpen);
      drawer.setAttribute('aria-hidden', !isOpen);
    }
    btn.addEventListener('click', toggleDrawer);

    // Mobile nav items open sections
    drawer.querySelectorAll('.mobile-nav-item').forEach(function(item){
      item.addEventListener('click', function(){
        var section = item.dataset.section;
        closeDrawer();
        // Reuse existing nav logic — simulate click on desktop nav-item
        var desktop = document.querySelector('.nav-item-wrapper[data-section="'+section+'"] .nav-item');
        if (desktop) desktop.click();
      });
    });

    // Close on outside click
    document.addEventListener('click', function(e){
      if (drawer.classList.contains('open') && !drawer.contains(e.target) && !btn.contains(e.target)){
        closeDrawer();
      }
    });
  })();


  /* ════ ACTIVE-SECTION NAV GLOW LINE ════ */
  (function(){
    var header = document.getElementById('main-header');
    if (!header) return;

    function updateNavLine(){
      var active = document.querySelector('.nav-item-wrapper.section-active .nav-item');
      if (!active){
        header.style.setProperty('--nav-line-op','0');
        return;
      }
      var hRect = header.getBoundingClientRect();
      var bRect = active.getBoundingClientRect();
      var cx = (bRect.left + bRect.right) / 2 - hRect.left;
      var pct = (cx / hRect.width * 100).toFixed(2) + '%';
      header.style.setProperty('--nav-line-left', pct);
      header.style.setProperty('--nav-line-w', (bRect.width + 20) + 'px');
      header.style.setProperty('--nav-line-op', '1');
    }

    // Update on nav clicks (observe class changes)
    var observer = new MutationObserver(updateNavLine);
    document.querySelectorAll('.nav-item-wrapper').forEach(function(w){
      observer.observe(w, {attributes:true, attributeFilter:['class']});
    });
    updateNavLine();
  })();

})();
