# Diseño y funcionamiento

## Dirección visual

La idea es una bitácora de alguien que construye herramientas: papel, anotaciones, líneas de trabajo y una tipografía expresiva. La portada destaca una aplicación real en lugar de una ilustración genérica de programación.

La paleta combina papel cálido, tinta verde oscura, acento arcilla y detalles lima. El perfil usa un bloque oscuro; el contacto, un tono cálido distinto. Los bordes y la textura conectan las secciones.

Tipografías: Syne para titulares, DM Sans para lectura e IBM Plex Mono para etiquetas. Los acentos editoriales en cursiva usan Georgia del sistema.

Los colores y tamaños principales se controlan mediante variables al inicio de css/style.css. Los temas se seleccionan con data-theme en el elemento html. No hay bibliotecas de componentes ni un framework.

## Movimiento

- El fondo Canvas dibuja líneas y partículas a una frecuencia limitada, con resolución y cantidad de elementos acotadas.
- Las órbitas y algunos elementos de la portada usan animación CSS.
- Las secciones entran suavemente mediante IntersectionObserver.
- El control del encabezado permite pausar o activar el movimiento.
- La preferencia de movimiento reducido del sistema determina el valor inicial. Una elección explícita de la persona se conserva.
- El Canvas se pausa cuando la página queda oculta. En ahorro de datos o memoria muy limitada usa un fondo estático.

Son efectos visuales: el portafolio no descarga ni ejecuta un modelo de IA. La IA local pertenece a algunos proyectos presentados.

## Adaptación

El contenido usa una página continua. Las tarjetas pasan a una columna en móvil; el menú se transforma en un desplegable y los diálogos mantienen su desplazamiento dentro de la pantalla.

Las imágenes se cargan desde el propio sitio. Las de proyectos se cargan de forma diferida. Las capturas se presentan con proporciones coherentes sin deformarlas.

## Accesibilidad

Hay enlace para saltar al contenido, encabezados jerárquicos, etiquetas de botones y buscadores, foco visible, mensajes de estado y navegación de teclado. Los casos y certificados usan el elemento dialog del navegador y se pueden cerrar con Escape.

Los textos alternativos distinguen capturas de ilustraciones. El sitio ofrece un control de movimiento y estilos de impresión.

Se hicieron comprobaciones manuales; no se ha realizado una auditoría formal de conformidad WCAG ni una prueba completa con lectores de pantalla.

## Hardware y software

No se requiere GPU dedicada, modelo de IA, backend ni una instalación especial para visitar el portafolio. Se utiliza un navegador moderno con soporte para dialog, Canvas e IntersectionObserver.

Se probaron anchos de 320, 390, 768 y 1366 píxeles en un navegador Chromium. No se estableció un mínimo de RAM mediante mediciones en equipos físicos. Las reducciones automáticas de efectos ayudan en equipos modestos, pero no equivalen a una garantía de rendimiento en todos los dispositivos.

Node.js 18 o posterior solo se necesita para las herramientas opcionales de revisión, sincronización y vista previa. Los visitantes no necesitan Node.js.
