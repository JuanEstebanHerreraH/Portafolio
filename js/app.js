
(() => {
  'use strict';
  const data = window.PORTFOLIO_DATA;
  if (!data || !Array.isArray(data.projects)) return;
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const normalize = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const safeUrl = value => { try { const u = new URL(value); return u.protocol === 'https:' ? u.href : '#'; } catch { return '#'; } };
  const icon = name => '<svg class="icon" aria-hidden="true"><use href="#i-' + name + '"/></svg>';
  const store = {get(key, fallback) { try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; } },set(key, value) { try { localStorage.setItem(key, value); } catch {} }};
  const spanish = {};
  $$('[data-i18n]').forEach(el => { spanish[el.dataset.i18n] = el.textContent; });
  $$('[data-i18n-html]').forEach(el => { spanish[el.dataset.i18nHtml] = el.innerHTML; });
  $$('[data-i18n-placeholder]').forEach(el => { spanish[el.dataset.i18nPlaceholder] = el.placeholder; });
  Object.assign(spanish, {caseButton:'Ver caso',code:'Código',demo:'Abrir aplicación',download:'Ver descargas',problem:'El punto de partida',contribution:'Mi aporte',scope:'Alcance y límites',realImage:'CAPTURA REAL / DATOS DE DEMOSTRACIÓN',conceptImage:'ILUSTRACIÓN CONCEPTUAL DEL PROYECTO',selected:'proyectos seleccionados',results:'proyectos encontrados',of:'de',more:'exploraciones',certificate:'Ver certificado',certificateCount:'cursos y rutas de formación',noCertificates:'No encontré certificados con esa búsqueda.',copied:'Correo copiado.',copyFallback:'No pude copiarlo automáticamente. Puedes seleccionar el correo o abrir tu aplicación de correo.',darkTheme:'Cambiar a tema oscuro',lightTheme:'Cambiar a tema claro',pause:'Pausar animaciones',resume:'Activar animaciones',reduced:'Movimiento reducido por tu sistema',closeProject:'Cerrar proyecto',closeCertificates:'Cerrar certificados',menuOpen:'Abrir menú',menuClose:'Cerrar menú',inProgress:'En curso',viewProject:'Conocer el proyecto',allProjects:'Todo el archivo'});
  const english = {
    skip:'Skip to content',brandSub:'CODE & CURIOSITY',navWork:'Projects',navAbout:'About me',navEducation:'Education',navContact:"Let's talk",
    available:'Open to junior opportunities',hero1:'Ideas that',hero2:'turn into',hero3:'useful tools.',heroDescription:"I'm Juan Esteban Herrera. I build web and desktop applications, explore local AI and create tools for everyday tasks.",explore:'Explore projects',heroRole:'Professional technician · Systems Engineering student',onDesk:'ON MY WORKBENCH',latest:'LATEST PROJECT / 2026',heroProject:'Bring some order to your tables.',handNote:'from idea to executable',disciplines:'WEB · DESKTOP · NETWORKING · AUTOMATION',
    workKicker:'PROJECTS / CODE IN ACTION',workTitle:'Built to<br><em>solve something.</em>',workIntro:'A selection of what I build and learn. Open each project to explore the problem, my contribution and how it works.',all:'Selected',filterAI:'AI',filterWeb:'Web & backend',filterDesktop:'Desktop',filterNetwork:'Networks',searchProjects:'Search a project or technology',noProjects:"I couldn't find that project.",trySearch:'Try Java, networking, AI or an application name.',resetSearch:'Clear search',archiveKicker:'THE REST OF THE LOGBOOK',archiveTitle:'More tools, more explorations.',projectsNote:'Personal, academic and collaborative projects. Each repository documents the code and scope.',allRepos:'All repositories',
    aboutKicker:'THE PERSON BEHIND THE CODE',aboutTitle:'Curiosity is<br>the starting<br><em>point.</em>',portraitNote:"Hi, I'm Juan.",aboutLead:'I like understanding how things work. And when something can work better, trying to build it.',aboutBody:'I graduated as a Professional Technician in Systems Support and IT on February 26, 2026, and I am studying Systems Engineering at CUN. My experience comes from personal, academic and collaborative projects.',aboutBody2:'I work across backend, interfaces, desktop applications and networking. This combination helps me think about both the person using a tool and what happens behind the screen.',principle1:'Start with a concrete problem.',principle2:'Build, test and iterate.',principle3:'Document what works and its limits.',aiNote:'I use AI to support development and documentation. Code review, testing and judgment remain part of the work.',remote:'Remote first · Hybrid in Bogotá',languages:'Native Spanish · English A2',
    toolsKicker:'MY TOOLBOX',toolsTitle:'Technology<br><em>with context.</em>',toolsIntro:'What I use in my projects and what I keep studying. Every tool has a place and a purpose.',officeNote:'I also have basic and intermediate Excel training, practice with macros, and use Word, PowerPoint and AI to organize information and documentation. I continue studying networking and preparing for CCNA.',
    educationKicker:'EDUCATION / ALWAYS LEARNING',educationTitle:'Learn.<br><em>Apply. Repeat.</em>',educationIntro:'Technical training, an ongoing university degree and a learning path that I put into projects.',viewCertificates:'Explore courses and certificates',
    contactKicker:'THE NEXT PROJECT',contactTitle:"Shall we build<br><em>something useful?</em>",contactText:"I'm looking for junior opportunities and clearly scoped projects. If my approach fits what you need, let's talk.",emailMe:'Send me an email',emailLabel:'EMAIL / PROJECTS',copyEmail:'Copy email',linkedinLabel:'PROFESSIONAL PROFILE',githubLabel:'CODE & DOCUMENTATION',footerNote:'Made with curiosity, code and review.',
    projectCase:'LOGBOOK / PROJECT CASE',certificatesKicker:'CONTINUING EDUCATION',certificatesTitle:'What I keep learning.',certificatesText:'Courses and learning paths with their original links. Certificate titles retain the language used by the institution.',searchCertificates:'Search a course, institution or topic',
    caseButton:'Explore case',code:'Code',demo:'Open application',download:'View downloads',problem:'The starting point',contribution:'My contribution',scope:'Scope and limits',realImage:'REAL SCREENSHOT / DEMONSTRATION DATA',conceptImage:'CONCEPTUAL PROJECT ILLUSTRATION',selected:'selected projects',results:'matching projects',of:'of',more:'explorations',certificate:'View certificate',certificateCount:'courses and learning paths',noCertificates:'No certificates match your search.',copied:'Email copied.',copyFallback:"I couldn't copy it automatically. You can select the email or open your email application.",darkTheme:'Switch to dark theme',lightTheme:'Switch to light theme',pause:'Pause animations',resume:'Enable animations',reduced:'Reduced motion is enabled by your system',closeProject:'Close project',closeCertificates:'Close certificates',menuOpen:'Open menu',menuClose:'Close menu',inProgress:'In progress',viewProject:'Explore project',allProjects:'Full archive'
  };
  const categoryLabels = {es:{ai:'IA aplicada',web:'Web / Backend',desktop:'Escritorio',network:'Redes / Soporte'},en:{ai:'Applied AI',web:'Web / Backend',desktop:'Desktop',network:'Networks / Support'}};
  const state = {lang:['es','en'].includes(store.get('jeh-lang','es')) ? store.get('jeh-lang','es') : 'es',filter:'all',query:'',project:null};
  const t = key => (state.lang === 'en' ? english[key] : spanish[key]) ?? spanish[key] ?? key;
  const localized = object => object?.[state.lang] ?? object?.es ?? '';
  let revealObserver;
  if ('IntersectionObserver' in window) {
    revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
    }), {threshold:.07,rootMargin:'0px 0px -25px 0px'});
    document.documentElement.classList.add('reveal-ready');
  }
  function observeReveals(scope=document) { $$('.reveal',scope).forEach(el => revealObserver?.observe(el)); }
  const tags = project => '<div class="tech-tags">' + project.tech.map(x=>'<span>'+esc(x)+'</span>').join('') + '</div>';
  const imageAlt = project => (project.imageType === 'screenshot' ? t('realImage') : t('conceptImage')) + ': ' + project.name;
  const link = (url,label,classes='text-link') => '<a class="'+classes+'" href="'+esc(safeUrl(url))+'" target="_blank" rel="noopener noreferrer">'+esc(label)+icon('arrow')+'</a>';
  function renderProjects() {
    const searching = state.query.trim().length > 0;
    const items = data.projects.filter(project => {
      const haystack = normalize([project.name,project.summary.es,project.summary.en,...project.tech,...project.categories].join(' '));
      return (state.filter === 'all' || project.categories.includes(state.filter)) && (!searching || haystack.includes(normalize(state.query.trim())));
    }).filter(project => searching || state.filter !== 'all' || project.featured);
    $('#project-grid').innerHTML = items.map(project => {
      const index = String(data.projects.indexOf(project)+1).padStart(2,'0');
      return '<article class="project-card reveal"><button class="project-visual" data-project="'+esc(project.id)+'" aria-label="'+esc(t('viewProject')+' '+project.name)+'"><img src="'+esc(project.image)+'" alt="'+esc(imageAlt(project))+'" width="800" height="420" loading="lazy"></button><div class="project-body"><div class="project-meta"><span class="project-index">/ '+index+'</span><span>'+esc(project.categories.map(c=>categoryLabels[state.lang][c]).join(' · '))+'</span></div><h3>'+esc(project.name)+'</h3><p class="project-summary">'+esc(localized(project.summary))+'</p>'+tags(project)+'<div class="project-links"><button class="text-link" data-project="'+esc(project.id)+'" aria-label="'+esc(t('caseButton')+' '+project.name)+'">'+esc(t('caseButton'))+icon('arrow')+'</button>'+link(project.url,t('code'))+'</div></div></article>';
    }).join('');
    $('#empty-projects').hidden = items.length > 0;
    $('#project-count').textContent = String(items.length).padStart(2,'0')+' / '+data.projects.length+' '+t(state.filter === 'all'&&!searching?'selected':'results');
    $('#project-archive').hidden = state.filter !== 'all' || searching;
    observeReveals($('#project-grid'));
  }
  function renderArchive() {
    const rest = data.projects.filter(p=>!p.featured);
    $('#archive-count').textContent = rest.length+' '+t('more');
    $('#archive-list').innerHTML = rest.map(project=>'<div class="archive-row"><h3 class="archive-name">'+esc(project.name)+'</h3><p>'+esc(localized(project.summary))+'</p><button data-project="'+esc(project.id)+'" aria-label="'+esc(t('viewProject')+' '+project.name)+'">'+icon('arrow')+'</button></div>').join('');
  }
  function renderEducation() {
    $('#education-timeline').innerHTML = data.education.map(item=>'<article class="education-row reveal"><span class="education-year">'+esc(item.period.startsWith('En curso')?t('inProgress'):item.period)+'</span><div><h3>'+esc(localized(item.title))+'</h3><p class="institution">'+esc(item.institution)+'</p><p class="education-detail">'+esc(localized(item.detail))+'</p></div></article>').join('');
    $('#tool-groups').innerHTML = data.toolGroups.map(group=>'<div class="tool-group reveal"><div><h3>'+esc(localized(group.title))+'</h3><small>'+esc(localized(group.context))+'</small></div><div class="tool-chips">'+group.tools.map(tool=>'<span>'+esc(tool)+'</span>').join('')+'</div></div>').join('');
    $('#cert-count').textContent = data.certifications.length;
    observeReveals($('#education-timeline'));
    observeReveals($('#tool-groups'));
  }
  function renderCertificates() {
    const query = normalize($('#cert-search').value.trim());
    const certs = data.certifications.filter(cert=>normalize([cert.name,cert.platform,cert.institution,...(cert.tags||[]),cert.year].join(' ')).includes(query));
    $('#cert-results').textContent = certs.length+' '+t('of')+' '+data.certifications.length+' '+t('certificateCount');
    $('#cert-list').innerHTML = certs.length ? certs.map(cert=>'<article class="cert-row"><div><h3>'+esc(cert.name)+'</h3><p>'+esc(cert.institution||cert.platform)+' / '+esc(cert.year)+'</p></div><a class="text-link" href="'+esc(safeUrl(cert.url))+'" target="_blank" rel="noopener noreferrer" aria-label="'+esc(t('certificate')+': '+cert.name)+'">'+esc(t('certificate'))+icon('arrow')+'</a></article>').join('') : '<p class="empty-state">'+esc(t('noCertificates'))+'</p>';
  }
  function renderCase(project) {
    $('#case-content').innerHTML = '<img class="case-image" src="'+esc(project.image)+'" alt="'+esc(imageAlt(project))+'" width="800" height="420"><p class="image-caption">'+esc(project.imageType==='screenshot'?t('realImage'):t('conceptImage'))+'</p><div class="case-copy"><h2 id="case-title">'+esc(project.name)+'</h2><p class="case-role">'+esc(localized(project.role))+'</p>'+tags(project)+'<div class="case-body"><div><h3>'+esc(t('problem'))+'</h3><p>'+esc(localized(project.problem))+'</p></div><div><h3>'+esc(t('contribution'))+'</h3><ul>'+localized(project.contributions).map(item=>'<li>'+esc(item)+'</li>').join('')+'</ul></div></div><p class="case-limit"><strong>'+esc(t('scope'))+' / </strong>'+esc(localized(project.limits))+'</p><div class="case-actions">'+link(project.url,t('code'),'button button-primary')+(project.download?link(project.download,t('download'),'button button-secondary'):'')+(project.demo?link(project.demo,t('demo'),'button button-secondary'):'')+'</div></div>';
  }
  let previousHash = '#proyectos';
  let syncingHash = false;
  function openProject(id, changeHash=true) {
    const project = data.projects.find(item=>item.id===id);
    if (!project) return;
    state.project = project;
    renderCase(project);
    const dialog = $('#project-dialog');
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
    if (changeHash) {
      previousHash = location.hash.startsWith('#proyecto/') ? '#proyectos' : location.hash || '#proyectos';
      try { history.replaceState(null,'','#proyecto/'+encodeURIComponent(id)); } catch {}
    }
  }
  $('#project-dialog').addEventListener('close',()=>{
    state.project = null;
    if (!syncingHash && location.hash.startsWith('#proyecto/')) try { history.replaceState(null,'',previousHash); } catch {}
  });
  function syncFromHash() {
    if (location.hash.startsWith('#proyecto/')) {
      try { openProject(decodeURIComponent(location.hash.slice(10)),false); } catch {}
    } else if ($('#project-dialog').open) { syncingHash=true; $('#project-dialog').close(); syncingHash=false; }
  }
  function setMenu(open) {
    $('#mobile-nav').hidden = !open;
    $('#menu-toggle').setAttribute('aria-expanded',String(open));
    $('#menu-toggle').setAttribute('aria-label',t(open?'menuClose':'menuOpen'));
    $('#menu-toggle use').setAttribute('href',open?'#i-close':'#i-menu');
  }
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  function refreshControls() {
    const dark = document.documentElement.dataset.theme === 'dark';
    $('#theme-toggle').setAttribute('aria-label',t(dark?'lightTheme':'darkTheme'));
    $('#theme-toggle').title = t(dark?'lightTheme':'darkTheme');
    const enabled = document.documentElement.dataset.motion !== 'off';
    $('#motion-toggle').disabled = false;
    $('#motion-toggle').setAttribute('aria-pressed',String(enabled));
    $('#motion-toggle').setAttribute('aria-label',t(enabled?'pause':'resume'));
    $('#motion-toggle').title = reduced.matches&&!enabled?t('reduced')+' / '+t('resume'):t(enabled?'pause':'resume');
    $('#motion-toggle use').setAttribute('href',enabled?'#i-pause':'#i-play');
  }
  function applyLanguage() {
    document.documentElement.lang = state.lang;
    $$('[data-i18n]').forEach(el=>el.textContent=t(el.dataset.i18n));
    $$('[data-i18n-html]').forEach(el=>el.innerHTML=t(el.dataset.i18nHtml)); // Only fixed, author-owned translations contain markup.
    $$('[data-i18n-placeholder]').forEach(el=>{el.placeholder=t(el.dataset.i18nPlaceholder);el.setAttribute('aria-label',el.placeholder);});
    $('#language-toggle').innerHTML = state.lang==='es'?'ES<span>/ EN</span>':'EN<span>/ ES</span>';
    $('#language-toggle').setAttribute('aria-label',state.lang==='es'?'Switch to English':'Cambiar a español');
    document.title = state.lang==='es'?'Juan Esteban Herrera · Ideas que se vuelven herramientas':'Juan Esteban Herrera · Ideas that turn into useful tools';
    $('#project-dialog [data-close-dialog]').setAttribute('aria-label',t('closeProject'));
    $('#cert-dialog [data-close-dialog]').setAttribute('aria-label',t('closeCertificates'));
    $('.hero-atelier').setAttribute('aria-label',state.lang==='es'?'Proyecto reciente: xIas':'Latest project: xIas');
    $('.desktop-nav').setAttribute('aria-label',state.lang==='es'?'Navegación principal':'Main navigation');
    $('#mobile-nav').setAttribute('aria-label',state.lang==='es'?'Navegación móvil':'Mobile navigation');
    $('#project-filters').setAttribute('aria-label',state.lang==='es'?'Filtrar proyectos':'Filter projects');
    $('.hero-atelier button[data-project]').setAttribute('aria-label',t('viewProject')+' xIas');
    $('.brand').setAttribute('aria-label',state.lang==='es'?'Juan Esteban Herrera, inicio':'Juan Esteban Herrera, home');
    $('.scroll-link').setAttribute('aria-label',state.lang==='es'?'Ir a proyectos':'Go to projects');
    $('.back-top').setAttribute('aria-label',state.lang==='es'?'Volver al inicio':'Back to top');
    $('.workspace-shot').alt=state.lang==='es'?'Captura real de xIas: tabla editable con datos de demostración':'Real xIas screenshot: editable table with demonstration data';
    renderProjects(); renderArchive(); renderEducation(); renderCertificates(); refreshControls(); setMenu(false);
    if (state.project) renderCase(state.project);
  }
  let toastTimer;
  function toast(message) {
    clearTimeout(toastTimer); $('#toast').textContent=message; $('#toast').hidden=false;
    toastTimer=setTimeout(()=>{$('#toast').hidden=true;},4200);
  }
  document.addEventListener('click',event=>{
    const projectButton=event.target.closest('[data-project]');
    if (projectButton) openProject(projectButton.dataset.project);
    const closeButton=event.target.closest('[data-close-dialog]');
    if (closeButton) closeButton.closest('dialog').close();
  });
  $$('dialog').forEach(dialog=>{
    let downOnBackdrop=false;
    dialog.addEventListener('pointerdown',event=>{downOnBackdrop=event.target===dialog;});
    dialog.addEventListener('click',event=>{if(downOnBackdrop&&event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}downOnBackdrop=false;});
  });
  $('#project-filters').addEventListener('click',event=>{
    const button=event.target.closest('[data-filter]'); if(!button)return;
    state.filter=button.dataset.filter;
    $$('#project-filters button').forEach(el=>{const active=el===button;el.classList.toggle('active',active);el.setAttribute('aria-pressed',String(active));});
    renderProjects();
  });
  $('#project-search').addEventListener('input',event=>{state.query=event.target.value;renderProjects();});
  $('#reset-search').addEventListener('click',()=>{
    state.query='';state.filter='all';$('#project-search').value='';
    $$('#project-filters button').forEach(button=>{const active=button.dataset.filter==='all';button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});
    renderProjects();$('#project-search').focus();
  });
  $('#language-toggle').addEventListener('click',()=>{state.lang=state.lang==='es'?'en':'es';store.set('jeh-lang',state.lang);applyLanguage();});
  $('#theme-toggle').addEventListener('click',()=>{
    const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';
    document.documentElement.dataset.theme=theme;store.set('jeh-theme',theme);
    $('meta[name="theme-color"]').content=theme==='dark'?'#181e1c':'#f2f0e8';
    refreshControls();window.dispatchEvent(new CustomEvent('themechange'));
  });
  $('#motion-toggle').addEventListener('click',()=>{
    
    const motion=document.documentElement.dataset.motion==='off'?'on':'off';
    document.documentElement.dataset.motion=motion;store.set('jeh-motion',motion);
    refreshControls();window.dispatchEvent(new CustomEvent('motionchange'));
  });
  reduced.addEventListener('change',()=>{
    document.documentElement.dataset.motion=store.get('jeh-motion',reduced.matches?'off':'on');
    refreshControls();window.dispatchEvent(new CustomEvent('motionchange'));
  });
  $('#menu-toggle').addEventListener('click',()=>setMenu($('#mobile-nav').hidden));
  $$('#mobile-nav a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
  document.addEventListener('keydown',event=>{if(event.key==='Escape')setMenu(false);});
  matchMedia('(min-width: 761px)').addEventListener('change',event=>{if(event.matches)setMenu(false);});
  $('#open-certificates').addEventListener('click',()=>{renderCertificates();$('#cert-dialog').showModal();$('#cert-search').focus();});
  $('#cert-search').addEventListener('input',renderCertificates);
  $('#copy-email').addEventListener('click',async()=>{
    try { if(!navigator.clipboard)throw new Error('Clipboard unavailable');await navigator.clipboard.writeText(data.profile.email);toast(t('copied')); }
    catch {toast(t('copyFallback'));}
  });
  let scrollQueued=false;
  const updateProgress=()=>{scrollQueued=false;const max=document.documentElement.scrollHeight-innerHeight;$('#reading-progress').style.width=(max>0?Math.min(100,scrollY/max*100):0)+'%';};
  addEventListener('scroll',()=>{if(!scrollQueued){scrollQueued=true;requestAnimationFrame(updateProgress);}},{passive:true});
  addEventListener('resize',updateProgress,{passive:true});
  if('IntersectionObserver' in window) {
    const sectionObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      $$('.desktop-nav a').forEach(a=>{if(a.hash==='#'+entry.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});
    }),{rootMargin:'-20% 0px -60% 0px',threshold:0});
    $$('main section[id]').forEach(section=>sectionObserver.observe(section));
  }
  $('#current-year').textContent=String(new Date().getFullYear());
  applyLanguage(); observeReveals(); updateProgress(); syncFromHash();
  addEventListener('hashchange',syncFromHash);
})();
