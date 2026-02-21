# ✅ Backend – Task List (Restoo Styles API)

## 🔴 Arquitectura (alto impacto)

| Hecho | Tarea                                     | Notas            |
| ----- | ----------------------------------------- | ---------------- |
| ⬜    | Integrar Laravel Sanctum                  | Auth API         |
| ⬜    | Sistema de roles                          | Admin / Camarero |
| ⬜    | Protección de rutas                       | Middleware       |
| ⬜    | Endpoint navegación `GET /api/navigation` | Filtrado por rol |

---

## 🟠 Arquitectura media

| Hecho | Tarea                      | Notas                   |
| ----- | -------------------------- | ----------------------- |
| ⬜    | Gestión global de errores  | Handler consistente     |
| ⬜    | Normalizar respuestas JSON | success / data / errors |
| ⬜    | Validaciones centralizadas | Form Requests           |
| ⬜    | Soft delete imagen antigua | Si aplica               |

---

## 🟡 Base de datos

| Hecho | Tarea                           | Notas         |
| ----- | ------------------------------- | ------------- |
| ⬜    | Preparar migración a PostgreSQL | Documentado   |
| ⬜    | Evitar SQL específico           | Eloquent only |

---

## 🟢 Testing

| Hecho | Tarea                  | Notas               |
| ----- | ---------------------- | ------------------- |
| ⬜    | Tests endpoints styles | PHPUnit             |
| ⬜    | Tests validaciones     | Imagen, color, font |

---

## 🟣 Deploy

| Hecho | Tarea                             | Notas |
| ----- | --------------------------------- | ----- |
| ⬜    | Configurar entorno producción     | .env  |
| ⬜    | Storage productivo (S3 o similar) |       |
| ⬜    | CORS producción                   |       |
