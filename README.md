# Backoffice de Estilos Dinámicos

Este pequeño proyecto tiene como objetivo crear un **formulario de administración** que permita configurar visualmente ciertos estilos para un sitio o landing page: color de fondo, imagen y tipografía.

---

## Objetivo

El objetivo principal es ofrecer una **experiencia visual interactiva** para seleccionar:

- **Color de fondo**: con picker nativo y soporte para pegado de valores hexadecimales.
- **Imagen de fondo**: subida desde el dispositivo.
- **Tipografía**: selección de cualquier fuente disponible en la **Google Fonts API**, con preview en tiempo real y navegación por teclado.

Toda esta información se prepara para enviarse al backend, guardarse y poder renderizar la landing page de manera dinámica.

---

## Estado actual

Hasta ahora se ha implementado:

- Formulario con campos de **color**, **imagen** y **tipografía**.
- **Color picker** que sincroniza con un input de texto hexadecimal.
- **FontPicker** con:
  - Búsqueda por nombre.
  - Dropdown con hasta 5 resultados.
  - Navegación por teclado (Arrow Up / Arrow Down).
  - Selección con Enter.
- **Inyección dinámica de Google Fonts** usando `<link>` en el `<head>` para previsualizar la fuente seleccionada.
- Preparación de **FormData** para enviar color, imagen y fuente al backend.

---

## Problemas actuales / cosas por mejorar

- Algunas fuentes especiales (como **Noto Emoji**) no se renderizan correctamente con el enlace generado.
- El manejo de `variants` y `weights` todavía no es completamente dinámico.
- Estado inicial de fuente por defecto para evitar `null`.
- Persistencia de las configuraciones en el backend vía API.

---

## Próximos pasos

1. Revisar la **documentación de Google Fonts API** para cargar correctamente todas las variantes y subsets especiales.
2. Mejorar la lógica de generación dinámica del enlace de la fuente, incluyendo weights y subsets según corresponda.
3. Implementar la **persistencia en backend** (Laravel REST API):
   - Endpoint `GET /api/settings` para obtener configuraciones.
   - Endpoint `POST /api/settings` para crear o actualizar configuraciones.
4. Añadir selector de **peso de fuente** dinámico y enviar esta información al backend.
5. Mejorar la UI/UX del `FontPicker`, incluyendo:
   - Mensaje cuando no hay resultados.
   - Scroll automático al mover el highlight con teclado.
6. Posible integración con **localStorage** para previsualizaciones inmediatas sin backend.

---

## Tecnologías

- React con Hooks (`useState`, `useEffect`)
- HTML5 `<input type="color">` y `<input type="file">`
- Google Fonts API
- FormData para envío de configuraciones al backend

---

## Objetivo final

Crear un **backoffice visual completo y responsivo** que permita a cualquier usuario configurar de manera rápida y visual los estilos de su landing page, con previsualización inmediata y persistencia en backend.
