# Verificación del paquete

Fecha: 26 de octubre de 2026.

## Revisión realizada

- Sintaxis de los scripts y validez de content.json.
- Existencia de imágenes, fuentes, archivos enlazados localmente y anclas internas.
- Identificadores de proyecto únicos y coincidencia entre content.json y su copia content.js.
- Textos bilingües de proyectos y educación.
- 18 proyectos, seis seleccionados y 48 cursos/rutas de formación.
- Vista de escritorio a 1366 × 900 y pruebas adaptables a 768 × 1024, 390 × 844 y 320 × 740.
- Sin desbordamiento horizontal en esos tamaños.
- Sin imágenes rotas ni errores de consola observados durante las pruebas.
- Búsqueda por nombre, filtro de redes, búsqueda sin resultados y recuperación de la selección inicial.
- Apertura y cierre de casos, cierre con Escape y recarga de un enlace directo a xIas.
- Enlaces de repositorio y release de xIas correctos en su caso.
- Buscador de certificados: «spring» muestra diez resultados.
- Cambio entre español e inglés, tema claro y oscuro, menú móvil y control del movimiento.

La vista previa se revisó por HTTP en un navegador basado en Chromium. Las imágenes de comprobación se incluyen en esta carpeta.

## Herramientas de revisión

npm run check comprueba integridad local, sintaxis y parte del esquema del contenido. No realiza solicitudes a sitios externos ni certifica la veracidad de los datos.

npm run sync regenera content.js. Ejecútalo después de editar el JSON y antes de check.

## Límites de la revisión

- La apertura directa mediante file:// está prevista por la arquitectura sin fetch ni módulos, pero no pudo verificarse en el navegador de revisión por sus restricciones de URL.
- No se probaron todos los enlaces de los 48 certificados ni la disponibilidad continua de todas las demos.
- No se verificó cada versión de Safari, Firefox ni un dispositivo móvil físico.
- No se realizó una auditoría formal de accesibilidad ni una medición de rendimiento en equipos de gama baja.
- El paquete se entrega para actualizar GitHub Pages. La web pública no cambia hasta que se suban los archivos al repositorio correspondiente.

Estas limitaciones no se deben confundir con funciones confirmadas de las aplicaciones mostradas: cada proyecto tiene su propia documentación y alcance.
