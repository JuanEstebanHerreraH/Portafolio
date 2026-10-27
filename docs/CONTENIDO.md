# Mantener el contenido

## Proyectos

Edita el arreglo projects en data/content.json. Cada proyecto contiene:

| Campo | Uso |
| --- | --- |
| id | Identificador estable del enlace directo. Evita cambiarlo después de compartirlo. |
| name | Nombre visible. |
| featured | true para aparecer en la selección inicial; false para el archivo. |
| categories | Una o varias de: ai, web, desktop, network. |
| tech | Tecnologías que aparecen en etiquetas y en la búsqueda. |
| summary | Descripción corta en es y en. |
| role | Tipo de participación en es y en. |
| problem | Problema que aborda, en es y en. |
| contributions | Lista de aportes personales en es y en. |
| limits | Alcance real y limitaciones, en es y en. |
| image | Ruta relativa de una imagen incluida en assets/shots. |
| imageType | screenshot para una captura real; concept para una ilustración. |
| url | Repositorio HTTPS. |
| demo / download | Enlace HTTPS o null si no existe. |

El orden del arreglo establece el orden de presentación. La búsqueda y los filtros recorren los 18 proyectos; la vista inicial muestra solo los marcados como featured. Las doce exploraciones también aparecen en el archivo desplegable.

El enlace directo tiene el formato #proyecto/xIas. Permite compartir un caso dentro del mismo HTML sin configurar rutas especiales en GitHub Pages.

No uses una ilustración como si fuese una captura del producto. Sustituye la imagen y cambia imageType cuando tengas una captura real sin datos privados.

## Formación y cursos

education contiene título y detalle bilingües, institución y periodo. El periodo «En curso / In progress» se adapta al idioma.

certifications conserva nombre, institución, año, etiquetas y URL. La búsqueda utiliza esos campos. Un curso, una ruta de aprendizaje y una certificación profesional son credenciales diferentes: conserva la denominación de su emisor.

toolGroups organiza tecnologías por área y las relaciona con proyectos. No contiene porcentajes de dominio ni años calculados automáticamente.

## Perfil, portada y contacto

Los textos estáticos están en index.html, identificados por data-i18n o data-i18n-html. La traducción al inglés está en el objeto english de js/app.js. Actualiza ambas versiones.

Si cambias el correo, modifica data/content.json y todas sus apariciones visibles y enlaces mailto en index.html.

Si cambias de repositorio o dominio, actualiza la URL canónica, og:url, og:image y los datos estructurados del encabezado de index.html. La imagen del adelanto social usa la fotografía local, no la vista completa del sitio.

La portada de xIas tiene su propia imagen, etiquetas y textos en index.html. Cambiar solo el orden de projects no cambia automáticamente esa portada.

## Flujo de edición

Después de guardar content.json:

```text
npm run sync
npm run check
npm run preview
```

No necesitas instalar dependencias. Revisa el resultado, sube content.json y content.js junto con los archivos modificados y comprueba la versión publicada.

No incluyas credenciales, documentos de identidad, datos de clientes ni capturas con información privada. El sitio es público.

## Preferencias de la visita

Tema, idioma y movimiento se guardan en localStorage del navegador. No se envían a un servidor. Si el almacenamiento no está disponible, la página continúa con valores predeterminados.

Para comprobar el diseño original después de tus pruebas, elige español, tema claro y ajusta el movimiento desde los botones del encabezado.
