# 🐎 Club Ecuestre – Especificaciones Técnicas Completas

> **Versión:** 1.0  
> **Fecha:** Marzo 2026  
> **Administradora:** Constanza Duhalde  
> **Para:** Google Antigravity – Desarrollo Full Stack

---

## 📁 Árbol de Documentos

```
club-ecuestre-specs/
├── 00-INDEX.md                        ← Este archivo
├── 01-OVERVIEW.md                     ← Visión general, propósito y contexto
├── 02-AUTH.md                         ← Autenticación, roles y flujo de registro
├── 03-DATABASE.md                     ← Esquema completo de base de datos (Supabase)
├── 04-CLASES.md                       ← Módulo de clases y agendamiento
├── 05-PAGOS.md                        ← Sistema de pagos con Mercado Pago
├── 06-WHATSAPP.md                     ← Notificaciones automáticas WhatsApp
├── 07-ENDURANCE.md                    ← Módulo de carreras Endurance
├── 08-REPORTES.md                     ← Dashboard y reportes del admin
├── 09-UI-UX.md                        ← Diseño, navegación y componentes
└── 10-DEPLOYMENT.md                   ← Infraestructura, variables de entorno, deploy
```

---

## 🛠 Stack Tecnológico Definido

| Capa | Tecnología |
|------|-----------|
| Frontend | Next.js 14 (App Router) |
| Backend / DB | Supabase (PostgreSQL + Auth + Storage + Edge Functions) |
| Autenticación | Supabase Auth + Google OAuth |
| Pagos | Mercado Pago – Checkout Pro |
| WhatsApp | Twilio (WhatsApp Business API) |
| Deploy | Vercel (frontend) + Supabase Cloud |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS + shadcn/ui |

---

## 🌍 Configuración Regional

- **Idioma:** Español chileno  
- **Moneda:** Pesos chilenos (CLP) – formato `$30.000`  
- **Fechas:** DD/MM/YYYY  
- **Zona horaria:** `America/Santiago`  
- **País:** Chile  

---

## 👥 Roles del Sistema

| Rol | Descripción |
|-----|-------------|
| `admin` | Constanza Duhalde – acceso total |
| `profesor` | Solo ve sus alumnos y agenda |
| `apoderado` | Gestiona sus hijos y agenda clases |

---

## ⚡ Reglas de Negocio Críticas

1. **Ningún usuario opera sin aprobación del admin**
2. **Los cupos están limitados por número de caballos** (configurable por admin)
3. **Cancelación < 24 hrs = clase cobrada igual**
4. **Prepago mensual** – el apoderado paga ANTES de que transcurra el mes
5. **No puede haber sobreposición de horarios** (mismo caballo, mismo profesor, misma hora)