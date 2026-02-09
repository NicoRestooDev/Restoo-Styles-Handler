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
