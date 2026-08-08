/**
 * i18n.js v1.1 — Sistema Multiidioma
 *
 * Idiomas integrados: ES EN FR ZH PT DE IT JA KO RU AR HI
 * Idiomas adicionales: MyMemory API (traducción automática, gratis)
 */
const I18N = (() => {
  let current = 'es';

  /* ═══════════════════════════════════════════════
     TRANSLATIONS — 12 idiomas integrados
  ═══════════════════════════════════════════════ */
  const T = {
    es: {
      page:{ title:'Portafolio — Juan Esteban Herrera' },
      ui:{ selectLang:'Seleccionar idioma', otherLang:'Otro idioma (traducción automática vía API):', translate:'Traducir' },
      nav:{ about:'SOBRE MÍ', projects:'PROYECTOS', certifications:"FORMACIÓN", applications:'APPS', techstack:'TECH', contact:'CONTACTO' },
      hero:{ available:"Disponible para trabajar", line1:"Software de escritorio", line2:"y herramientas de red.", subtitle:"Aplicaciones que corren en tu equipo y no dependen de la nube. Rust, .NET, Flutter y Tauri.", seeAll:"Ver todos los proyectos", contact:"Contacto", mProjects:"proyectos", mApps:"apps descargables", mLangs:"lenguajes", cta:'' },
      about:{ title:'Sobre Mí', intro:'Estudiante de Ingeniería de Sistemas y Técnico Profesional en Soporte de Sistemas e Informática. Construyo software que resuelve problemas reales: offline-first, multiplataforma y con enfoque en privacidad del usuario.', professional:'Trabajo con Java, Dart, TypeScript, Python y C# a lo largo de la pila completa. Certificado Oracle ONE · En camino a CCNA. Creo que la mejor forma de aprender es construyendo — por eso cada proyecto que hago resuelve un problema concreto.', stat1:'Proyectos', stat2:'Certificaciones', stat3:'Años construyendo' },
      techstack:{ title:'Entorno Tecnológico' }, projects:{ title:"Proyectos", view:'Ver →' },
      certs:{ title:"Formación", sub:"El título y la ruta de Oracle sostienen el resto. Debajo, el detalle completo de cursos.", showAll:"Ver el detalle de cursos" },
      apps:{ title:"Aplicaciones", download:"Descargar" },
      interests:{ title:'Intereses', security:'Ciberseguridad', networking:'Redes', dev:'Desarrollo', ai:'IA / ML' },
      contact:{ title:'Contacto', intro:'¿Tienes un proyecto en mente? Conectemos.' }, filter:{ all:'Todas' },
      footer:{ built:'Construido con', by:'por' },
    },
    en: {
      page:{ title:'Portfolio — Juan Esteban Herrera' },
      ui:{ selectLang:'Select Language', otherLang:'Other language (auto-translate via API):', translate:'Translate' },
      nav:{ about:'ABOUT', projects:'PROJECTS', certifications:"EDUCATION", applications:'APPS', techstack:'TECH', contact:'CONTACT' },
      hero:{ available:"Open to work", line1:"Desktop software", line2:"and network tools.", subtitle:"Apps that run on your machine, with no cloud dependency. Rust, .NET, Flutter and Tauri.", seeAll:"See all projects", contact:"Contact", mProjects:"projects", mApps:"downloadable apps", mLangs:"languages", cta:'' },
      about:{ title:'About Me', intro:'Systems Engineering student and certified IT Support Technician. I build software that solves real problems: offline-first, cross-platform, privacy-focused.', professional:'I work across the full stack with Java, Dart, TypeScript, Python and C#. Oracle ONE certified · On the path to CCNA. I believe the best way to learn is by building — every project I make solves a concrete problem.', stat1:'Projects', stat2:'Certifications', stat3:'Years building' },
      techstack:{ title:'Tech Stack' }, projects:{ title:"Projects", view:'View →' },
      certs:{ title:"Education", sub:"The degree and the Oracle track hold up the rest. Full course detail below.", showAll:"Show course detail" },
      apps:{ title:"Applications", download:"Download" },
      interests:{ title:'Interests', security:'Cybersecurity', networking:'Networking', dev:'Development', ai:'AI / ML' },
      contact:{ title:'Contact', intro:'Have a project in mind? Let\'s connect.' }, filter:{ all:'All' },
      footer:{ built:'Built with', by:'by' },
    },
    fr: {
      page:{ title:'Portfolio — Juan Esteban Herrera' },
      ui:{ selectLang:'Choisir la langue', otherLang:'Autre langue (traduction automatique via API) :', translate:'Traduire' },
      nav:{ about:'À PROPOS', projects:'PROJETS', certifications:"FORMATION", applications:'APPS', techstack:'TECH', contact:'CONTACT' },
      hero:{ available:"Disponible", line1:"Logiciels de bureau", line2:"et outils réseau.", subtitle:"Des applications qui tournent sur votre machine, sans dépendre du cloud. Rust, .NET, Flutter et Tauri.", seeAll:"Voir tous les projets", contact:"Contact", mProjects:"projets", mApps:"apps à télécharger", mLangs:"langages", cta:'' },
      about:{ title:'À Propos', intro:'Passionné par la technologie, les réseaux et le développement logiciel orienté vers des solutions réelles et évolutives.', professional:'Expérience en développement d\'applications, administration réseau et création de produits numériques.', stat1:'Projets', stat2:'Certifications', stat3:'Années' },
      techstack:{ title:'Technologies' }, projects:{ title:"Projets", view:'Voir →' },
      certs:{ title:"Formation", sub:"Le diplôme et le parcours Oracle soutiennent le reste. Détail des cours ci-dessous.", showAll:"Voir le détail des cours" },
      apps:{ title:"Applications", download:"Télécharger" },
      interests:{ title:'Intérêts', security:'Cybersécurité', networking:'Réseaux', dev:'Développement', ai:'IA / ML' },
      contact:{ title:'Contact', intro:'Vous avez un projet en tête ? Connectons-nous.' },
      footer:{ built:'Créé avec', by:'par' },
    },
    zh: {
      page:{ title:'作品集 — Juan Esteban Herrera' },
      ui:{ selectLang:'选择语言', otherLang:'其他语言（通过API自动翻译）：', translate:'翻译' },
      nav:{ about:'关于我', projects:'项目', certifications:"教育", applications:'应用', interests:'兴趣', contact:'联系' },
      hero:{ available:"求职中", line1:"桌面软件", line2:"与网络工具。", subtitle:"在本机运行、不依赖云端的应用。Rust、.NET、Flutter 和 Tauri。", seeAll:"查看全部项目", contact:"联系", mProjects:"项目", mApps:"可下载应用", mLangs:"语言", cta:'' },
      about:{ title:'关于我', intro:'热衷于技术、网络和软件开发，专注于真实可扩展的解决方案。', professional:'拥有应用程序开发、网络管理和数字产品创建经验，致力于持续学习和高质量代码。', stat1:'项目', stat2:'证书', stat3:'年' },
      techstack:{ title:'技术栈' }, projects:{ title:"项目", view:'查看 →' },
      certs:{ title:"教育背景", sub:"学位与 Oracle 路径是基础，下方为完整课程明细。", showAll:"查看课程明细" },
      apps:{ title:"应用程序", download:"下载" },
      interests:{ title:'兴趣', security:'网络安全', networking:'网络', dev:'开发', ai:'人工智能' },
      contact:{ title:'联系方式', intro:'有项目想法？让我们联系吧。' },
      footer:{ built:'用', by:'由' },
    },
    pt: {
      page:{ title:'Portfólio — Juan Esteban Herrera' },
      ui:{ selectLang:'Selecionar idioma', otherLang:'Outro idioma (tradução automática via API):', translate:'Traduzir' },
      nav:{ about:'SOBRE MIM', projects:'PROJETOS', certifications:"FORMAÇÃO", applications:'APPS', interests:'INTERESSES', contact:'CONTATO' },
      hero:{ available:"Disponível para trabalhar", line1:"Software de desktop", line2:"e ferramentas de rede.", subtitle:"Aplicações que rodam no seu equipamento, sem depender da nuvem. Rust, .NET, Flutter e Tauri.", seeAll:"Ver todos os projetos", contact:"Contato", mProjects:"projetos", mApps:"apps para baixar", mLangs:"linguagens", cta:'' },
      about:{ title:'Sobre Mim', intro:'Apaixonado por tecnologia, redes e desenvolvimento de software focado em soluções reais e escaláveis.', professional:'Experiência em desenvolvimento de aplicações, administração de redes e criação de produtos digitais. Comprometido com aprendizado contínuo e código de qualidade.', stat1:'Projetos', stat2:'Certificações', stat3:'Anos' },
      techstack:{ title:'Stack Técnico' }, projects:{ title:"Projetos", view:'Ver →' },
      certs:{ title:"Formação", sub:"O diploma e a trilha da Oracle sustentam o resto. Abaixo, o detalhe dos cursos.", showAll:"Ver o detalhe dos cursos" },
      apps:{ title:"Aplicações", download:"Baixar" },
      interests:{ title:'Interesses', security:'Cibersegurança', networking:'Redes', dev:'Desenvolvimento', ai:'IA / ML' },
      contact:{ title:'Contato', intro:'Tem um projeto em mente? Vamos nos conectar.' },
      footer:{ built:'Construído com', by:'por' },
    },
    de: {
      page:{ title:'Portfolio — Juan Esteban Herrera' },
      ui:{ selectLang:'Sprache wählen', otherLang:'Andere Sprache (automatische Übersetzung via API):', translate:'Übersetzen' },
      nav:{ about:'ÜBER MICH', projects:'PROJEKTE', certifications:"AUSBILDUNG", applications:'APPS', interests:'INTERESSEN', contact:'KONTAKT' },
      hero:{ available:"Offen für Angebote", line1:"Desktop-Software", line2:"und Netzwerk-Tools.", subtitle:"Anwendungen, die auf dem eigenen Rechner laufen, ohne Cloud. Rust, .NET, Flutter und Tauri.", seeAll:"Alle Projekte ansehen", contact:"Kontakt", mProjects:"Projekte", mApps:"Apps zum Download", mLangs:"Sprachen", cta:'' },
      about:{ title:'Über Mich', intro:'Leidenschaftlich für Technologie, Netzwerke und Softwareentwicklung mit Fokus auf reale, skalierbare Lösungen.', professional:'Erfahrung in der Anwendungsentwicklung, Netzwerkadministration und Erstellung digitaler Produkte.', stat1:'Projekte', stat2:'Zertifikate', stat3:'Jahre' },
      projects:{ title:"Projekte", view:'Ansehen →' },
      certs:{ title:"Ausbildung", sub:"Abschluss und Oracle-Track tragen den Rest. Unten die vollständige Kursliste.", showAll:"Kursdetails anzeigen" },
      apps:{ title:"Anwendungen", download:"Herunterladen" },
      interests:{ title:'Interessen', security:'Cybersicherheit', networking:'Netzwerke', dev:'Entwicklung', ai:'KI / ML' },
      contact:{ title:'Kontakt', intro:'Hast du ein Projekt im Sinn? Lass uns verbinden.' },
      footer:{ built:'Erstellt mit', by:'von' },
    },
    it: {
      page:{ title:'Portfolio — Juan Esteban Herrera' },
      ui:{ selectLang:'Seleziona lingua', otherLang:'Altra lingua (traduzione automatica via API):', translate:'Traduci' },
      nav:{ about:'CHI SONO', projects:'PROGETTI', certifications:"FORMAZIONE", applications:'APPS', interests:'INTERESSI', contact:'CONTATTI' },
      hero:{ available:"Disponibile", line1:"Software desktop", line2:"e strumenti di rete.", subtitle:"Applicazioni che girano sul tuo computer, senza dipendere dal cloud. Rust, .NET, Flutter e Tauri.", seeAll:"Vedi tutti i progetti", contact:"Contatto", mProjects:"progetti", mApps:"app scaricabili", mLangs:"linguaggi", cta:'' },
      about:{ title:'Chi Sono', intro:'Appassionato di tecnologia, reti e sviluppo software con focus su soluzioni reali e scalabili.', professional:'Esperienza nello sviluppo di applicazioni, amministrazione di reti e creazione di prodotti digitali.', stat1:'Progetti', stat2:'Certificazioni', stat3:'Anni' },
      projects:{ title:"Progetti", view:'Vedi →' },
      certs:{ title:"Formazione", sub:"Il titolo e il percorso Oracle sostengono il resto. Sotto, il dettaglio dei corsi.", showAll:"Vedi il dettaglio dei corsi" },
      apps:{ title:"Applicazioni", download:"Scarica" },
      interests:{ title:'Interessi', security:'Cybersicurezza', networking:'Reti', dev:'Sviluppo', ai:'IA / ML' },
      contact:{ title:'Contatti', intro:'Hai un progetto in mente? Connettiamoci.' },
      footer:{ built:'Creato con', by:'da' },
    },
    ja: {
      page:{ title:'ポートフォリオ — Juan Esteban Herrera' },
      ui:{ selectLang:'言語を選択', otherLang:'他の言語（APIによる自動翻訳）：', translate:'翻訳' },
      nav:{ about:'について', projects:'プロジェクト', certifications:"学歴", applications:'アプリ', interests:'興味', contact:'連絡先' },
      hero:{ available:"求職中", line1:"デスクトップソフトウェア", line2:"とネットワークツール。", subtitle:"クラウドに依存せず手元の端末で動くアプリ。Rust、.NET、Flutter、Tauri。", seeAll:"すべてのプロジェクトを見る", contact:"お問い合わせ", mProjects:"プロジェクト", mApps:"ダウンロード可能なアプリ", mLangs:"言語", cta:'' },
      about:{ title:'私について', intro:'テクノロジー、ネットワーク、ソフトウェア開発に情熱を持ち、実用的でスケーラブルなソリューションに注力しています。', professional:'アプリケーション開発、ネットワーク管理、デジタル製品作成の経験があります。', stat1:'プロジェクト', stat2:'認定資格', stat3:'年' },
      projects:{ title:"プロジェクト", view:'見る →' },
      certs:{ title:"学歴", sub:"学位と Oracle のコースが土台です。以下に全コースの詳細。", showAll:"コースの詳細を見る" },
      apps:{ title:"アプリケーション", download:"ダウンロード" },
      interests:{ title:'興味', security:'サイバーセキュリティ', networking:'ネットワーク', dev:'開発', ai:'AI / ML' },
      contact:{ title:'連絡先', intro:'プロジェクトがありますか？つながりましょう。' },
      footer:{ built:'作成：', by:'by' },
    },
    ko: {
      page:{ title:'포트폴리오 — Juan Esteban Herrera' },
      ui:{ selectLang:'언어 선택', otherLang:'다른 언어 (API 자동 번역):', translate:'번역' },
      nav:{ about:'소개', projects:'프로젝트', certifications:"학력", applications:'앱', interests:'관심사', contact:'연락처' },
      hero:{ available:"구직 중", line1:"데스크톱 소프트웨어", line2:"와 네트워크 도구.", subtitle:"클라우드 없이 내 컴퓨터에서 실행되는 앱. Rust, .NET, Flutter, Tauri.", seeAll:"모든 프로젝트 보기", contact:"연락처", mProjects:"프로젝트", mApps:"다운로드 앱", mLangs:"언어", cta:'' },
      about:{ title:'소개', intro:'기술, 네트워크 및 소프트웨어 개발에 열정적이며 실용적이고 확장 가능한 솔루션에 집중합니다.', professional:'애플리케이션 개발, 네트워크 관리 및 디지털 제품 생성 경험이 있습니다.', stat1:'프로젝트', stat2:'자격증', stat3:'년' },
      projects:{ title:"프로젝트", view:'보기 →' },
      certs:{ title:"학력", sub:"학위와 Oracle 과정이 기반입니다. 아래는 전체 강의 목록.", showAll:"강의 상세 보기" },
      apps:{ title:"애플리케이션", download:"다운로드" },
      interests:{ title:'관심사', security:'사이버 보안', networking:'네트워크', dev:'개발', ai:'AI / ML' },
      contact:{ title:'연락처', intro:'프로젝트가 있으신가요? 연결해 봅시다.' },
      footer:{ built:'제작:', by:'by' },
    },
    ru: {
      page:{ title:'Портфолио — Juan Esteban Herrera' },
      ui:{ selectLang:'Выбрать язык', otherLang:'Другой язык (автоперевод через API):', translate:'Перевести' },
      nav:{ about:'ОБО МНЕ', projects:'ПРОЕКТЫ', certifications:"ОБРАЗОВАНИЕ", applications:'APPS', interests:'ИНТЕРЕСЫ', contact:'КОНТАКТ' },
      hero:{ available:"Открыт к предложениям", line1:"Настольное ПО", line2:"и сетевые инструменты.", subtitle:"Приложения, которые работают на вашем компьютере без облака. Rust, .NET, Flutter и Tauri.", seeAll:"Все проекты", contact:"Контакты", mProjects:"проектов", mApps:"приложений", mLangs:"языков", cta:'' },
      about:{ title:'Обо Мне', intro:'Увлечён технологиями, сетями и разработкой программного обеспечения с фокусом на реальные, масштабируемые решения.', professional:'Опыт в разработке приложений, администрировании сетей и создании цифровых продуктов.', stat1:'Проекты', stat2:'Сертификаты', stat3:'Лет' },
      projects:{ title:"Проекты", view:'Смотреть →' },
      certs:{ title:"Образование", sub:"Диплом и трек Oracle — основа. Ниже полный список курсов.", showAll:"Показать курсы" },
      apps:{ title:"Приложения", download:"Скачать" },
      interests:{ title:'Интересы', security:'Кибербезопасность', networking:'Сети', dev:'Разработка', ai:'ИИ / ML' },
      contact:{ title:'Контакт', intro:'Есть проект? Давайте свяжемся.' },
      footer:{ built:'Создано с', by:'автор' },
    },
    ar: {
      page:{ title:'ملف الأعمال — Juan Esteban Herrera' },
      ui:{ selectLang:'اختر اللغة', otherLang:'لغة أخرى (ترجمة تلقائية عبر API):', translate:'ترجمة' },
      nav:{ about:'عني', projects:'مشاريع', certifications:"التعليم", applications:'التطبيقات', interests:'اهتمامات', contact:'تواصل' },
      hero:{ available:"متاح للعمل", line1:"برمجيات سطح المكتب", line2:"وأدوات الشبكات.", subtitle:"تطبيقات تعمل على جهازك دون الاعتماد على السحابة. Rust و‏.NET و‏Flutter و‏Tauri.", seeAll:"عرض كل المشاريع", contact:"تواصل", mProjects:"مشاريع", mApps:"تطبيقات للتحميل", mLangs:"لغات", cta:'' },
      about:{ title:'عني', intro:'شغوف بالتكنولوجيا والشبكات وتطوير البرمجيات مع التركيز على حلول حقيقية وقابلة للتوسع.', professional:'خبرة في تطوير التطبيقات وإدارة الشبكات وإنشاء المنتجات الرقمية.', stat1:'مشاريع', stat2:'شهادات', stat3:'سنوات' },
      projects:{ title:"المشاريع", view:'عرض →' },
      certs:{ title:"التعليم", sub:"الشهادة ومسار Oracle هما الأساس. التفاصيل الكاملة للدورات أدناه.", showAll:"عرض تفاصيل الدورات" },
      apps:{ title:"التطبيقات", download:"تحميل" },
      interests:{ title:'الاهتمامات', security:'الأمن السيبراني', networking:'الشبكات', dev:'التطوير', ai:'الذكاء الاصطناعي' },
      contact:{ title:'تواصل معي', intro:'هل لديك مشروع في ذهنك؟ لنتواصل.' },
      footer:{ built:'بُني بـ', by:'بواسطة' },
    },
    hi: {
      page:{ title:'पोर्टफोलियो — Juan Esteban Herrera' },
      ui:{ selectLang:'भाषा चुनें', otherLang:'अन्य भाषा (API के माध्यम से स्वचालित अनुवाद):', translate:'अनुवाद करें' },
      nav:{ about:'मेरे बारे में', projects:'प्रोजेक्ट्स', certifications:"शिक्षा", applications:'एप', interests:'रुचियाँ', contact:'संपर्क' },
      hero:{ available:"काम के लिए उपलब्ध", line1:"डेस्कटॉप सॉफ़्टवेयर", line2:"और नेटवर्क टूल्स।", subtitle:"ऐसे ऐप्स जो आपके कंप्यूटर पर चलते हैं, क्लाउड पर निर्भर नहीं। Rust, .NET, Flutter और Tauri।", seeAll:"सभी प्रोजेक्ट देखें", contact:"संपर्क", mProjects:"प्रोजेक्ट", mApps:"डाउनलोड करने योग्य ऐप्स", mLangs:"भाषाएँ", cta:'' },
      about:{ title:'मेरे बारे में', intro:'तकनीक, नेटवर्किंग और सॉफ्टवेयर डेवलपमेंट के प्रति जुनूनी, वास्तविक और स्केलेबल समाधानों पर ध्यान देते हुए।', professional:'एप्लिकेशन डेवलपमेंट, नेटवर्क प्रशासन और डिजिटल उत्पाद निर्माण में अनुभव।', stat1:'प्रोजेक्ट्स', stat2:'प्रमाण पत्र', stat3:'वर्ष' },
      projects:{ title:"प्रोजेक्ट", view:'देखें →' },
      certs:{ title:"शिक्षा", sub:"डिग्री और Oracle ट्रैक आधार हैं। नीचे पूरा कोर्स विवरण।", showAll:"कोर्स विवरण देखें" },
      apps:{ title:"एप्लिकेशन", download:"डाउनलोड" },
      interests:{ title:'रुचियाँ', security:'साइबर सुरक्षा', networking:'नेटवर्किंग', dev:'विकास', ai:'AI / ML' },
      contact:{ title:'संपर्क', intro:'कोई प्रोजेक्ट है? जुड़ते हैं।' },
      footer:{ built:'बनाया गया', by:'द्वारा' },
    },
  };

  /* ═══ API Translation (MyMemory) ═══ */
  const API_CACHE = JSON.parse(localStorage.getItem('i18n-api-cache') || '{}');

  async function fetchAPITranslation(langCode) {
    const cacheKey = `api-${langCode}`;
    if (API_CACHE[cacheKey]) return API_CACHE[cacheKey];

    // Collect English strings to translate
    const en = T['en'];
    const strings = flattenObj(en);
    const keys    = Object.keys(strings);
    const values  = Object.values(strings);

    const statusEl = document.getElementById('lang-api-status');
    if (statusEl) { statusEl.textContent = '⟳ Traduciendo...'; statusEl.className = 'lang-api-status loading'; }

    try {
      // Batch: join all strings with a separator, translate once
      const separator = ' ||| ';
      const combined  = values.join(separator);
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(combined)}&langpair=en|${langCode}`;
      const resp = await fetch(url);
      if (!resp.ok) throw new Error('API error ' + resp.status);
      const data = await resp.json();
      const translated = data.responseData.translatedText.split(separator);

      // Rebuild nested object
      const flat = {};
      keys.forEach((k, i) => { flat[k] = translated[i] || values[i]; });
      const nested = unflattenObj(flat);

      API_CACHE[cacheKey] = nested;
      try { localStorage.setItem('i18n-api-cache', JSON.stringify(API_CACHE)); } catch(_) {}

      if (statusEl) { statusEl.textContent = '✓ Traducción aplicada'; statusEl.className = 'lang-api-status ok'; }
      return nested;

    } catch (err) {
      if (statusEl) { statusEl.textContent = '✗ Error: ' + err.message; statusEl.className = 'lang-api-status err'; }
      return null;
    }
  }

  /* Flatten nested obj to dot-notation */
  function flattenObj(obj, prefix = '') {
    return Object.keys(obj).reduce((acc, k) => {
      const pre = prefix ? prefix + '.' + k : k;
      if (typeof obj[k] === 'object' && obj[k] !== null) Object.assign(acc, flattenObj(obj[k], pre));
      else acc[pre] = obj[k];
      return acc;
    }, {});
  }
  function unflattenObj(flat) {
    const out = {};
    for (const [key, val] of Object.entries(flat)) {
      key.split('.').reduce((o, k, i, arr) => {
        if (i === arr.length - 1) o[k] = val;
        else o[k] = o[k] || {};
        return o[k];
      }, out);
    }
    return out;
  }

  /* ═══ Apply translations ═══ */
  function getVal(obj, path) {
    return path.split('.').reduce((a, p) => a && a[p], obj) ?? null;
  }

  function apply(langObj, langCode) {
    document.documentElement.lang = langCode;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const v = getVal(langObj, el.getAttribute('data-i18n'));
      if (v) el.textContent = v;
    });
    const title = getVal(langObj, 'page.title');
    if (title) document.title = title;
  }

  /* ═══ Update UI buttons ═══ */
  function updateButtons(langCode) {
    document.querySelectorAll('.lang-opt').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === langCode);
    });
    const label = document.getElementById('globe-lang-label');
    if (label) label.textContent = langCode.toUpperCase().slice(0, 3);
    // Close modal
    const modal = document.getElementById('lang-modal');
    if (modal) modal.hidden = true;
  }

  /* ═══ Public API ═══ */
  return {
    init() {
      const saved = localStorage.getItem('portfolio-lang') || 'es';
      current = saved;
      const t = T[current];
      if (t) apply(t, current);
      updateButtons(current);
      this._bindModal();
    },

    set(langCode) {
      const t = T[langCode];
      if (t) {
        current = langCode;
        localStorage.setItem('portfolio-lang', langCode);
        apply(t, langCode);
        updateButtons(langCode);
      }
    },

    async setAPI(langCode) {
      const cleaned = langCode.trim().toLowerCase().slice(0, 5);
      if (!cleaned) return;
      // Check if built-in first
      if (T[cleaned]) { this.set(cleaned); return; }

      const translated = await fetchAPITranslation(cleaned);
      if (translated) {
        current = cleaned;
        localStorage.setItem('portfolio-lang', cleaned);
        apply(translated, cleaned);
        updateButtons(cleaned);
      }
    },

    _bindModal() {
      const globeBtn  = document.getElementById('globe-btn');
      const modal     = document.getElementById('lang-modal');
      const closeBtn  = document.getElementById('lang-modal-close');
      const input     = document.getElementById('lang-custom-input');
      const applyBtn  = document.getElementById('lang-custom-apply');

      if (!globeBtn || !modal) return;

      globeBtn.addEventListener('click', () => { modal.hidden = false; });
      closeBtn?.addEventListener('click', () => { modal.hidden = true; });
      modal.addEventListener('click', e => { if (e.target === modal) modal.hidden = true; });

      document.querySelectorAll('.lang-opt').forEach(btn => {
        btn.addEventListener('click', () => this.set(btn.dataset.lang));
      });

      applyBtn?.addEventListener('click', () => {
        const code = input?.value.trim();
        if (code) this.setAPI(code);
      });
      input?.addEventListener('keydown', e => {
        if (e.key === 'Enter') { const code = input.value.trim(); if (code) this.setAPI(code); }
      });
    },
  };
})();
