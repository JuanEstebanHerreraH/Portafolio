# Diseño y rendimiento · Aurora 5

## Identidad recuperada

La portada recupera las tres órbitas, la rueda central, las herramientas y el horizonte de la versión original. Conserva la tipografía más legible de la revisión anterior. El asistente acompaña la escena con mensajes preparados.

La paleta interior de papel y verde se mantiene. El footer usa azul petróleo, texto claro y verdes suaves. Se retiró el bloque redundante de experiencia; su contexto queda junto a las herramientas.

## Habilidades visuales

Cinco modos sustituyen las listas de conocimientos:

- Backend/Web: cliente → API → base de datos; filtra dos productos activos de una colección de muestra.
- Escritorio/IA: vista de una ilustración con/sin fondo.
- Redes: /24, /26 y /28 con rangos y capacidad calculados.
- Ofimática: normalización, duplicados por código y suma de cantidades.
- Automatización: normalización de nombres y agrupación por extensión.

Las tecnologías se muestran como etiquetas; cada modo enlaza sus herramientas de evidencia. Los ejemplos están identificados y no se presentan como un servicio generativo real.

## Movimiento eficiente

La aurora está formada por SVG estáticos rasterizados por el navegador y movidos mediante transformaciones/opacidad CSS. No hay un ciclo requestAnimationFrame ni dibujo Canvas continuo.

En escritorio hay cuatro animaciones: dos capas de aurora, las órbitas y la rueda central. En anchos de hasta 980 px quedan dos: una aurora y las órbitas. La capa secundaria no se muestra y la rueda no gira aparte.

Al salir la portada de la vista o al ocultarse la pestaña se pausa animation-play-state. El botón de pausa desactiva todas las animaciones. Los mensajes se escriben con un temporizador finito y se completan al pausar o salir de la portada.

No hay seguimiento del puntero, texturas fijas sobre toda la página ni desenfoques de fondo.

## Accesibilidad y controles

La primera visita respeta prefers-reduced-motion. Una activación expresa con el botón de movimiento prevalece y se conserva en el equipo. Se mantienen zoom, foco visible, navegación por teclado, menú móvil y diálogos nativos.

Las pestañas de habilidades se desplazan para mantener visible la seleccionada. Las etiquetas de la escena están ancladas dentro de sus límites.

## Hardware y límites

Un navegador moderno con CSS Grid y dialog. No requiere GPU dedicada, modelos de IA ni instalación para visitar la web. Node.js se usa solo para mantenimiento opcional.

No se han medido FPS, RAM o batería en teléfonos físicos; no se promete una velocidad uniforme. La optimización reduce el trabajo continuo del procesador y las capas de móvil, preservando la idea visual.
