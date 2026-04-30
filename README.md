# 🚀 Portafolio Personal — GitHub Pages

> Portafolio web con animaciones de física, fondo de partículas interactivo, soporte multilingüe y modo oscuro/claro.

---

## 📂 Estructura del Proyecto

```
portfolio/
├── index.html              ← Página principal
├── css/
│   └── style.css           ← Todos los estilos + temas
├── js/
│   ├── background.js       ← Red de partículas (mouse-reactive)
│   ├── shatter.js          ← Motor de fragmentación/explosión
│   ├── i18n.js             ← Sistema multiidioma (ES/EN/FR/ZH)
│   ├── navigation.js       ← Navegación colgante + sparks + animaciones
│   └── app.js              ← Orquestador principal + carga de contenido
├── data/
│   └── content.json        ← ⭐ TU CONTENIDO (proyectos, certs, productos)
├── assets/
│   └── (tus imágenes aquí)
└── README.md
```

---

## ✏️ Cómo Personalizar

### 1. Tu Información Básica

Edita `index.html`:
- Línea con `TuNombre` → cambia por tu nombre real
- Sección `#section-contact` → cambia las URLs de redes sociales
- `<meta name="description">` → tu descripción para SEO

### 2. Tu Foto

Coloca tu foto en `assets/photo.jpg` y en `css/style.css` busca la línea:
```css
/* Replace placeholder with actual photo: */
```
Y descomenta/agrega:
```css
.photo-placeholder {
  background-image: url('../assets/photo.jpg');
  background-size: cover;
  background-position: center;
}
```
Luego borra el contenido interno del `.photo-placeholder` en el HTML.

### 3. Contenido Dinámico (Proyectos, Certificaciones, Productos)

Edita `data/content.json`:

```json
{
  "contact": {
    "github":   "https://github.com/TU_USUARIO",
    "email":    "tu@email.com",
    "linkedin": "https://linkedin.com/in/TU_USUARIO",
    "hotmart":  "https://hotmart.com/TU_USUARIO"
  },
  "projects": [
    {
      "name":        "Nombre del Repositorio",
      "description": "Qué hace el proyecto",
      "language":    "Python",
      "icon":        "🐍",
      "stars":       42,
      "url":         "https://github.com/TU_USUARIO/repo"
    }
  ],
  "certifications": [
    {
      "name":     "Nombre Certificación",
      "platform": "Plataforma",
      "year":     2024,
      "badge":    "🏅",
      "url":      "https://link-verificacion.com"
    }
  ],
  "hotmart": [
    {
      "name":        "Nombre del Curso",
      "description": "Descripción breve",
      "price":       "$29.99",
      "icon":        "🎓",
      "image":       "assets/curso-imagen.jpg",
      "url":         "https://hotmart.com/product/tu-producto"
    }
  ]
}
```

### 4. Idioma por Defecto

En `js/i18n.js`, cambia la línea:
```js
const saved = localStorage.getItem('portfolio-lang') || 'es';
```
Reemplaza `'es'` por `'en'`, `'fr'` o `'zh'`.

---

## 🌐 Desplegar en GitHub Pages

### Opción A — Repositorio directo (más simple)

```bash
# 1. Crea un repositorio llamado exactamente: TU_USUARIO.github.io
# 2. Sube todos los archivos al root del repo
git init
git add .
git commit -m "feat: portafolio inicial"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_USUARIO.github.io.git
git push -u origin main
# 3. Listo → visita https://TU_USUARIO.github.io
```

### Opción B — Repositorio con nombre personalizado

```bash
# El repo puede llamarse como quieras (ej: "portfolio")
git init
git add .
git commit -m "feat: portafolio inicial"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/portfolio.git
git push -u origin main

# En GitHub → Settings → Pages → Source: Deploy from branch → main → / (root)
# URL: https://TU_USUARIO.github.io/portfolio
```

### Dominio Personalizado (Opcional)

En GitHub Pages Settings → Custom domain → escribe tu dominio.
Crea un archivo `CNAME` en el root del proyecto con tu dominio:
```
tudominio.com
```

---

## ⚡ Características

| Feature | Detalle |
|---|---|
| 🎆 Animación de fragmentación | Click en nav → item cae → explota en fragmentos → sección aparece |
| 🌐 Partículas interactivas | Background que sigue el cursor con red neuronal |
| 💥 Chispas en hover | Partículas de chispa al pasar el mouse sobre navegación |
| 🌍 Multiidioma | ES / EN / FR / ZH con persistencia en localStorage |
| 🌙 Tema oscuro/claro | Toggle con preferencia del sistema + persistencia |
| 📱 Responsive | Adaptado a móvil, tablet y desktop |
| ⚡ Sin dependencias | Vanilla JS + CSS, sin npm, sin frameworks |
| 📄 Contenido editable | Solo editas `data/content.json` para actualizar contenido |

---

## 🛠️ Desarrollo Local

```bash
# Opción 1 — Python (ya instalado en la mayoría de sistemas)
cd portfolio
python3 -m http.server 8080
# → Abre http://localhost:8080

# Opción 2 — Node (si lo tienes)
npx serve .
# → Abre http://localhost:3000

# Opción 3 — VS Code
# Instala la extensión "Live Server" y haz click en "Go Live"
```

> ⚠️ `data/content.json` requiere un servidor HTTP para cargarse (no funciona con `file://`).
> Los placeholders del HTML funcionan sin servidor.

---

## 📋 Checklist de Personalización

- [ ] Cambiar `TuNombre` en `index.html` y `js/i18n.js`
- [ ] Agregar tu foto en `assets/photo.jpg`
- [ ] Completar `data/content.json` con proyectos reales
- [ ] Agregar certificaciones a `content.json`
- [ ] Agregar productos Hotmart a `content.json`
- [ ] Actualizar URLs de contacto
- [ ] Actualizar descripción personal en `js/i18n.js` (claves `about.intro` y `about.professional`)
- [ ] Subir a GitHub Pages

---
