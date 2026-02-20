# Restoo Styles Handler

Proyecto de aprendizaje **React + Laravel** cuyo objetivo es construir un pequeño **backoffice de configuración visual** y una **landing page dinámica** que consume dicha configuración.

El foco principal del proyecto es comprender el flujo completo:

Frontend (React) → API (Laravel) → Base de datos + Storage → Frontend

---

## Objetivo

Crear un formulario de administración que permita definir:

- Color de fondo
- Imagen de fondo
- Tipografía (Google Fonts)

Y persistir esta configuración en backend para que una landing page pueda consumirla y renderizarse dinámicamente.

---

## Arquitectura general

- **Frontend**: React (Vite)
- **Backend**: Laravel (API REST)
- **Base de datos**: SQLite (por simplicidad)
- **Storage**: Sistema de archivos local de Laravel

Existe **una única configuración global de estilos**.

El backend decide:

- Si no existe configuración → se crea
- Si ya existe → se actualiza

---

## Estado actual

### Frontend

Formulario funcional con:

- Selector de color (`input type="color"` + input hexadecimal)
- Subida de imagen con:
  - Validación de tipo
  - Límite de tamaño (512KB)
  - Previsualización local
- Selector de fuente mediante Google Fonts API:
  - Búsqueda
  - Dropdown
  - Navegación por teclado
  - Previsualización en tiempo real mediante `<link>` dinámico
- Envío de datos mediante `FormData` al backend

Validaciones UX en frontend:

- Color con formato hexadecimal válido
- Imagen válida y menor de 512KB
- Fuente seleccionada

---

### Backend

API funcional en Laravel.

#### Endpoints

GET /api/styles  
POST /api/styles

---

#### GET /api/styles

Devuelve la configuración actual o valores por defecto si no existe:

```json
{
  "exists": false,
  "color": "#ffffff",
  "font": "Roboto",
  "image_url": null
}
```

o

```json
{
  "exists": true,
  "color": "#aabbcc",
  "font": "Roboto",
  "image_url": "http://localhost/storage/styles/xxxx.png"
}
```

---

#### POST /api/styles

Crea o actualiza la configuración.

Validaciones:

- color → required, formato hex
- font → required, string, max 255
- image →
  - obligatoria solo la primera vez
  - tipo imagen
  - tamaño máximo 512KB

Errores de validación (422):

```json
{
  "message": "La imagen es obligatoria...",
  "errors": {
    "image": ["La imagen es obligatoria..."]
  }
}
```

Backend maneja:

- Creación inicial
- Actualización parcial
- Guardado de imagen en storage/app/public/styles
- Eliminación de imagen anterior al subir una nueva
- Logging de errores internos

---

## Base de datos

Tabla `styles`:

- id
- color (string, 7)
- font (string)
- image_path (string, nullable)
- timestamps

---

## Flujo completo

1. Usuario modifica formulario
2. Frontend valida UX
3. Se envía FormData
4. Laravel valida definitivamente
5. Se guarda en DB / Storage
6. Se devuelve JSON
7. Frontend muestra resultado

---

## Tecnologías

- React
- Vite
- Laravel
- SQLite
- Google Fonts API
- Fetch API
- FormData

---

## Próximos pasos

- Conectar completamente los errores 422 al estado del formulario
- Crear landing page que consuma GET /api/styles
- Persistir preview inicial cargando datos desde backend
- Añadir selector de peso de fuente
- Refinar UI

---

## Nota

Este proyecto prioriza el aprendizaje de arquitectura y flujo de datos sobre el diseño visual.

---

## 📅 Bitácora de desarrollo

### Sesión – Rehidratación, sincronización de estado y robustez del formulario

#### 🎯 Objetivos

- Mejorar el flujo de validación del formulario.
- Sincronizar correctamente la respuesta del backend tras POST.
- Implementar rehidratación inicial con GET.
- Corregir persistencia de tipografía e imagen.
- Mejorar comportamiento del FontPicker.

---

#### ✅ Cambios realizados

##### 1. Gestión avanzada de errores en frontend

- Separación clara entre:
  - `fieldErrors` → errores por campo (422 de Laravel)
  - `formError` → errores globales (red, 500, etc.)
- Implementado helper `mapLaravelFieldErrors` para adaptar la estructura `{ field: [msg] }` a `{ field: msg }`.
- Limpieza automática de errores al modificar un campo.
- Estado `isSubmitting` para evitar dobles envíos.

---

##### 2. Sincronización tras POST

El backend devuelve ahora:

- `color`
- `font`
- `image_url`

El frontend actualiza el estado tras guardar:

- `setColor(data.color)`
- `setSelectedFont(...)`
- `setImagePreview(data.image_url)`

Esto evita hacer un segundo GET tras cada POST.

---

##### 3. Rehidratación inicial

Al montar el formulario:

- Se hace `GET /api/styles`
- Se cargan:
  - color persistido
  - fuente persistida
  - imagen persistida

Esto permite que al recargar la página el formulario muestre el estado real guardado.

---

##### 4. Corrección de persistencia de tipografía

Problema detectado:

- El nombre de la fuente se cargaba, pero las previews no cambiaban.

Solución:

- Simplificada carga dinámica de Google Fonts (sin depender de variants).
- Al rehidratar, se resetea el objeto `selectedFont`.
- El input del buscador sincroniza su valor con `selectedFont.family`.

---

##### 5. Mejoras en FontPicker

- Estados claros:
  - cargando
  - error de API
  - sin resultados
- Dropdown muestra mensajes contextuales.
- Navegación por teclado.
- Separación entre:
  - estado interno del buscador
  - validación del formulario

---

#### 🧠 Aprendizajes clave

- Diferencia entre:
  - estado React en memoria
  - persistencia backend
  - rehidratación al montar
- Flujo real de validación en Laravel: request → validate → 422
- Sincronización frontend/backend sin llamadas redundantes.
- Separación de responsabilidades entre componentes.
- Manejo correcto de recursos externos (Google Fonts).

---
