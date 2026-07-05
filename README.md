# Portafolio — Juan Esteban Herrera

Portafolio personal de desarrollo. SPA estática (HTML + CSS + JS vanilla, sin build step) lista para GitHub Pages.

**Edición "Signal Field":** identidad de ingeniero de redes, un único fondo vectorial reactivo al mouse (los trazos giran alrededor del cursor y lo cruzan "paquetes" de datos), interacciones de tarjeta con spotlight + tilt, tema claro/oscuro y soporte multiidioma (12 idiomas).

## Estructura

```
Portafolio/
├── index.html          # Estructura y secciones (SPA por paneles)
├── .nojekyll           # Evita el procesado Jekyll en GitHub Pages
├── css/
│   └── style.css       # Sistema visual completo (tokens, temas, componentes)
├── js/
│   ├── background.js   # Campo de señal reactivo al mouse (un solo canvas)
│   ├── i18n.js         # Traducciones (12 idiomas)
│   ├── navigation.js   # Apertura/cierre de paneles + indicador de nav
│   └── app.js          # Render de datos + interacciones + contadores
├── data/
│   └── content.json    # TODO el contenido editable (proyectos, apps, certs, stack, contacto)
└── assets/
    └── photo.jpg       # Foto de perfil
```

## Editar el contenido

Casi todo el contenido vive en `data/content.json`. No hace falta tocar el HTML para:

- **Proyectos** → array `projects` (campos: `name`, `description`, `language`, `icon`, `url`, y opcional `demo`).
- **Aplicaciones** → array `applications` (campos: `name`, `description`, `tech[]`, `icon`, `license`, `url`, `release_url`, opcional `demo`).
- **Certificaciones** → array `certifications`.
- **Stack** → objeto `techstack` agrupado por categoría.
- **Contacto** → objeto `contact`.

Los colores por lenguaje se asignan solos; si agregas uno nuevo, se puede añadir en `LANG_COLORS` dentro de `js/app.js`.

## Desarrollo local

El sitio usa `fetch()` para cargar `content.json`, así que necesita un servidor (no `file://`):

```bash
python3 -m http.server 8080
# abrir http://localhost:8080
```

## Publicar en GitHub Pages

1. Sube el contenido de esta carpeta a la raíz del repositorio.
2. Settings → Pages → Deploy from branch → `main` / `root`.
3. El archivo `.nojekyll` ya está incluido para servir correctamente los assets.

## Accesibilidad y rendimiento

- Cursor nativo conservado (con glow de acompañamiento), sin `cursor:none`.
- Respeta `prefers-reduced-motion` (el fondo se renderiza estático).
- Un solo `<canvas>` en lugar de tres; DPR-aware.
- Foco visible en elementos interactivos.
