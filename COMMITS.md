# Cómo subir estos cambios

No hagas un solo push de todo. Son siete cambios independientes y cada uno es
un commit natural — es la oportunidad de que este repo tenga historial real.

```bash
git add data/content.json
git commit -m "fix(contenido): elimina el duplicado de Vlanets y suma CoexFix, Arcionr y PixelGate

Network Engineering Assistant era el nombre viejo del repo Vlanets y aparecía
dos veces en proyectos y en aplicaciones."

git add js/app.js index.html
git commit -m "fix(about): calcula los años de experiencia desde career_start

Estaba escrito a mano como 2.4 en app.js y el elemento se llamaba stat-apps."

git add css/style.css
git commit -m "fix(a11y): corrige dos contrastes que no pasaban WCAG AA

--text-mute daba 3.68 en oscuro y 3.23 en claro; --packet en tema claro daba
2.87 y se usaba para enlaces. Se separa --packet-ink para texto."

git add index.html js/i18n.js
git commit -m "feat(hero): posicionamiento explícito y proyectos visibles sin clic

El hero anterior no decía a qué se dedica el sitio y todo el contenido estaba
detrás de una interacción."

git add js/app.js css/style.css
git commit -m "refactor(iconos): reemplaza emoji por SVG monocromo

Los emoji traían color propio, rompían la paleta y renderizaban distinto en
cada sistema operativo."

git add index.html css/style.css js/app.js
git commit -m "feat(formación): destaca título y Oracle ONE, pliega los 48 cursos"

git add css/style.css js/background.js index.html
git commit -m "perf(fondo): elimina el cursor-glow y una familia tipográfica

Eran cuatro capas de efecto simultáneas y tres tipografías donde alcanzan dos."
```

## Lo que falta y no puedo hacer por vos

**Las capturas de pantalla.** `assets/shots/` está listo y espera un PNG por
proyecto (ver el LEEME de esa carpeta). Hasta que las pongas, cada tarjeta
dibuja un patrón con el color del proyecto: no se rompe, pero tampoco muestra
tu trabajo. Es el cambio de mayor impacto que queda pendiente.

**`featured_oracle.url` sigue vacío** en `data/content.json`. Es tu credencial
más fuerte después del título y no lleva a ningún lado.

**`profile.career_start` está en 2024-02-01.** Cambiá la fecha por la real: el
sitio calcula los años solo a partir de ahí.
