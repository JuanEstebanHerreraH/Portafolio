(() => {
'use strict';
const data=window.PORTFOLIO_DATA;
if(!data?.projects?.length)return;
const $=(selector,scope=document)=>scope.querySelector(selector);
const $$=(selector,scope=document)=>[...scope.querySelectorAll(selector)];
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=value=>String(value??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const icon=name=>'<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-'+name+'"/></svg>';
const safe=value=>{try{const u=new URL(value);return u.protocol==='https:'?u.href:'#';}catch{return '#';}};
const storage={get(key,fallback){try{return localStorage.getItem(key)??fallback;}catch{return fallback;}},set(key,value){try{localStorage.setItem(key,value);}catch{}}};
const es={};
$$('[data-i18n]').forEach(el=>es[el.dataset.i18n]=el.textContent);
$$('[data-i18n-html]').forEach(el=>es[el.dataset.i18nHtml]=el.innerHTML);
$$('[data-i18n-placeholder]').forEach(el=>es[el.dataset.i18nPlaceholder]=el.placeholder);
Object.assign(es,{
all:'Todas',caseButton:'Explorar por dentro',code:'Ver código',download:'Descargas',demo:'Abrir aplicación',realImage:'CAPTURA REAL',conceptImage:'ILUSTRACIÓN DEL PROYECTO',close:'Cerrar proyecto',
previous:'Herramienta anterior',next:'Herramienta siguiente',select:'Seleccionar',see:'Ver',how:'Cómo se usa',purpose:'Qué resuelve',inside:'Cómo lo construí',role:'Mi participación',limits:'Alcance y consideraciones',knowledge:'CONOCIMIENTOS',practice:'PRÁCTICA Y EVIDENCIA',
copied:'Correo copiado.',copyFailed:'Puedes seleccionar el correo o abrir tu aplicación de correo.',pause:'Pausar animaciones',resume:'Activar animaciones',dark:'Cambiar a tema oscuro',light:'Cambiar a tema claro',openMenu:'Abrir menú',closeMenu:'Cerrar menú',
allCount:'herramientas',shown:'mostrados',of:'de',courses:'credenciales de aprendizaje',more:'Mostrar más de esta área',noCerts:'No encontré ese tema en esta área. Prueba otra área o borra la búsqueda.',openCert:'Abrir evidencia',course:'Curso',path:'Ruta de formación',evidence:'Evidencia formativa',
credentialTechStatus:'TITULACIÓN OBTENIDA',credentialTechTitle:'Técnico Profesional en Soporte de Sistemas e Informática',credentialTechBody:'Base en soporte, hardware, sistemas y redes. El punto de apoyo de mi trabajo con infraestructura y aplicaciones.',credentialTechDate:'GRADUADO · 26 FEB 2026',
credentialOneStatus:'FORMACIÓN ESPECIALIZADA',credentialOneTitle:'Oracle Next Education · Alura',credentialOneBody:'Java y Spring Boot: programación orientada a objetos, APIs REST, persistencia y pruebas. Aplicado en la colaboración TechMind / LogiTree.',credentialOneDate:'BACKEND · 2025 — 2026',credentialOneLink:'Ver ruta de formación',
credentialEngStatus:'CARRERA EN CURSO',credentialEngTitle:'Ingeniería de Sistemas',credentialEngBody:'Formación por ciclos en la CUN: programa de 10 semestres y tres titulaciones. Continúo el ciclo tecnológico y el camino a ingeniería.',credentialEngDate:'PRÓXIMO HITO · TECNÓLOGO PREVISTO EN 2027',
cvDev:'Desarrollo de software',cvDevDesc:'Web, backend, escritorio e integración de IA local.',cvSupport:'Soporte TI y redes',cvSupportDesc:'Sistemas, diagnóstico, redes y utilidades de soporte.',cvOffice:'Ofimática y asistencia digital',cvOfficeDesc:'Excel, macros, documentación y automatización con IA.',cvEng:'Software development · ENG',cvEngDesc:'English version for junior software development opportunities.',downloadPdf:'Descargar PDF'
});
const en={
skip:'Skip to content',brandSub:'DEVELOPMENT · SYSTEMS · TOOLS',navTools:'Tools',navSkills:'Capabilities',navLearning:'Education',navContact:'Contact',downloadCV:'Download CV',
available:'OPEN TO JUNIOR OPPORTUNITIES',heroTitle:'Turning ideas<br>into <span>useful tools.</span>',heroIntro:"I'm Juan Esteban Herrera. I build software, connect systems and automate tasks to make them simpler.",enterTools:'Explore the tools',viewSkills:'Explore my capabilities',location:'BOGOTÁ, COLOMBIA',remote:'REMOTE · HYBRID IN BOGOTÁ',sceneCaption:'EVERY IDEA OPENS A POSSIBILITY',beaconData:'ORGANIZE DATA',beaconImage:'TRANSFORM IMAGES',beaconKnowledge:'CONNECT KNOWLEDGE',beaconTrace:'TRACE PROCESSES',beaconFiles:'ORGANIZE FILES',sceneHint:'Choose a point. Discover what I built.',heroSignature:'SOFTWARE WITH A PURPOSE, FROM IDEA TO USE.',scrollExplore:'EXPLORE',
toolsKicker:'PROJECTS IN ACTION',toolsTitle:'A tool.<br><span>A way to solve it.</span>',toolsLead:'Explore what each application does, how it works and what I built inside it. The code and available downloads are open.',allTools:'All',ai:'Local AI',web:'Web & backend',desktop:'Desktop',networks:'Networks',searchTools:'Search my tools',chooseTool:'CHOOSE A TOOL',emptyTools:"I couldn't find that tool.",emptyHint:'Try Java, networking, AI or an application name.',clearSearch:'Clear search',projectNote:'Personal, academic and collaborative projects. Each case describes its scope and my contribution.',
skillsKicker:'KNOWLEDGE IN ACTION',skillsTitle:'What I can<br><span>put to work.</span>',skillsLead:'Development, infrastructure and information workflows. Choose an area to explore knowledge, practice and supporting projects.',
professionalProfile:'PROFESSIONAL PROFILE',profileRole:'Professional technician · Junior software development',profileSummary:'I build web and desktop applications, integrate local AI and create networking and file utilities. My practice comes from personal, university and collaborative projects; I continue studying Systems Engineering at CUN.',focusLabel:'AREAS OF INTEREST',focusValue:'Junior development · IT support & networks · Automation & digital assistance',workMode:'WORK MODE',workModeValue:'Remote first · Hybrid in Bogotá',languagesLabel:'LANGUAGES',languagesValue:'Native Spanish · English A2',profileCV:'Explore all four CV versions',
educationKicker:'EDUCATION & DIRECTION',educationTitle:'The foundation.<br><span>And what comes next.</span>',educationLead:'An awarded technical qualification, specialized development training and a university degree in progress.',learningKicker:'LEARNING BY AREA',learningTitle:'What I have studied and where I apply it.',learningLead:'Choose an area to explore courses and learning paths. Each link opens the evidence from its institution.',searchLearning:'Search a topic or institution',moreLearning:'Show more from this area',
cvKicker:'MY BACKGROUND, FOR YOUR AREA',cvTitle:'Four perspectives.<br><span>One professional profile.</span>',cvLead:'Download the CV that fits your area. PDF format, ATS structure and a software development version in English.',
contactKicker:"LET'S TALK",contactTitle:'What would you like<br><span>to set in motion?</span>',contactLead:'A junior opportunity, an application or a task that could work better. You can reach me here.',emailLabel:'EMAIL',copyEmail:'Copy email',backTop:'Back to top ↑',caseHeader:'INSIDE THE TOOL',
all:'All',caseButton:'Explore inside',code:'Browse code',download:'Downloads',demo:'Open application',realImage:'REAL SCREENSHOT',conceptImage:'PROJECT ILLUSTRATION',close:'Close project',previous:'Previous tool',next:'Next tool',select:'Select',see:'Explore',how:'How it works',purpose:'What it solves',inside:'How I built it',role:'My contribution',limits:'Scope and considerations',knowledge:'KNOWLEDGE',practice:'PRACTICE & EVIDENCE',copied:'Email copied.',copyFailed:'You can select the email or open your email application.',pause:'Pause animations',resume:'Enable animations',dark:'Switch to dark theme',light:'Switch to light theme',openMenu:'Open menu',closeMenu:'Close menu',allCount:'tools',shown:'shown',of:'of',courses:'learning credentials',more:'Show more from this area',noCerts:'No matching topic in this area. Try another area or clear the search.',openCert:'Open evidence',course:'Course',path:'Learning path',evidence:'Learning evidence',
credentialTechStatus:'QUALIFICATION AWARDED',credentialTechTitle:'Professional Technician in Systems Support and IT',credentialTechBody:'A foundation in support, hardware, systems and networks. It supports my work with infrastructure and applications.',credentialTechDate:'GRADUATED · FEB 26, 2026',credentialOneStatus:'SPECIALIZED TRAINING',credentialOneTitle:'Oracle Next Education · Alura',credentialOneBody:'Java and Spring Boot: object-oriented programming, REST APIs, persistence and testing. Applied in the TechMind / LogiTree collaboration.',credentialOneDate:'BACKEND · 2025 — 2026',credentialOneLink:'View learning path',credentialEngStatus:'UNIVERSITY DEGREE IN PROGRESS',credentialEngTitle:'Systems Engineering',credentialEngBody:'Education by cycles at CUN: a ten-semester program with three qualifications. Continuing the technological cycle and the path toward engineering.',credentialEngDate:'NEXT MILESTONE · TECHNOLOGICAL QUALIFICATION EXPECTED IN 2027',
cvDev:'Software development',cvDevDesc:'Web, backend, desktop and local AI integration.',cvSupport:'IT support & networking',cvSupportDesc:'Systems, diagnostics, networking and support utilities.',cvOffice:'Office tools & digital assistance',cvOfficeDesc:'Excel, macros, documentation and AI-assisted automation.',cvEng:'Software development · ENG',cvEngDesc:'English version for junior software development opportunities.',downloadPdf:'Download PDF'
};
Object.assign(es,{"available":"DESARROLLO JUNIOR · SOPORTE TI","heroTitle":"Menos tareas.<br><span>Más posibilidades.</span>","heroIntro":"Soy Juan Esteban. Creo aplicaciones, automatizo procesos y conecto sistemas.","enterTools":"Ver lo que construyo","viewSkills":"Mis habilidades","toolsKicker":"PROYECTOS EN ACCIÓN","toolsTitle":"Hecho para<br><span>resolver algo.</span>","toolsLead":"Elige una herramienta. Mira qué hace y cómo la construí.","skillsKicker":"LO QUE PUEDO APORTAR","skillsTitle":"Habilidades.<br><span>Con proyectos detrás.</span>","skillsLead":"Desarrollo, redes y automatización. Explora un área.","educationKicker":"MI FORMACIÓN","educationTitle":"Una base técnica.<br><span>En evolución.</span>","educationLead":"Técnico graduado, formación ONE/Alura e Ingeniería de Sistemas en curso.","cvKicker":"DESCARGA MI PERFIL","cvTitle":"Mi CV.<br><span>En tu área.</span>","cvLead":"Cuatro versiones PDF: desarrollo, soporte, ofimática y desarrollo en inglés.","contactKicker":"CONTACTO","contactTitle":"¿Construimos<br><span>algo útil?</span>","contactLead":"Disponible para desarrollo junior, soporte y automatización.","professionalProfile":"EXPERIENCIA EN PROYECTOS","profileRole":"Técnico profesional · Desarrollador junior","profileSummary":"Full stack en TechMind / LogiTree, con énfasis backend. En Dotaciones App desarrollé interfaz y base de datos. También creo herramientas personales con IA local.","focusLabel":"MI PRÁCTICA","focusValue":"Personal · Académica · Colaborativa","profileCV":"Descargar mi CV","learningTitle":"Cursos y certificados","learningLead":"Organizados por área, con sus evidencias.","heroSignature":"WEB · ESCRITORIO · REDES · AUTOMATIZACIÓN","learningToggle":"Ver cursos y certificados","demoKicker":"DE UNA TAREA A UNA HERRAMIENTA","demoData":"Datos","demoImage":"Imágenes","demoNetwork":"Redes","demoNote":"Demo ilustrativa · respuestas preparadas · sin subir datos.","footerRole":"DESARROLLO · SISTEMAS · AUTOMATIZACIÓN","credentialTechBody":"Soporte de sistemas, hardware, Windows y redes.","credentialOneBody":"Java, Spring Boot y APIs REST. Aplicado en TechMind / LogiTree.","credentialEngBody":"Programa de 10 semestres y tres titulaciones. Continúo el ciclo tecnológico.","credentialEngDate":"TECNÓLOGO PREVISTO EN 2027"});
Object.assign(en,{"heroTitle":"Fewer tasks.<br><span>More possibilities.</span>","heroIntro":"I'm Juan Esteban. I build applications, automate processes and connect systems.","available":"JUNIOR DEVELOPMENT · IT SUPPORT","enterTools":"See what I build","viewSkills":"My skills","toolsTitle":"Built to<br><span>solve something.</span>","toolsLead":"Choose a tool. See what it does and how I built it.","skillsTitle":"Skills.<br><span>Backed by projects.</span>","skillsLead":"Development, networking and automation. Explore an area.","educationTitle":"A technical foundation.<br><span>Still growing.</span>","educationLead":"Technical qualification, ONE/Alura training and a Systems Engineering degree in progress.","cvTitle":"My CV.<br><span>For your area.</span>","cvLead":"Four PDFs: development, IT support, office tools and development in English.","professionalProfile":"PROJECT EXPERIENCE","profileSummary":"Full stack contributor to TechMind / LogiTree, focused on backend. I built the interface and database for Dotaciones App. I also create personal tools with local AI.","focusLabel":"MY PRACTICE","focusValue":"Personal · Academic · Collaborative","profileCV":"Download my CV","contactTitle":"Let's build<br><span>something useful.</span>","contactLead":"Available for junior development, IT support and automation.","learningTitle":"Courses and certificates","learningLead":"Organized by area, with supporting evidence.","learningToggle":"Explore courses and certificates","demoKicker":"FROM A TASK TO A TOOL","demoData":"Data","demoImage":"Images","demoNetwork":"Networks","demoNote":"Illustrative demo · prepared responses · no data uploaded.","footerRole":"DEVELOPMENT · SYSTEMS · AUTOMATION","heroSignature":"WEB · DESKTOP · NETWORKS · AUTOMATION","credentialTechBody":"Systems, hardware, Windows and network support.","credentialOneBody":"Java, Spring Boot and REST APIs. Applied in TechMind / LogiTree.","credentialEngBody":"Ten-semester program with three qualifications. Continuing the technological cycle.","credentialEngDate":"TECHNOLOGICAL QUALIFICATION EXPECTED IN 2027","backTop":"Back to top ↑"});
Object.assign(es,{profileTitle:"En equipo.<br><span>Y por iniciativa propia.</span>"});
Object.assign(en,{profileTitle:"In a team.<br><span>And on my own initiative.</span>"});
Object.assign(es,{"heroTitle":"Convertir ideas<br>en <span>herramientas.</span>","skillsKicker":"HABILIDADES EN MOVIMIENTO","skillsTitle":"Toca. Prueba.<br><span>Así trabajo.</span>","skillsLead":"Elige una habilidad y actívala.","navSkills":"Habilidades","assistantLabel":"ASISTENTE VISUAL","projectNote":"Práctica personal, académica y en equipo."});
Object.assign(en,{"heroTitle":"Turning ideas<br>into <span>useful tools.</span>","skillsKicker":"SKILLS IN MOTION","skillsTitle":"Touch. Try.<br><span>See how I work.</span>","skillsLead":"Pick a skill. Put it into action.","navSkills":"Skills","assistantLabel":"VISUAL ASSISTANT","projectNote":"Personal, academic and team practice."});
const state={lang:storage.get('jeh-v3-lang','es')==='en'?'en':'es',filter:'all',query:'',selected:data.projects[0].id,skill:'development',learning:'backend',limit:6,caseProject:null};
const t=key=>(state.lang==='en'?en[key]:es[key])??es[key]??key;
const loc=value=>value?.[state.lang]??value?.es??'';
const categories={es:{ai:'IA APLICADA',web:'WEB / BACKEND',desktop:'ESCRITORIO',network:'REDES / SOPORTE'},en:{ai:'APPLIED AI',web:'WEB / BACKEND',desktop:'DESKTOP',network:'NETWORKS / SUPPORT'}};
const projectById=id=>data.projects.find(p=>p.id===id);
const external=(url,label,classes='text-link')=>'<a href="'+esc(safe(url))+'" class="'+classes+'" target="_blank" rel="noopener noreferrer">'+esc(label)+icon('arrow')+'</a>';
const imageLabel=p=>t(p.imageType==='screenshot'?'realImage':'conceptImage');
function filteredProjects(){
return data.projects.filter(p=>(state.filter==='all'||p.categories.includes(state.filter))&&norm([p.name,p.summary.es,p.summary.en,...p.tech,...p.categories].join(' ')).includes(norm(state.query.trim())));
}
function flowHtml(p,classes='stage-flow'){return '<div class="'+classes+'">'+loc(p.flow).map((step,i)=>(i?icon('right'):'')+'<span>'+esc(step)+'</span>').join('')+'</div>';}
function renderStage(){
const p=projectById(state.selected);if(!p)return;
$('#tool-stage').innerHTML='<article class="stage-content"><div class="stage-display"><span class="stage-visual-label">'+esc(imageLabel(p))+'</span><div class="stage-screen"><img src="'+esc(p.image)+'" alt="'+esc(imageLabel(p)+': '+p.name)+'" width="800" height="420" loading="lazy" decoding="async"><button class="stage-open" data-open-case="'+esc(p.id)+'" aria-label="'+esc(t('caseButton')+' '+p.name)+'">'+icon('arrow')+'</button></div></div><div class="stage-topline"><span>'+esc(p.categories.map(c=>categories[state.lang][c]).join(' · '))+'</span><div class="stage-navigation"><button data-cycle="-1" aria-label="'+esc(t('previous'))+'">'+icon('right')+'</button><button data-cycle="1" aria-label="'+esc(t('next'))+'">'+icon('right')+'</button></div></div><div class="stage-copy"><div><h3>'+esc(p.name)+'</h3><div class="stage-tags">'+p.tech.map(v=>'<span>'+esc(v)+'</span>').join('')+'</div></div><div><p class="stage-summary">'+esc(loc(p.summary))+'</p>'+flowHtml(p)+'</div></div><div class="stage-actions"><button class="button button-dark" data-open-case="'+esc(p.id)+'" aria-label="'+esc(t('caseButton')+' '+p.name)+'">'+esc(t('caseButton'))+icon('right')+'</button>'+(p.download?external(p.download,t('download'),'button button-outline'):p.demo?external(p.demo,t('demo'),'button button-outline'):'')+external(p.url,t('code'))+'</div></article>';
}
function renderTools(){
const projects=filteredProjects();
const oldLeft=$('#tool-list').scrollLeft,oldTop=$('#tool-list').scrollTop;
if(!projects.some(p=>p.id===state.selected))state.selected=projects[0]?.id??'';
$('#project-count').textContent=projects.length+' / '+data.projects.length;
$('#tool-list').innerHTML=projects.map(p=>'<button class="tool-choice" data-select-tool="'+esc(p.id)+'" aria-pressed="'+(p.id===state.selected)+'" aria-label="'+esc(t('select')+' '+p.name)+'"><span class="choice-point" aria-hidden="true"></span><span><strong>'+esc(p.name)+'</strong><small>'+esc(p.categories.map(c=>categories[state.lang][c]).join(' · '))+'</small></span>'+icon('right')+'</button>').join('');
$('#tool-list').scrollLeft=oldLeft;$('#tool-list').scrollTop=oldTop;
$('#empty-tools').hidden=projects.length>0;
$('.tool-explorer').hidden=!projects.length;
$$('#project-filters button').forEach(button=>{const active=button.dataset.filter===state.filter;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});
if(projects.length)renderStage();
}
function selectTool(id,{scroll=false,hash=true,reset=false}={}){
if(!projectById(id))return;
if(reset){state.filter='all';state.query='';$('#project-search').value='';}
state.selected=id;renderTools();
const rail=$('#tool-list'),choice=$$('.tool-choice').find(button=>button.dataset.selectTool===id);
if(choice){const item=choice.getBoundingClientRect(),box=rail.getBoundingClientRect();if(matchMedia('(max-width:700px)').matches){if(item.left<box.left)rail.scrollLeft+=item.left-box.left;else if(item.right>box.right)rail.scrollLeft+=item.right-box.right;}else{if(item.top<box.top)rail.scrollTop+=item.top-box.top;else if(item.bottom>box.bottom)rail.scrollTop+=item.bottom-box.bottom;}}
if(hash)try{history.replaceState(null,'','#herramienta/'+encodeURIComponent(id));}catch{}
if(scroll)$('#herramientas').scrollIntoView({behavior:document.documentElement.dataset.motion==='off'?'instant':'smooth'});
}
let previousHash='#herramientas';
function renderCase(p){
$('#case-content').innerHTML='<div class="case-hero"><div class="case-hero-copy"><p class="case-category">'+esc(p.categories.map(c=>categories[state.lang][c]).join(' · '))+'</p><h2 id="case-title">'+esc(p.name)+'</h2><p>'+esc(loc(p.summary))+'</p></div><figure class="case-preview"><img src="'+esc(p.image)+'" alt="'+esc(imageLabel(p)+': '+p.name)+'" width="800" height="420" loading="lazy" decoding="async"><figcaption>'+esc(imageLabel(p))+'</figcaption></figure></div><div class="case-main">'+flowHtml(p,'case-workflow')+'<div class="case-sections"><div><h3>'+esc(t('purpose'))+'</h3><p>'+esc(loc(p.problem))+'</p><div class="case-role"><h3>'+esc(t('role'))+'</h3><p>'+esc(loc(p.role))+'</p></div><div class="case-tech">'+p.tech.map(tech=>'<span>'+esc(tech)+'</span>').join('')+'</div></div><div class="case-implementation"><h3>'+esc(t('inside'))+'</h3><ul>'+loc(p.contributions).map(item=>'<li>'+esc(item)+'</li>').join('')+'</ul></div></div><p class="case-limit"><strong>'+esc(t('limits'))+' / </strong>'+esc(loc(p.limits))+'</p><div class="case-actions">'+external(p.url,t('code'),'button button-dark')+(p.download?external(p.download,t('download'),'button button-outline'):'')+(p.demo?external(p.demo,t('demo'),'button button-outline'):'')+'</div></div>';
}
function openCase(id,changeHash=true){
const p=projectById(id);if(!p)return;
state.caseProject=p;renderCase(p);
const dialog=$('#project-dialog');
if(!dialog.open)dialog.showModal();
dialog.scrollTop=0;
if(changeHash){previousHash=location.hash.startsWith('#proyecto/')?'#herramientas':location.hash||'#herramientas';try{history.replaceState(null,'','#proyecto/'+encodeURIComponent(id));}catch{}}
}
function syncHash(){
try{
if(location.hash.startsWith('#proyecto/'))openCase(decodeURIComponent(location.hash.slice(10)),false);
else if(location.hash.startsWith('#herramienta/'))selectTool(decodeURIComponent(location.hash.slice(13)),{reset:true,hash:false,scroll:true});
}catch{}
}
$('#project-dialog').addEventListener('close',()=>{state.caseProject=null;if(location.hash.startsWith('#proyecto/'))try{history.replaceState(null,'',previousHash);}catch{}});
function renderSkills(){
const shortLabels={es:{development:'Backend / Web',desktop:'Escritorio + IA',networks:'Redes',office:'Excel / Ofimática',automation:'Automatización'},en:{development:'Backend / Web',desktop:'Desktop + AI',networks:'Networks',office:'Excel / Office',automation:'Automation'}};
$('#skill-tabs').innerHTML=data.skills.map(skill=>'<button id="skill-'+esc(skill.id)+'" role="tab" data-skill="'+esc(skill.id)+'" aria-selected="'+(skill.id===state.skill)+'" aria-controls="skill-panel" tabindex="'+(skill.id===state.skill?'0':'-1')+'">'+esc(shortLabels[state.lang][skill.id])+icon('right')+'</button>').join('');
$('#skill-tabs').setAttribute('aria-orientation','horizontal');
const panel=$('#skill-panel');
panel.setAttribute('aria-labelledby','skill-'+state.skill);
panel.dataset.scene=state.skill;
const rail=$('#skill-tabs'),active=$$('[data-skill]').find(button=>button.dataset.skill===state.skill);
if(active){const item=active.getBoundingClientRect(),box=rail.getBoundingClientRect();if(item.left<box.left)rail.scrollLeft+=item.left-box.left;else if(item.right>box.right)rail.scrollLeft+=item.right-box.right;}
window.dispatchEvent(new CustomEvent('skillschange'));
}
const learningAreas=[
{id:'backend',es:'Backend y datos',en:'Backend & data',context:{es:'Java, Spring Boot, persistencia, APIs, SQL y Python. Una base aplicada en LogiTree, Café Almacén y proyectos de datos.',en:'Java, Spring Boot, persistence, APIs, SQL and Python. A foundation applied in LogiTree, Café Almacén and data projects.'}},
{id:'ai',es:'IA y automatización',en:'AI & automation',context:{es:'IA generativa, prompts, productividad y Spring AI. Complementan el desarrollo asistido por IA y la integración de modelos en mis herramientas.',en:'Generative AI, prompts, productivity and Spring AI. These support AI-assisted development and model integration in my tools.'}},
{id:'web',es:'Web y herramientas',en:'Web & tools',context:{es:'JavaScript, HTML, CSS, diseño adaptable y control de versiones. Son bases de las interfaces que construyo.',en:'JavaScript, HTML, CSS, responsive design and version control. Foundations of the interfaces I build.'}},
{id:'professional',es:'Trabajo y aprendizaje',en:'Work & learning',context:{es:'Agilidad, comunicación, organización y aprendizaje autónomo. Conocimientos para trabajar en proyectos y equipos.',en:'Agility, communication, organization and independent learning. Knowledge for working in projects and teams.'}},
{id:'systems',es:'Sistemas e inglés',en:'Systems & English',context:{es:'Formación complementaria universitaria en ciberseguridad e inglés. Mi nivel declarado de inglés es A2; la preparación CCNA sigue en curso.',en:'Additional university learning in cybersecurity and English. My declared English level is A2; CCNA preparation is ongoing.'}}
];
function certArea(cert){const title=norm(cert.name);if(/inteligencia|chatgpt|\bia\b|prompt|spring ai/.test(title))return 'ai';if(/ingles|ciberseguridad/.test(title))return 'systems';if(/java(?!script)|spring|sql|flask|python/.test(title))return 'backend';if(/html|css|javascript|git y github|logica de programacion|principiante en programacion/.test(title))return 'web';return 'professional';}
function certType(cert){return /^formacion/i.test(norm(cert.name))?t('path'):/^curso|^java|^spring|^html|^git|^flask|^ingenieria de prompt/i.test(norm(cert.name))?t('course'):t('evidence');}
function renderCredentials(){
const institution='Corporación Unificada Nacional de Educación Superior · CUN';
const route=data.certifications.find(c=>c.name==='Formación Java y Spring Boot');
$('#credential-milestones').innerHTML=[
{status:'credentialTechStatus',title:'credentialTechTitle',body:'credentialTechBody',date:'credentialTechDate',institution,done:true},
{status:'credentialOneStatus',title:'credentialOneTitle',body:'credentialOneBody',date:'credentialOneDate',institution:'Oracle · Alura Latam',url:route?.url,done:true},
{status:'credentialEngStatus',title:'credentialEngTitle',body:'credentialEngBody',date:'credentialEngDate',institution,done:false}
].map(item=>'<article class="milestone"><span class="milestone-brand" aria-hidden="true">'+(item.status==='credentialOneStatus'?'ONE':'CUN')+'</span><p class="milestone-status">'+(item.done?icon('check'):'<span class="choice-point"></span>')+esc(t(item.status))+'</p><h3>'+esc(t(item.title))+'</h3><p class="milestone-institution">'+esc(item.institution)+'</p><p class="milestone-description">'+esc(t(item.body))+'</p><p class="milestone-foot">'+esc(t(item.date))+'</p>'+(item.url?external(item.url,t('credentialOneLink')):'')+'</article>').join('');
}
function renderLearning(){
$('#learning-tabs').innerHTML=learningAreas.map(area=>'<button data-learning="'+area.id+'" aria-pressed="'+(area.id===state.learning)+'">'+esc(area[state.lang])+'<span>'+data.certifications.filter(c=>certArea(c)===area.id).length+'</span></button>').join('');
$('#learning-context').textContent=loc(learningAreas.find(a=>a.id===state.learning).context);
const query=norm($('#cert-search').value.trim());
const certs=data.certifications.filter(c=>certArea(c)===state.learning&&norm([c.name,c.institution,c.platform,c.year,...(c.tags||[])].join(' ')).includes(query)).sort((a,b)=>Number(/^formacion/i.test(norm(b.name)))-Number(/^formacion/i.test(norm(a.name))));
const shown=certs.slice(0,state.limit);
$('#cert-results').textContent=shown.length+' '+t('of')+' '+certs.length+' '+t('courses');
$('#cert-list').innerHTML=shown.length?shown.map(cert=>'<article class="cert-row"><div><h4>'+esc(cert.name)+'</h4><p>'+esc(cert.institution||cert.platform)+' · '+esc(cert.year)+'</p><small>'+esc(certType(cert))+'</small></div><a href="'+esc(safe(cert.url))+'" target="_blank" rel="noopener noreferrer" aria-label="'+esc(t('openCert')+': '+cert.name)+'">'+icon('arrow')+'</a></article>').join(''):'<p class="explorer-note">'+esc(t('noCerts'))+'</p>';
$('#more-certificates').hidden=shown.length>=certs.length;
$('#more-certificates').innerHTML='<span>'+esc(t('more'))+' ('+(certs.length-shown.length)+')</span>'+icon('down');
}
function renderCVs(){
const cvs=[
{title:'cvDev',description:'cvDevDesc',lang:'ES',file:'CV-Juan-Esteban-Desarrollo.pdf'},
{title:'cvSupport',description:'cvSupportDesc',lang:'ES',file:'CV-Juan-Esteban-Soporte-TI.pdf'},
{title:'cvOffice',description:'cvOfficeDesc',lang:'ES',file:'CV-Juan-Esteban-Ofimatica.pdf'},
{title:'cvEng',description:'cvEngDesc',lang:'EN',file:'CV-Juan-Esteban-Desarrollo-ENG.pdf'}
];
$('#cv-list').innerHTML=cvs.map(cv=>'<article class="cv-row"><span class="cv-lang">'+cv.lang+'</span><div><h3>'+esc(t(cv.title))+'</h3><p>'+esc(t(cv.description))+'</p><span class="cv-meta">PDF · ATS · '+(cv.lang==='ES'?'ESPAÑOL':'ENGLISH')+'</span></div><a class="cv-download" href="assets/cv/'+cv.file+'" download="'+cv.file+'" aria-label="'+esc(t('downloadPdf')+' — '+t(cv.title))+'">'+'<span>PDF</span>'+icon('download')+'</a></article>').join('');
}
function setMenu(open){$('#mobile-nav').hidden=!open;$('#menu-toggle').setAttribute('aria-expanded',String(open));$('#menu-toggle').setAttribute('aria-label',t(open?'closeMenu':'openMenu'));$('#menu-toggle use').setAttribute('href',open?'#i-close':'#i-menu');}
function controls(){
const dark=document.documentElement.dataset.theme==='dark';
$('#theme-toggle').setAttribute('aria-label',t(dark?'light':'dark'));$('#theme-toggle').title=t(dark?'light':'dark');
const motion=document.documentElement.dataset.motion!=='off';
$('#motion-toggle').setAttribute('aria-label',t(motion?'pause':'resume'));$('#motion-toggle').title=t(motion?'pause':'resume');$('#motion-toggle').setAttribute('aria-pressed',String(motion));$('#motion-toggle use').setAttribute('href',motion?'#i-pause':'#i-play');
}
function applyLanguage(){
document.documentElement.lang=state.lang;
$$('[data-i18n]').forEach(el=>el.textContent=t(el.dataset.i18n));
$$('[data-i18n-html]').forEach(el=>el.innerHTML=t(el.dataset.i18nHtml));
$$('[data-i18n-placeholder]').forEach(el=>{el.placeholder=t(el.dataset.i18nPlaceholder);el.setAttribute('aria-label',el.placeholder);});
$('#language-toggle').innerHTML=state.lang==='es'?'ES<span>/ EN</span>':'EN<span>/ ES</span>';$('#language-toggle').setAttribute('aria-label',state.lang==='es'?'Switch to English':'Cambiar a español');
$('#project-dialog [data-close-dialog]').setAttribute('aria-label',t('close'));
$('.brand').setAttribute('aria-label',state.lang==='es'?'Juan Esteban Herrera, inicio':'Juan Esteban Herrera, home');
$('.tool-universe').setAttribute('aria-label',state.lang==='es'?'Escena interactiva de herramientas':'Interactive tool scene');
$('.hero-menu').setAttribute('aria-label',state.lang==='es'?'Explorar el portafolio':'Explore the portfolio');
$('.desktop-nav').setAttribute('aria-label',state.lang==='es'?'Navegación principal':'Main navigation');
$('#mobile-nav').setAttribute('aria-label',state.lang==='es'?'Navegación móvil':'Mobile navigation');
$('#skill-tabs').setAttribute('aria-label',state.lang==='es'?'Áreas de conocimiento':'Knowledge areas');
$('#project-filters').setAttribute('aria-label',state.lang==='es'?'Filtrar herramientas':'Filter tools');
$('#learning-tabs').setAttribute('aria-label',state.lang==='es'?'Filtrar formación':'Filter learning');
$('.hero-bottom a').setAttribute('aria-label',t('enterTools'));
document.title=state.lang==='es'?'Juan Esteban Herrera · Ideas en movimiento':'Juan Esteban Herrera · Ideas in motion';
renderTools();renderSkills();renderCredentials();renderLearning();renderCVs();controls();setMenu(false);
if(state.caseProject)renderCase(state.caseProject);
window.dispatchEvent(new CustomEvent('languagechange'));
}
let toastTimer;
function toast(message){clearTimeout(toastTimer);$('#toast').textContent=message;$('#toast').hidden=false;toastTimer=setTimeout(()=>$('#toast').hidden=true,4000);}
document.addEventListener('click',event=>{
const select=event.target.closest('[data-select-tool]');if(select){const fromList=!!select.closest('.tool-list');const id=select.dataset.selectTool;selectTool(id,{reset:!!select.closest('.hero'),scroll:!!select.closest('.hero')});if(fromList)$$('.tool-choice').find(button=>button.dataset.selectTool===id)?.focus({preventScroll:true});}
const open=event.target.closest('[data-open-case]');if(open)openCase(open.dataset.openCase);
if(event.target.closest('[data-close-dialog]'))$('#project-dialog').close();
const cycle=event.target.closest('[data-cycle]');if(cycle){const list=filteredProjects();const index=list.findIndex(p=>p.id===state.selected);selectTool(list[(index+Number(cycle.dataset.cycle)+list.length)%list.length].id);$$('[data-cycle]').find(button=>button.dataset.cycle===cycle.dataset.cycle)?.focus({preventScroll:true});}
});
$('#project-filters').addEventListener('click',event=>{const button=event.target.closest('[data-filter]');if(!button)return;state.filter=button.dataset.filter;renderTools();});
$('#project-search').addEventListener('input',event=>{state.query=event.target.value;renderTools();});
$('#reset-search').addEventListener('click',()=>{state.query='';state.filter='all';$('#project-search').value='';renderTools();$('#project-search').focus();});
$('#skill-tabs').addEventListener('click',event=>{const button=event.target.closest('[data-skill]');if(button){state.skill=button.dataset.skill;renderSkills();$('#skill-'+state.skill).focus({preventScroll:true});}});
$('#skill-tabs').addEventListener('keydown',event=>{
const keys=['ArrowDown','ArrowRight','ArrowUp','ArrowLeft','Home','End'];if(!keys.includes(event.key))return;event.preventDefault();
let index=data.skills.findIndex(s=>s.id===state.skill);
if(event.key==='Home')index=0;else if(event.key==='End')index=data.skills.length-1;else index=(index+(['ArrowDown','ArrowRight'].includes(event.key)?1:-1)+data.skills.length)%data.skills.length;
state.skill=data.skills[index].id;renderSkills();$('#skill-'+state.skill).focus({preventScroll:true});
});
$('#learning-tabs').addEventListener('click',event=>{const button=event.target.closest('[data-learning]');if(!button)return;state.learning=button.dataset.learning;state.limit=6;$('#cert-search').value='';renderLearning();$$('[data-learning]').find(item=>item.dataset.learning===state.learning)?.focus({preventScroll:true});});
$('#cert-search').addEventListener('input',()=>{state.limit=6;renderLearning();});
$('#more-certificates').addEventListener('click',()=>{state.limit+=6;renderLearning();});
$('#language-toggle').addEventListener('click',()=>{state.lang=state.lang==='es'?'en':'es';storage.set('jeh-v3-lang',state.lang);applyLanguage();});
$('#theme-toggle').addEventListener('click',()=>{const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=theme;storage.set('jeh-v3-theme',theme);controls();});
$('#motion-toggle').addEventListener('click',()=>{const motion=document.documentElement.dataset.motion==='off'?'on':'off';document.documentElement.dataset.motion=motion;storage.set('jeh-v3-motion',motion);controls();window.dispatchEvent(new CustomEvent('motionchange'));});
$('#menu-toggle').addEventListener('click',()=>setMenu($('#mobile-nav').hidden));
$$('#mobile-nav a').forEach(link=>link.addEventListener('click',()=>setMenu(false)));
addEventListener('keydown',event=>{if(event.key==='Escape')setMenu(false);});
matchMedia('(min-width:981px)').addEventListener('change',event=>{if(event.matches)setMenu(false);});
$('#copy-email').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(data.profile.email);toast(t('copied'));}catch{toast(t('copyFailed'));}});
let backdropDown=false;
$('#project-dialog').addEventListener('pointerdown',event=>{backdropDown=event.target===$('#project-dialog');});
$('#project-dialog').addEventListener('click',event=>{if(backdropDown&&event.target===$('#project-dialog')){const rect=event.target.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)event.target.close();}backdropDown=false;});
$('#current-year').textContent=String(new Date().getFullYear());
applyLanguage();syncHash();addEventListener('hashchange',syncHash);
})();
