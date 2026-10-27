# Verificación · Aurora 3.0

Fecha de entrega: 26 de octubre de 2026.

## Integridad

- Sintaxis de app.js, aurora.js y las herramientas de mantenimiento.
- Datos JSON y copia JavaScript sincronizados.
- 18 herramientas, cinco áreas de conocimiento y 48 cursos/rutas.
- Identificadores únicos, referencias locales, anclas, referencias SVG y licencias de fuentes.
- Cuatro PDF presentes con encabezado PDF válido y copias idénticas a los originales seleccionados.
- Servidor local con respuesta 200 para los recursos y tipo application/pdf para los CV.
- Archivo ZIP comprobado e inclusión de .nojekyll y .gitignore.

## Navegador

Pruebas realizadas por HTTP en un navegador basado en Chromium:

- Anchos de 320, 390, 768 y 1366 píxeles; sin desbordamiento horizontal en la versión final.
- Inicio con movimiento activo, rueda y auroras; control para pausar y reactivar.
- Puntos de la escena que seleccionan herramientas.
- Filtro de redes con Vlanets, CoexFix y Retorp.
- Búsqueda sin resultados y recuperación de la lista.
- Selección de una herramienta al final del listado y conservación del foco.
- Avance desde la última herramienta a la primera, con desplazamiento del listado para mantenerla visible.
- Recarga del enlace de una herramienta y del enlace de un caso.
- Diálogo de caso adaptable y cierre con Escape.
- Pestañas de conocimientos por clic y mediante flechas.
- Cursos agrupados por áreas, búsqueda y carga de más resultados.
- Cambio al inglés, traducciones de capacidades y nombres de CV.
- Menú móvil, modo oscuro y cuatro enlaces de descarga.
- Sin nuevos errores de consola durante la secuencia final de interacciones.

Las imágenes de esta carpeta son capturas reales de la vista previa.

## Límites

La apertura con file:// está prevista por la estructura sin fetch ni módulos; el navegador de revisión no permite verificar ese protocolo. La revisión se realizó por HTTP.

Se comprobaron los archivos y enlaces de los cuatro CV; el lugar donde un navegador guarda una descarga depende de su configuración. No se probaron todos los navegadores ni equipos físicos, ni se realizó una auditoría formal de accesibilidad o rendimiento.

Los README consultados respaldan el contenido de los casos complementarios. Esta revisión del portafolio no equivale a ejecutar o auditar cada aplicación presentada, ni verifica la disponibilidad permanente de todas las demos o credenciales.

La web pública no cambia hasta que se suban los archivos al repositorio que publica GitHub Pages.
