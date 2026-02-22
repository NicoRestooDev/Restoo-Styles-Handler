# ✅ Frontend – Task List (Restoo Styles)

## 📋 Estado Frontend – BackOffice

| Área / Funcionalidad                            | Estado       |
| ----------------------------------------------- | ------------ |
| Sidebar fija estilo Restoo                      | ✅ Hecho     |
| Scroll independiente sidebar / contenido        | ✅ Hecho     |
| Header sticky en formularios                    | ✅ Hecho     |
| Layout settings en dos columnas (label + campo) | ✅ Hecho     |
| Integración Google Fonts API                    | ✅ Hecho     |
| Preview tipográfico en tiempo real              | ✅ Hecho     |
| Validaciones básicas frontend                   | ✅ Hecho     |
| Ajustar dropdown del buscador de fuentes        | ⏳ Pendiente |
| Modularizar BackOffice                          | ⏳ Pendiente |
| Normalizar estilos (mover inline a CSS)         | ⏳ Pendiente |

## 🔴 Arquitectura (alto impacto)

| Hecho | Tarea                                                  | Notas                        |
| ----- | ------------------------------------------------------ | ---------------------------- |
| ⬜    | Consumir sidebar desde backend (`GET /api/navigation`) | Eliminar sidebar hardcodeado |
| ⬜    | Adaptar sidebar a roles (Admin / Camarero)             | UI reacciona a datos         |
| ⬜    | Definir convivencia Blade + React                      | Qué vistas son SPA           |
| ⬜    | Separar config dev/prod (env)                          | API base URL, CORS           |

---

## 🟠 Arquitectura media

| Hecho | Tarea                                          | Notas                       |
| ----- | ---------------------------------------------- | --------------------------- |
| ⬜    | Refactor de `Form.jsx` (extraer hooks/helpers) | Reducir tamaño              |
| ⬜    | Contexto global de estilos                     | Cache + rehidratación       |
| ⬜    | Sistema global de errores                      | Wrapper fetch / interceptor |
| ✅    | Decidir sistema CSS                            | Plano / Modules / Tailwind  |
| ⬜    | Sistema de design tokens                       | Colores, tipografía, etc    |

---

## 🟡 UX / UI

| Hecho | Tarea                          | Notas           |
| ----- | ------------------------------ | --------------- |
| ✅    | Usar `isLoading` correctamente | Bloquear UI     |
| ⬜    | Spinner reutilizable           | Componente      |
| ⬜    | Pulir error imagen >512kb      | Limpieza estado |
| ⬜    | Opción borrar imagen           | Backend + UI    |

---

## 🟢 Testing

| Hecho | Tarea                         | Notas          |
| ----- | ----------------------------- | -------------- |
| ⬜    | Tests de componentes (Vitest) | Form, Landing  |
| ⬜    | Tests de hooks                | useStyles, etc |

---

## 🟣 Deploy

| Hecho | Tarea                        | Notas   |
| ----- | ---------------------------- | ------- |
| ⬜    | Build producción frontend    | Vite    |
| ⬜    | Variables entorno producción | API URL |
