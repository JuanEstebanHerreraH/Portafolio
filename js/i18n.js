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
      page:{ title:'Portafolio — Tu Nombre' },
      ui:{ selectLang:'Seleccionar idioma', otherLang:'Otro idioma (traducción automática vía API):', translate:'Traducir' },
      nav:{ about:'SOBRE MÍ', projects:'PROYECTOS', certifications:'CERTS', applications:'APPS', techstack:'TECH', contact:'CONTACTO' },
      hero:{ subtitle:'Programador · Redes · Proyectos Digitales', cta:'↑ Selecciona una sección para explorar' },
      about:{ title:'Sobre Mí', intro:'Estudiante de Ingeniería de Sistemas y Técnico Profesional en Soporte de Sistemas e Informática. Construyo software que resuelve problemas reales: offline-first, multiplataforma y con enfoque en privacidad del usuario.', professional:'Trabajo con Java, Dart, TypeScript, Python y C# a lo largo de la pila completa. Certificado Oracle ONE · 48 certificaciones · En camino a CCNA. Creo que la mejor forma de aprender es construyendo — por eso cada proyecto que hago resuelve un problema concreto.', stat1:'Proyectos', stat2:'Certificaciones', stat3:'Años' },
      techstack:{ title:'Entorno Tecnológico' }, projects:{ title:'Proyectos GitHub', view:'Ver →' },
      certs:{ title:'Certificaciones' },
      hotmart:{ title:'Productos Hotmart', buy:'Comprar →' },
      interests:{ title:'Intereses', security:'Ciberseguridad', networking:'Redes', dev:'Desarrollo', ai:'IA / ML' },
      contact:{ title:'Contacto', intro:'¿Tienes un proyecto en mente? Conectemos.' }, filter:{ all:'Todas' },
      footer:{ built:'Construido con', by:'por' },
    },
    en: {
      page:{ title:'Portfolio — Your Name' },
      ui:{ selectLang:'Select Language', otherLang:'Other language (auto-translate via API):', translate:'Translate' },
      nav:{ about:'ABOUT', projects:'PROJECTS', certifications:'CERTS', applications:'APPS', techstack:'TECH', contact:'CONTACT' },
      hero:{ subtitle:'Programmer · Networking · Digital Products', cta:'↑ Select a section to explore' },
      about:{ title:'About Me', intro:'Systems Engineering student and certified IT Support Technician. I build software that solves real problems: offline-first, cross-platform, privacy-focused.', professional:'I work across the full stack with Java, Dart, TypeScript, Python and C#. Oracle ONE certified · 48 certifications · On the path to CCNA. I believe the best way to learn is by building — every project I make solves a concrete problem.', stat1:'Projects', stat2:'Certifications', stat3:'Years' },
      techstack:{ title:'Tech Stack' }, projects:{ title:'GitHub Projects', view:'View →' },
      certs:{ title:'Certifications' },
      hotmart:{ title:'Hotmart Products', buy:'Buy →' },
      interests:{ title:'Interests', security:'Cybersecurity', networking:'Networking', dev:'Development', ai:'AI / ML' },
      contact:{ title:'Contact', intro:'Have a project in mind? Let\'s connect.' }, filter:{ all:'All' },
      footer:{ built:'Built with', by:'by' },
    },
    fr: {
      page:{ title:'Portfolio — Votre Nom' },
      ui:{ selectLang:'Choisir la langue', otherLang:'Autre langue (traduction automatique via API) :', translate:'Traduire' },
      nav:{ about:'À PROPOS', projects:'PROJETS', certifications:'CERTS', applications:'APPS', techstack:'TECH', contact:'CONTACT' },
      hero:{ subtitle:'Programmeur · Réseaux · Produits Numériques', cta:'↑ Sélectionnez une section à explorer' },
      about:{ title:'À Propos', intro:'Passionné par la technologie, les réseaux et le développement logiciel orienté vers des solutions réelles et évolutives.', professional:'Expérience en développement d\'applications, administration réseau et création de produits numériques.', stat1:'Projets', stat2:'Certifications', stat3:'Années' },
      techstack:{ title:'Technologies' }, projects:{ title:'Projets GitHub', view:'Voir →' },
      certs:{ title:'Certifications' },
      hotmart:{ title:'Produits Hotmart', buy:'Acheter →' },
      interests:{ title:'Intérêts', security:'Cybersécurité', networking:'Réseaux', dev:'Développement', ai:'IA / ML' },
      contact:{ title:'Contact', intro:'Vous avez un projet en tête ? Connectons-nous.' },
      footer:{ built:'Créé avec', by:'par' },
    },
    zh: {
      page:{ title:'作品集 — 您的姓名' },
      ui:{ selectLang:'选择语言', otherLang:'其他语言（通过API自动翻译）：', translate:'翻译' },
      nav:{ about:'关于我', projects:'项目', certifications:'证书', applications:'应用', interests:'兴趣', contact:'联系' },
      hero:{ subtitle:'程序员 · 网络 · 数字产品', cta:'↑ 选择一个部分来探索' },
      about:{ title:'关于我', intro:'热衷于技术、网络和软件开发，专注于真实可扩展的解决方案。', professional:'拥有应用程序开发、网络管理和数字产品创建经验，致力于持续学习和高质量代码。', stat1:'项目', stat2:'证书', stat3:'年' },
      techstack:{ title:'技术栈' }, projects:{ title:'GitHub 项目', view:'查看 →' },
      certs:{ title:'证书' },
      hotmart:{ title:'Hotmart 产品', buy:'购买 →' },
      interests:{ title:'兴趣', security:'网络安全', networking:'网络', dev:'开发', ai:'人工智能' },
      contact:{ title:'联系方式', intro:'有项目想法？让我们联系吧。' },
      footer:{ built:'用', by:'由' },
    },
    pt: {
      page:{ title:'Portfólio — Seu Nome' },
      ui:{ selectLang:'Selecionar idioma', otherLang:'Outro idioma (tradução automática via API):', translate:'Traduzir' },
      nav:{ about:'SOBRE MIM', projects:'PROJETOS', certifications:'CERTS', applications:'APPS', interests:'INTERESSES', contact:'CONTATO' },
      hero:{ subtitle:'Programador · Redes · Produtos Digitais', cta:'↑ Selecione uma seção para explorar' },
      about:{ title:'Sobre Mim', intro:'Apaixonado por tecnologia, redes e desenvolvimento de software focado em soluções reais e escaláveis.', professional:'Experiência em desenvolvimento de aplicações, administração de redes e criação de produtos digitais. Comprometido com aprendizado contínuo e código de qualidade.', stat1:'Projetos', stat2:'Certificações', stat3:'Anos' },
      techstack:{ title:'Stack Técnico' }, projects:{ title:'Projetos GitHub', view:'Ver →' },
      certs:{ title:'Certificações' },
      hotmart:{ title:'Produtos Hotmart', buy:'Comprar →' },
      interests:{ title:'Interesses', security:'Cibersegurança', networking:'Redes', dev:'Desenvolvimento', ai:'IA / ML' },
      contact:{ title:'Contato', intro:'Tem um projeto em mente? Vamos nos conectar.' },
      footer:{ built:'Construído com', by:'por' },
    },
    de: {
      page:{ title:'Portfolio — Dein Name' },
      ui:{ selectLang:'Sprache wählen', otherLang:'Andere Sprache (automatische Übersetzung via API):', translate:'Übersetzen' },
      nav:{ about:'ÜBER MICH', projects:'PROJEKTE', certifications:'ZERTS', applications:'APPS', interests:'INTERESSEN', contact:'KONTAKT' },
      hero:{ subtitle:'Entwickler · Netzwerke · Digitale Produkte', cta:'↑ Wähle einen Bereich zum Erkunden' },
      about:{ title:'Über Mich', intro:'Leidenschaftlich für Technologie, Netzwerke und Softwareentwicklung mit Fokus auf reale, skalierbare Lösungen.', professional:'Erfahrung in der Anwendungsentwicklung, Netzwerkadministration und Erstellung digitaler Produkte.', stat1:'Projekte', stat2:'Zertifikate', stat3:'Jahre' },
      projects:{ title:'GitHub Projekte', view:'Ansehen →' },
      certs:{ title:'Zertifikate' },
      hotmart:{ title:'Hotmart Produkte', buy:'Kaufen →' },
      interests:{ title:'Interessen', security:'Cybersicherheit', networking:'Netzwerke', dev:'Entwicklung', ai:'KI / ML' },
      contact:{ title:'Kontakt', intro:'Hast du ein Projekt im Sinn? Lass uns verbinden.' },
      footer:{ built:'Erstellt mit', by:'von' },
    },
    it: {
      page:{ title:'Portfolio — Il Tuo Nome' },
      ui:{ selectLang:'Seleziona lingua', otherLang:'Altra lingua (traduzione automatica via API):', translate:'Traduci' },
      nav:{ about:'CHI SONO', projects:'PROGETTI', certifications:'CERTS', applications:'APPS', interests:'INTERESSI', contact:'CONTATTI' },
      hero:{ subtitle:'Programmatore · Reti · Prodotti Digitali', cta:'↑ Seleziona una sezione da esplorare' },
      about:{ title:'Chi Sono', intro:'Appassionato di tecnologia, reti e sviluppo software con focus su soluzioni reali e scalabili.', professional:'Esperienza nello sviluppo di applicazioni, amministrazione di reti e creazione di prodotti digitali.', stat1:'Progetti', stat2:'Certificazioni', stat3:'Anni' },
      projects:{ title:'Progetti GitHub', view:'Vedi →' },
      certs:{ title:'Certificazioni' },
      hotmart:{ title:'Prodotti Hotmart', buy:'Acquista →' },
      interests:{ title:'Interessi', security:'Cybersicurezza', networking:'Reti', dev:'Sviluppo', ai:'IA / ML' },
      contact:{ title:'Contatti', intro:'Hai un progetto in mente? Connettiamoci.' },
      footer:{ built:'Creato con', by:'da' },
    },
    ja: {
      page:{ title:'ポートフォリオ — あなたの名前' },
      ui:{ selectLang:'言語を選択', otherLang:'他の言語（APIによる自動翻訳）：', translate:'翻訳' },
      nav:{ about:'について', projects:'プロジェクト', certifications:'認定', applications:'アプリ', interests:'興味', contact:'連絡先' },
      hero:{ subtitle:'プログラマー · ネットワーク · デジタル製品', cta:'↑ セクションを選択して探索する' },
      about:{ title:'私について', intro:'テクノロジー、ネットワーク、ソフトウェア開発に情熱を持ち、実用的でスケーラブルなソリューションに注力しています。', professional:'アプリケーション開発、ネットワーク管理、デジタル製品作成の経験があります。', stat1:'プロジェクト', stat2:'認定資格', stat3:'年' },
      projects:{ title:'GitHubプロジェクト', view:'見る →' },
      certs:{ title:'認定資格' },
      hotmart:{ title:'Hotmart製品', buy:'購入 →' },
      interests:{ title:'興味', security:'サイバーセキュリティ', networking:'ネットワーク', dev:'開発', ai:'AI / ML' },
      contact:{ title:'連絡先', intro:'プロジェクトがありますか？つながりましょう。' },
      footer:{ built:'作成：', by:'by' },
    },
    ko: {
      page:{ title:'포트폴리오 — 당신의 이름' },
      ui:{ selectLang:'언어 선택', otherLang:'다른 언어 (API 자동 번역):', translate:'번역' },
      nav:{ about:'소개', projects:'프로젝트', certifications:'자격증', applications:'앱', interests:'관심사', contact:'연락처' },
      hero:{ subtitle:'프로그래머 · 네트워크 · 디지털 제품', cta:'↑ 섹션을 선택하여 탐색하세요' },
      about:{ title:'소개', intro:'기술, 네트워크 및 소프트웨어 개발에 열정적이며 실용적이고 확장 가능한 솔루션에 집중합니다.', professional:'애플리케이션 개발, 네트워크 관리 및 디지털 제품 생성 경험이 있습니다.', stat1:'프로젝트', stat2:'자격증', stat3:'년' },
      projects:{ title:'GitHub 프로젝트', view:'보기 →' },
      certs:{ title:'자격증' },
      hotmart:{ title:'Hotmart 제품', buy:'구매 →' },
      interests:{ title:'관심사', security:'사이버 보안', networking:'네트워크', dev:'개발', ai:'AI / ML' },
      contact:{ title:'연락처', intro:'프로젝트가 있으신가요? 연결해 봅시다.' },
      footer:{ built:'제작:', by:'by' },
    },
    ru: {
      page:{ title:'Портфолио — Ваше Имя' },
      ui:{ selectLang:'Выбрать язык', otherLang:'Другой язык (автоперевод через API):', translate:'Перевести' },
      nav:{ about:'ОБО МНЕ', projects:'ПРОЕКТЫ', certifications:'СЕРТ', applications:'APPS', interests:'ИНТЕРЕСЫ', contact:'КОНТАКТ' },
      hero:{ subtitle:'Программист · Сети · Цифровые продукты', cta:'↑ Выберите раздел для изучения' },
      about:{ title:'Обо Мне', intro:'Увлечён технологиями, сетями и разработкой программного обеспечения с фокусом на реальные, масштабируемые решения.', professional:'Опыт в разработке приложений, администрировании сетей и создании цифровых продуктов.', stat1:'Проекты', stat2:'Сертификаты', stat3:'Лет' },
      projects:{ title:'Проекты GitHub', view:'Смотреть →' },
      certs:{ title:'Сертификаты' },
      hotmart:{ title:'Продукты Hotmart', buy:'Купить →' },
      interests:{ title:'Интересы', security:'Кибербезопасность', networking:'Сети', dev:'Разработка', ai:'ИИ / ML' },
      contact:{ title:'Контакт', intro:'Есть проект? Давайте свяжемся.' },
      footer:{ built:'Создано с', by:'автор' },
    },
    ar: {
      page:{ title:'ملف الأعمال — اسمك' },
      ui:{ selectLang:'اختر اللغة', otherLang:'لغة أخرى (ترجمة تلقائية عبر API):', translate:'ترجمة' },
      nav:{ about:'عني', projects:'مشاريع', certifications:'شهادات', applications:'التطبيقات', interests:'اهتمامات', contact:'تواصل' },
      hero:{ subtitle:'مبرمج · شبكات · منتجات رقمية', cta:'↑ اختر قسماً للاستكشاف' },
      about:{ title:'عني', intro:'شغوف بالتكنولوجيا والشبكات وتطوير البرمجيات مع التركيز على حلول حقيقية وقابلة للتوسع.', professional:'خبرة في تطوير التطبيقات وإدارة الشبكات وإنشاء المنتجات الرقمية.', stat1:'مشاريع', stat2:'شهادات', stat3:'سنوات' },
      projects:{ title:'مشاريع GitHub', view:'عرض →' },
      certs:{ title:'الشهادات' },
      hotmart:{ title:'منتجات Hotmart', buy:'شراء →' },
      interests:{ title:'الاهتمامات', security:'الأمن السيبراني', networking:'الشبكات', dev:'التطوير', ai:'الذكاء الاصطناعي' },
      contact:{ title:'تواصل معي', intro:'هل لديك مشروع في ذهنك؟ لنتواصل.' },
      footer:{ built:'بُني بـ', by:'بواسطة' },
    },
    hi: {
      page:{ title:'पोर्टफोलियो — आपका नाम' },
      ui:{ selectLang:'भाषा चुनें', otherLang:'अन्य भाषा (API के माध्यम से स्वचालित अनुवाद):', translate:'अनुवाद करें' },
      nav:{ about:'मेरे बारे में', projects:'प्रोजेक्ट्स', certifications:'प्रमाण पत्र', applications:'एप', interests:'रुचियाँ', contact:'संपर्क' },
      hero:{ subtitle:'प्रोग्रामर · नेटवर्क · डिजिटल उत्पाद', cta:'↑ अन्वेषण के लिए एक अनुभाग चुनें' },
      about:{ title:'मेरे बारे में', intro:'तकनीक, नेटवर्किंग और सॉफ्टवेयर डेवलपमेंट के प्रति जुनूनी, वास्तविक और स्केलेबल समाधानों पर ध्यान देते हुए।', professional:'एप्लिकेशन डेवलपमेंट, नेटवर्क प्रशासन और डिजिटल उत्पाद निर्माण में अनुभव।', stat1:'प्रोजेक्ट्स', stat2:'प्रमाण पत्र', stat3:'वर्ष' },
      projects:{ title:'GitHub प्रोजेक्ट्स', view:'देखें →' },
      certs:{ title:'प्रमाण पत्र' },
      hotmart:{ title:'Hotmart उत्पाद', buy:'खरीदें →' },
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
