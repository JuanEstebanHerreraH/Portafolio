# Contenido y mantenimiento

## Proyectos

data/content.json contiene projects. El orden del arreglo establece el orden del explorador. Ya no hay un bloque de archivo ni una selección basada en tarjetas.

| Campo | Uso |
| --- | --- |
| id | Identificador estable del proyecto. |
| name | Nombre visible. |
| categories | ai, web, desktop y/o network. |
| tech | Tecnologías, también utilizadas por el buscador. |
| summary | Qué hace la herramienta, en es y en. |
| problem | Qué problema aborda. |
| role | Participación personal y contexto del proyecto. |
| flow | Tres pasos de uso o recorrido, en es y en. |
| contributions | Funciones e implementación, en listas es/en. |
| limits | Alcance y límites reales. |
| image | Ruta local de la captura o ilustración. |
| imageType | screenshot para captura; concept para ilustración. |
| url | Repositorio HTTPS. |
| demo / download | Enlaces HTTPS o null. |

El explorador muestra un proyecto a la vez; sus botones anterior/siguiente recorren los resultados de la búsqueda y del filtro actual.

#herramienta/xIas selecciona una herramienta y lleva a su vista. #proyecto/xIas abre su caso. No se necesitan rutas de servidor.

Los puntos de la escena inicial están en index.html y usan data-select-tool. Si cambias sus proyectos, actualiza sus nombres, textos y traducciones.

## Capacidades

El arreglo skills incluye etiqueta, título, introducción, conocimientos, práctica, estado y proyectos de evidencia. Los textos tienen versiones es y en.

Los conocimientos de redes incluyen direccionamiento, VLSM, VLAN, trunking, inter-VLAN, routing, NAT/ACL, Packet Tracer y soporte Windows. Ofimática tiene su área propia; la automatización asistida por IA también.

No conviertas años de práctica académica en años de empleo formal. La preparación CCNA sigue en curso.

## Formación

Los tres hitos principales se escriben en los diccionarios es/en de js/app.js:

- Titulación técnica obtenida el 26 de febrero de 2026.
- Formación especializada Oracle Next Education / Alura.
- Ingeniería de Sistemas en curso; hito tecnológico previsto para 2027.

certifications conserva las 48 evidencias con nombre, institución, fecha, etiquetas y enlace. La función certArea las organiza por áreas, y certType distingue rutas y cursos. Si añades una credencial de otro tipo, revisa su clasificación.

Cada área muestra seis resultados inicialmente y permite cargar más. Buscar filtra dentro del área elegida. Cambiar de área limpia la búsqueda.

## Perfil y traducciones

Los textos estáticos en español están en index.html; su traducción está en el diccionario en de js/app.js. Actualiza ambos.

Los textos de proyectos y capacidades se editan en content.json. content.js es la copia generada para permitir abrir el HTML sin fetch.

Si cambias el correo, actualiza data/profile y sus enlaces visibles en index.html. Si cambias de dominio o repositorio, actualiza la URL canónica, los metadatos OG y el bloque Person.

## Descargas

Los PDF están en assets/cv. Sus enlaces y descripciones se definen en renderCVs, dentro de js/app.js. Hay enlaces alternativos en noscript. El sitio utiliza el atributo download; el navegador puede preguntar dónde guardar el PDF según la configuración de la persona.

Después de modificar el JSON ejecuta npm run sync y npm run check. Revisa el diseño y publica los dos archivos de datos.
