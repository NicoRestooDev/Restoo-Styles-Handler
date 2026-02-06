# Formulario de Configuración de Estilos

Este proyecto es un **prototipo de backoffice** para configurar visualmente los estilos de una landing page de manera interactiva.

Por ahora es un **ejercicio sencillo**: todo está en HTML semántico, sin estilos CSS complejos, centrado en la funcionalidad.

---

## Objetivo

Crear un **formulario de administración** que permita configurar los siguientes elementos de manera dinámica:

- **Color de fondo**: con picker nativo y un input de texto hexadecimal para facilitar la entrada directa de valores de diseño.
- **Imagen de fondo**: subida desde el dispositivo.
- **Tipografía**: selección de cualquier fuente disponible en la **Google Fonts API**, con previsualización en tiempo real y navegación por teclado.

Eventualmente, los datos seleccionados se enviarán al **backend en Laravel** para persistirlos, y se reflejarán en una landing page de prueba.

---

## Estado actual

Se ha desarrollado un formulario funcional con:

- Campos para **color**, **imagen** y **fuente**.
- Sin estilos CSS más allá de lo básico para funcionalidad.
- **Color picker** sincronizado con input de texto hexadecimal.
- **FontPicker** con:
  - Búsqueda por nombre.
  - Dropdown con hasta 5 resultados.
  - Navegación con teclado (Arrow Up / Arrow Down) y selección con Enter.
  - Previsualización dinámica de la fuente mediante un `<link>` inyectado en el `<head>`.
- Preparación de **FormData** para enviar color, imagen y fuente al backend (endpoint aún por desarrollar).

---

## Problemas y retos actuales

- Algunas fuentes especiales (como **Noto Emoji**) todavía no se renderizan correctamente en la previsualización.
- El manejo de `variants` y `weights` no es completamente dinámico.
- Estado inicial de fuente por defecto aún por definir.
- La persistencia en backend y la generación de la landing page todavía no están implementadas.

---

## Próximos pasos

1. Implementar la **persistencia en Laravel**:
   - `GET /api/settings` para obtener configuraciones.
   - `POST /api/settings` para crear o actualizar configuraciones.
2. Mejorar la carga dinámica de fuentes, incluyendo weights y subsets según sea necesario.
3. Añadir selector de peso de fuente dinámico y enviar esta información al backend.
4. Refinar la **UX del FontPicker**:
   - Mensaje cuando no hay resultados.
   - Scroll automático al mover el highlight con teclado.
5. Integrar previsualización en la landing page a partir de los datos persistidos.
6. Mejorar la interfaz visual más adelante (por ahora todo es HTML semántico).

---

## Tecnologías usadas

- **React** con Hooks (`useState`, `useEffect`)
- **HTML5** (`input type="color"`, `input type="file"`)
- **Google Fonts API**
- **FormData** para envío de configuraciones al backend
- **Laravel** (pendiente) para almacenamiento y consumo de settings.

---

## Resultado esperado

Un **backoffice interactivo** donde se pueda configurar visualmente el color, la imagen y la tipografía de una landing page, con previsualización inmediata y persistencia futura en backend, utilizando un HTML semántico como prototipo inicial.
