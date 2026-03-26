# 01 – VISIÓN GENERAL DEL SISTEMA

## 🎯 Propósito

La plataforma digitaliza completamente la operación de un club ecuestre privado en Chile. Reemplaza la coordinación manual (WhatsApp, hojas de cálculo, efectivo) por un sistema web centralizado que gestiona alumnos, clases, pagos y comunicaciones de forma automática.

---

## 🏇 Contexto del Negocio

- **Club:** Operado por Constanza Duhalde (admin única)
- **Recurso limitante:** Caballos disponibles (configurable, define cupos máximos simultáneos)
- **Tipos de clase:** Grupal ($30.000 CLP) e Individual ($45.000 CLP)
- **Pago:** Prepago mensual vía Mercado Pago
- **Comunicación principal:** WhatsApp automático vía Twilio

---

## 🔄 Flujo General del Sistema

```
ADMIN crea cuenta del sistema
    │
    ├──► Configura caballos disponibles
    ├──► Crea profesores (envía link de registro)
    │
APODERADO se registra
    │
    ├──► Espera aprobación del ADMIN
    ├──► Registra hijos (alumnos)
    │       └──► Cada hijo espera aprobación
    │
    ├──► Selecciona profesor para cada hijo
    │       └──► Profesor acepta o rechaza al alumno
    │
    ├──► Agenda clases del mes
    │       └──► Sistema valida: cupos + horario + aprobación
    │
    ├──► Recibe resumen mensual de cobro
    ├──► Paga vía Mercado Pago (prepago)
    │
    └──► Recibe WhatsApp: recordatorio de clase, confirmación de pago
```

---

## 📱 Vistas por Rol

### Admin (`/admin`)
- Dashboard con métricas del club
- Gestión de usuarios pendientes de aprobación
- Configuración de caballos y capacidad
- Reportes de ingresos y asistencia
- Gestión de carreras Endurance

### Profesor (`/profesor`)
- Mi disponibilidad semanal
- Lista de mis alumnos
- Marcado de asistencia por clase
- Vista de mi agenda del mes

### Apoderado (`/apoderado`)
- Mis hijos
- Agendar / cancelar / reagendar clases
- Ver quién más estará en la clase (grupales)
- Estado de pagos del mes

---

## 🗺 Sitemap Completo

```
/                          → Landing pública (próxima carrera Endurance)
/login                     → Login (email+pass o Google)
/registro                  → Registro apoderado
/registro/profesor/:token  → Registro profesor (link único del admin)

/admin/
  dashboard                → KPIs del club
  usuarios/                → Aprobación de apoderados y alumnos
  profesores/              → Gestión de profesores
  caballos/                → Configurar capacidad
  clases/                  → Vista global del calendario
  pagos/                   → Estado de pagos todos los apoderados
  reportes/                → Ingresos, asistencia, exportar
  endurance/               → Crear y gestionar carreras

/profesor/
  dashboard                → Mi agenda hoy
  disponibilidad           → Configurar horarios semanales
  alumnos/                 → Mis alumnos (aceptar/rechazar)
  asistencia/:claseId      → Marcar asistencia

/apoderado/
  dashboard                → Resumen hijos y próximas clases
  hijos/                   → CRUD hijos
  hijos/:hijoId/agendar    → Calendario y agendamiento
  hijos/:hijoId/clases     → Historial clases del hijo
  pagos/                   → Resumen mensual y pagar
  endurance/               → Ver carreras e inscribir hijos
```

---

## 🔔 Eventos que Disparan Notificaciones

| Evento | Canal | Destinatario |
|--------|-------|-------------|
| Clase agendada | WhatsApp | Apoderado |
| Recordatorio clase (3-4 hrs antes) | WhatsApp | Apoderado |
| Clase cancelada < 24 hrs | WhatsApp | Apoderado |
| Pago recibido | WhatsApp | Apoderado |
| Pago pendiente (día 1 del mes) | WhatsApp | Apoderado |
| Nuevo alumno esperando aprobación | Email + App | Admin |
| Alumno aceptado por profesor | WhatsApp | Apoderado |
| Carrera próxima (7 días antes) | WhatsApp | Inscriptos |