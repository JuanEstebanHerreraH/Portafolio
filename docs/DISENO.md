# Diseño y movimiento

## Dirección

La experiencia toma ideas de menús de campaña y entornos de exploración: atmósfera, profundidad, señales y una navegación que deja elegir un destino. La composición, los gráficos y las animaciones son originales.

La portada es un cielo azul con auroras, terreno y una constelación de herramientas. Cada punto enlaza una aplicación real. El logotipo conserva una rueda geométrica en rotación. El encabezado mantiene su atmósfera al recorrer las secciones.

El explorador sustituye el catálogo por una lista de selección y una escena dedicada al proyecto activo. Los casos muestran primero la herramienta y su recorrido de uso; después, el problema y la implementación.

Se conserva la paleta de papel, tinta verde, lima y arcilla en las secciones interiores y el cierre cálido.

## Tipografía

Montserrat para títulos, Open Sans para lectura y Roboto Mono para etiquetas. Las fuentes se incluyen localmente. No hay solicitudes de fuentes durante una visita.

## Movimiento

El movimiento está activo por defecto, de acuerdo con la dirección solicitada. El botón del encabezado permite pausarlo; esa elección se guarda. No se reproducen sonidos y no hay una pantalla que obligue a esperar para entrar.

El cielo se dibuja en Canvas a una frecuencia limitada de aproximadamente 24 cuadros por segundo. Su resolución está acotada; se detiene cuando queda fuera de vista o la pestaña está oculta. Las órbitas, la rueda y el ambiente del encabezado usan CSS. El puntero aporta una inclinación suave en equipos que tienen un puntero preciso.

El portafolio no ejecuta inferencia ni descarga modelos de IA. Las funciones de IA corresponden a algunas de las aplicaciones presentadas.

## Adaptación y accesibilidad

En móvil, la escena se acomoda debajo del menú principal y las herramientas se eligen en una fila desplazable. El panel de capacidades usa pestañas con navegación de flechas y foco visible. Los cursos se presentan en la página, por áreas.

Se incluyen salto al contenido, encabezados, etiquetas, estados de selección, mensajes de resultado, cierre con Escape y un diálogo nativo para los casos.

Las capturas reales y las ilustraciones se distinguen en la vista y en sus textos alternativos. Los PDF tienen enlaces con etiquetas descriptivas. El modo oscuro se aplica al contenido manteniendo el cielo inicial.

No se declara una conformidad WCAG auditada.

## Hardware

Un navegador moderno con Canvas, dialog, CSS Grid e IntersectionObserver. No exige GPU dedicada ni una instalación de desarrollo para la visita. No se ha establecido un mínimo de RAM con mediciones en equipos físicos.

Node.js 18 o posterior se utiliza solamente para los comandos opcionales de mantenimiento. No es necesario para los visitantes.
