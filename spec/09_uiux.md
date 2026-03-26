# 09 – DISEÑO UI/UX

## 🎨 Identidad Visual

| Elemento | Valor |
|----------|-------|
| Paleta principal | Verde oscuro ecuestre `#1B4332` + Dorado `#D4A017` |
| Paleta secundaria | Beige cálido `#F5F0E8` + Marrón `#6B4226` |
| Fondo | Blanco `#FFFFFF` / Gris muy claro `#F9FAFB` |
| Error | Rojo `#DC2626` |
| Éxito | Verde `#16A34A` |
| Advertencia | Ámbar `#D97706` |
| Font principal | Inter (Google Fonts) |
| Font secundaria | Playfair Display (para títulos del landing) |

---

## 🧩 Componentes Base (shadcn/ui + Tailwind)

Todos los componentes usan **shadcn/ui** como base con las customizaciones del club:

- `Button` – variantes: `primary` (verde), `secondary` (dorado), `danger` (rojo), `ghost`
- `Card` – con borde suave y sombra ligera
- `Badge` – para estados de pago, asistencia, rol
- `Calendar` – para agendamiento (react-day-picker)
- `Dialog` / `Sheet` – para modales y drawers en mobile
- `Table` – para reportes
- `Select` / `Combobox` – para selección de profesor, alumno, etc.

---

## 📱 Diseño Responsive

**Mobile-first.** Los usuarios principales (apoderados) acceden desde teléfono.

| Breakpoint | Uso |
|------------|-----|
| < 640px (mobile) | Vista apilada, navegación por bottom tab bar |
| 640–1024px (tablet) | Sidebar colapsable |
| > 1024px (desktop) | Sidebar fijo, tablas completas |

---

## 🗂 Navegación por Rol

### Admin – Sidebar izquierdo

```
🐎 Club Ecuestre
────────────────
📊 Dashboard
👥 Usuarios
  └ Aprobaciones
  └ Profesores
  └ Apoderados
🐎 Caballos
📅 Clases
💰 Pagos
📈 Reportes
🏇 Endurance
⚙️ Configuración
```

### Profesor – Bottom nav (mobile) / Sidebar (desktop)

```
📅 Mi Agenda
👨‍🎓 Mis Alumnos
✅ Asistencia
👤 Mi Perfil
```

### Apoderado – Bottom nav (mobile) / Sidebar (desktop)

```
🏠 Inicio
👶 Mis Hijos
📅 Agendar
💰 Pagos
🏇 Carreras
👤 Mi Perfil
```

---

## 🎯 Pantallas Clave – Wireframes en Texto

### Login (`/login`)

```
┌────────────────────────────────┐
│                                │
│      🐎  Club Ecuestre         │
│                                │
│  ┌──────────────────────────┐  │
│  │  📧  tu@email.com        │  │
│  └──────────────────────────┘  │
│  ┌──────────────────────────┐  │
│  │  🔒  Contraseña          │  │
│  └──────────────────────────┘  │
│                                │
│  [ INICIAR SESIÓN ]            │
│                                │
│  ──────── o ────────           │
│                                │
│  [ G  Continuar con Google ]   │
│                                │
│  ¿No tienes cuenta?            │
│  Regístrate aquí               │
└────────────────────────────────┘
```

---

### Calendario de Agendamiento

```
┌────────────────────────────────────────────┐
│  Agendar clase para: Martín  ←→            │
├──────────────────┬─────────────────────────┤
│  < Abril 2026 >  │  Lunes 14 de Abril      │
│                  │  ─────────────────────  │
│  L  M  M  J  V  │  DISPONIBLE             │
│  7  8  9  10 11  │  ┌─────────────────┐   │
│ 14 15 16 17 18  │  │ 15:00 – 16:00  │   │
│ 21 22 23 24 25  │  │ 🐎 Grupal $30k  │   │
│ 28 29 30        │  │ 4/6 cupos       │   │
│                  │  └─────────────────┘   │
│  ● = disponible  │  ┌─────────────────┐   │
│  ▪ = sin cupos   │  │ 16:00 – 17:00  │   │
│                  │  │ 🐎 Grupal $30k  │   │
│                  │  │ 6/6 COMPLETO ❌ │   │
│                  │  └─────────────────┘   │
│                  │  ┌─────────────────┐   │
│                  │  │ 17:00 – 18:00  │   │
│                  │  │ 👤 Individual   │   │
│                  │  │ $45.000         │   │
│                  │  └─────────────────┘   │
└──────────────────┴─────────────────────────┘
```

---

### Dashboard Apoderado

```
┌────────────────────────────────┐
│  Hola, María 👋                 │
│  Martes 14 de Abril            │
├────────────────────────────────┤
│  👶 Mis hijos                  │
│  ┌──────────────────────────┐  │
│  │ Martín · Intermedio      │  │
│  │ Prof: Carolina           │  │
│  │ Próxima: Hoy 17:00 🐎    │  │
│  └──────────────────────────┘  │
│  ┌──────────────────────────┐  │
│  │ Sofía · Inicial          │  │
│  │ Prof: Ana                │  │
│  │ Próxima: Jueves 16:00 🐎 │  │
│  └──────────────────────────┘  │
├────────────────────────────────┤
│  💰 Pago Abril                 │
│  $285.000 · ⏳ Pendiente       │
│  [ PAGAR AHORA ]               │
└────────────────────────────────┘
```

---

## 🌐 Landing Page (`/`)

**Objetivo:** Presentar el club y mostrar la próxima carrera Endurance.

**Secciones:**

1. **Hero** – Imagen de fondo de caballo corriendo, slogan del club + slogan dinámico de carrera
2. **Sobre el club** – Descripción breve
3. **Próxima carrera** – Tarjeta destacada con mapa de Chile
4. **CTA** – "¿Quieres unirte al club?" → botón Regístrate

---

## ♿ Accesibilidad

- Todos los inputs con `<label>` asociado
- Botones con `aria-label` descriptivo
- Contraste mínimo WCAG AA
- Soporte navegación por teclado
- Mensajes de error descriptivos (no solo "Error: campo inválido")

---

## 🔄 Estados de Carga

- **Skeleton loaders** en lugar de spinners para tablas y listas
- Botones con estado `loading` (spinner + texto "Cargando...")
- Mensajes de error con botón "Reintentar"
- **Optimistic updates** para acciones de toggle (marcar asistencia, aprobar alumno)

---

## 📲 PWA (Progressive Web App)

La app debe poder instalarse en el teléfono del apoderado como PWA:

```json
// public/manifest.json
{
  "name": "Club Ecuestre",
  "short_name": "Ecuestre",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#1B4332",
  "theme_color": "#1B4332",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```