# 10 – INFRAESTRUCTURA Y DEPLOY

## 🏗 Arquitectura General

```
┌─────────────────────────────────────────────────────────┐
│                       VERCEL                             │
│  Next.js 14 App (Frontend + API Routes)                 │
│  - /app/** → React Server Components                    │
│  - /app/api/** → Route Handlers                         │
│  - Middleware → Auth check + Role routing               │
└──────────────────────┬──────────────────────────────────┘
                       │
         ┌─────────────┼─────────────┐
         ▼             ▼             ▼
┌──────────────┐ ┌──────────┐ ┌──────────────┐
│   SUPABASE   │ │  TWILIO  │ │ MERCADO PAGO │
│  PostgreSQL  │ │ WhatsApp │ │  Checkout    │
│  Auth        │ │  API     │ │  Pro         │
│  Storage     │ │          │ │  Webhooks    │
│  Edge Fns    │ └──────────┘ └──────────────┘
│  Realtime    │
└──────────────┘
```

---

## 📁 Estructura del Proyecto Next.js

```
club-ecuestre/
├── app/
│   ├── (public)/
│   │   ├── page.tsx               → Landing /
│   │   ├── login/page.tsx
│   │   ├── registro/page.tsx
│   │   └── registro/profesor/[token]/page.tsx
│   │
│   ├── (auth)/                    → Rutas protegidas
│   │   ├── admin/
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── usuarios/page.tsx
│   │   │   ├── caballos/page.tsx
│   │   │   ├── clases/page.tsx
│   │   │   ├── pagos/page.tsx
│   │   │   ├── reportes/page.tsx
│   │   │   ├── endurance/page.tsx
│   │   │   └── configuracion/page.tsx
│   │   │
│   │   ├── profesor/
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── disponibilidad/page.tsx
│   │   │   ├── alumnos/page.tsx
│   │   │   └── asistencia/[claseId]/page.tsx
│   │   │
│   │   └── apoderado/
│   │       ├── dashboard/page.tsx
│   │       ├── hijos/page.tsx
│   │       ├── hijos/[hijoId]/agendar/page.tsx
│   │       ├── hijos/[hijoId]/clases/page.tsx
│   │       ├── pagos/page.tsx
│   │       └── endurance/page.tsx
│   │
│   ├── api/
│   │   ├── webhooks/
│   │   │   ├── mercadopago/route.ts
│   │   │   └── mercadopago-carrera/route.ts
│   │   └── cron/
│   │       ├── recordatorios-clase/route.ts
│   │       └── pagos-mensuales/route.ts
│   │
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── ui/                        → shadcn/ui components
│   ├── admin/
│   ├── profesor/
│   ├── apoderado/
│   └── shared/
│       ├── MapaChile.tsx
│       ├── CalendarioClases.tsx
│       └── WhatsAppPreview.tsx
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts              → Browser client
│   │   ├── server.ts              → Server client
│   │   └── middleware.ts
│   ├── whatsapp.ts
│   ├── mercadopago.ts
│   └── utils.ts
│
├── types/
│   └── database.types.ts          → Generado por Supabase CLI
│
├── middleware.ts                   → Auth + Role routing
└── supabase/
    ├── migrations/                → SQL migrations
    ├── functions/                 → Edge Functions
    │   ├── cron-recordatorios/
    │   └── cron-pagos/
    └── seed.sql
```

---

## 🔐 Variables de Entorno

### `.env.local` (desarrollo) / Vercel Environment Variables (producción)

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...   # Solo en server-side

# Mercado Pago
MP_ACCESS_TOKEN=APP_USR-...            # Chile, Producción
MP_PUBLIC_KEY=APP_USR-...              # Para el frontend
MP_WEBHOOK_SECRET=...                  # Para verificar firma del webhook

# Twilio
TWILIO_ACCOUNT_SID=ACxxx...
TWILIO_AUTH_TOKEN=...
TWILIO_WHATSAPP_NUMBER=+14155238886    # Número de Twilio WA
TWILIO_TEMPLATE_CONFIRMACION_CLASE=HXabc...
TWILIO_TEMPLATE_RECORDATORIO_CLASE=HXdef...
TWILIO_TEMPLATE_CONFIRMACION_PAGO=HXghi...
TWILIO_TEMPLATE_PAGO_PENDIENTE=HXjkl...
TWILIO_TEMPLATE_CANCELACION_TARDIA=HXmno...
TWILIO_TEMPLATE_ALUMNO_APROBADO=HXpqr...
TWILIO_TEMPLATE_RECORDATORIO_CARRERA=HXstu...

# App
NEXT_PUBLIC_URL=https://clubecuestre.cl
CRON_SECRET=...                        # Para proteger endpoints de cron
```

---

## ⏰ Cron Jobs

Los cron jobs se ejecutan como **Vercel Cron Jobs** (vercel.json) o **Supabase Edge Functions con pg_cron**.

```json
// vercel.json
{
  "crons": [
    {
      "path": "/api/cron/recordatorios-clase",
      "schedule": "0 * * * *"
    },
    {
      "path": "/api/cron/pagos-mensuales",
      "schedule": "0 9 1,20 * *"
    }
  ]
}
```

```typescript
// app/api/cron/recordatorios-clase/route.ts
export async function GET(request: Request) {
  // Verificar que la llamada viene de Vercel Cron
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Lógica del cron
  await procesarRecordatoriosClase()
  
  return Response.json({ ok: true, timestamp: new Date().toISOString() })
}
```

---

## 🚀 Deploy Pipeline

### Desarrollo
```bash
# Setup inicial
git clone https://github.com/org/club-ecuestre
cd club-ecuestre
npm install
cp .env.example .env.local
# Editar .env.local con credenciales

# Supabase local
npx supabase start
npx supabase db push     # Aplicar migrations

# Dev server
npm run dev
```

### Producción
```bash
# La rama main hace auto-deploy a Vercel
git push origin main

# Migraciones de BD (solo cuando hay cambios)
npx supabase db push --linked
```

### Comandos útiles
```bash
# Generar tipos TypeScript desde Supabase
npx supabase gen types typescript --linked > types/database.types.ts

# Crear nueva migration
npx supabase migration new nombre_migration
```

---

## 🔒 Seguridad

| Aspecto | Implementación |
|---------|---------------|
| Auth tokens | Manejados por Supabase (httpOnly cookies via SSR) |
| RLS | Habilitado en todas las tablas con datos sensibles |
| Webhooks | Verificación de firma en MP y Twilio |
| Cron endpoints | Protegidos con `CRON_SECRET` |
| Service Role Key | Solo en server-side, nunca en cliente |
| HTTPS | Forzado por Vercel |
| Variables de entorno | Nunca hardcodeadas, siempre desde env |

---

## 📊 Monitoreo

- **Vercel Analytics** – Performance y errores del frontend
- **Supabase Dashboard** – Queries, uso de la DB, errores
- **Twilio Console** – Estado de mensajes WhatsApp enviados
- **Mercado Pago Dashboard** – Pagos y webhooks

---

## 🧪 Testing Recomendado

| Tipo | Tool | Prioridad |
|------|------|-----------|
| Unit tests lógica de negocio | Vitest | Alta |
| Integration tests API | Supertest | Alta |
| E2E flujo de agendamiento | Playwright | Media |
| E2E flujo de pago | Playwright (mock MP) | Media |

---

## 📦 Dependencias Principales

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "@supabase/supabase-js": "^2.0.0",
    "@supabase/ssr": "^0.3.0",
    "mercadopago": "^2.0.0",
    "twilio": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "shadcn-ui": "latest",
    "react-leaflet": "^4.2.0",
    "leaflet": "^1.9.0",
    "react-day-picker": "^8.10.0",
    "date-fns": "^3.0.0",
    "xlsx": "^0.18.5",
    "jspdf": "^2.5.0",
    "jspdf-autotable": "^3.8.0",
    "recharts": "^2.12.0",
    "zod": "^3.22.0",
    "react-hook-form": "^7.51.0",
    "@hookform/resolvers": "^3.3.0"
  }
}
```