# 05 – SISTEMA DE PAGOS (Mercado Pago – Checkout Pro)

## 💰 Modelo de Pago

**Tipo:** PREPAGO mensual  
**Plataforma:** Mercado Pago – Checkout Pro (redirect a MP, luego vuelve a la app)  
**Moneda:** CLP (Pesos chilenos)

---

## 🗓 Ciclo de Vida del Pago Mensual

```
Día 20 del mes anterior:
  └──► Sistema genera automáticamente el resumen del PRÓXIMO mes
       └──► Basado en clases ya agendadas para ese mes
       └──► Crea registro en tabla `pagos` con status = 'pendiente'
       └──► Envía WhatsApp al apoderado con el monto a pagar

Día 1 del mes en curso:
  └──► Si pago sigue 'pendiente' → status cambia a 'atrasado'
       └──► Envía WhatsApp de recordatorio de pago pendiente

Durante el mes:
  └──► Si apoderado agenda más clases → pago se actualiza (monto aumenta)
  └──► Si apoderado cancela clases (con > 24 hrs) → pago se actualiza (monto disminuye)

Pago recibido (cualquier día):
  └──► Mercado Pago llama al webhook
       └──► status → 'pagado'
       └──► Envía WhatsApp de confirmación
```

---

## 🧮 Cálculo del Resumen Mensual

```typescript
interface ResumenPago {
  apoderado_id: string
  mes: number
  anio: number
  detalle: {
    grupales: number           // cantidad de clases grupales
    individuales: number       // cantidad de clases individuales
    canceladas_tarde: number   // clases canceladas < 24hrs (igual se cobran)
    precio_grupal: number      // precio al momento de agendar
    precio_individual: number
  }
  monto_total: number
}

// Ejemplo:
{
  grupales: 5,          // 5 × $30.000 = $150.000
  individuales: 3,      // 3 × $45.000 = $135.000
  canceladas_tarde: 1,  // ya contada en grupal o individual
  monto_total: 285000   // $285.000
}
```

El sistema considera en el resumen:
- Inscripciones con `status = 'confirmada'` (clases que se tomarán)
- Inscripciones con `status = 'cancelada_tarde'` (canceladas < 24 hrs, igual se cobran)
- **NO incluye** inscripciones con `status = 'cancelada'` (canceladas a tiempo)

---

## 🔗 Integración con Mercado Pago

### 1. Crear preferencia de pago

```typescript
// Supabase Edge Function: /functions/crear-preferencia-mp
import { MercadoPagoConfig, Preference } from 'mercadopago'

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN })

async function crearPreferencia(pago: Pago, apoderado: Apoderado) {
  const preference = new Preference(client)
  
  const response = await preference.create({
    body: {
      items: [
        {
          id: pago.id,
          title: `Clases de Equitación – ${getNombreMes(pago.mes)} ${pago.anio}`,
          quantity: 1,
          unit_price: pago.monto_total,
          currency_id: 'CLP',
          description: generarDescripcionDetalle(pago.detalle),
        }
      ],
      payer: {
        email: apoderado.email,
        phone: { number: apoderado.telefono }
      },
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_URL}/apoderado/pagos?status=success&pago_id=${pago.id}`,
        failure: `${process.env.NEXT_PUBLIC_URL}/apoderado/pagos?status=failure&pago_id=${pago.id}`,
        pending: `${process.env.NEXT_PUBLIC_URL}/apoderado/pagos?status=pending&pago_id=${pago.id}`,
      },
      auto_return: 'approved',
      external_reference: pago.id,       // nuestro ID de pago
      notification_url: `${process.env.NEXT_PUBLIC_URL}/api/webhooks/mercadopago`,
      statement_descriptor: 'CLUB ECUESTRE',
    }
  })
  
  // Guardar el preference_id en nuestra tabla de pagos
  await updatePago(pago.id, { mp_preference_id: response.id })
  
  return response.init_point  // URL de pago de Mercado Pago
}
```

### 2. Webhook de Mercado Pago

```typescript
// /app/api/webhooks/mercadopago/route.ts
export async function POST(request: Request) {
  const body = await request.json()
  
  // Verificar firma del webhook
  const signature = request.headers.get('x-signature')
  if (!verificarFirmaMP(body, signature)) {
    return Response.json({ error: 'Firma inválida' }, { status: 401 })
  }
  
  if (body.type === 'payment') {
    const paymentId = body.data.id
    const mpPayment = await getMercadoPagoPayment(paymentId)
    
    const pagoId = mpPayment.external_reference  // nuestro ID
    
    if (mpPayment.status === 'approved') {
      await supabase.from('pagos').update({
        status: 'pagado',
        mp_payment_id: paymentId,
        mp_status: 'approved',
        pagado_at: new Date().toISOString()
      }).eq('id', pagoId)
      
      // Notificar por WhatsApp
      const apoderado = await getApoderadoByPago(pagoId)
      await enviarWhatsApp(apoderado.telefono, 'confirmacion_pago', {
        monto: mpPayment.transaction_amount,
        mes: pago.mes,
        anio: pago.anio
      })
    }
  }
  
  return Response.json({ ok: true })
}
```

---

## 📊 Estados de Pago

| Status | Descripción | Color UI |
|--------|-------------|----------|
| `pendiente` | Generado, esperando pago | Amarillo 🟡 |
| `pagado` | Pago confirmado por MP | Verde 🟢 |
| `atrasado` | Pasó el día 1 del mes sin pagar | Rojo 🔴 |
| `condonado` | Admin lo marcó como condonado | Gris ⚪ |

---

## 💼 Distribución a Profesores

El sistema calcula automáticamente cuánto le corresponde a cada profesor:

```typescript
// Se ejecuta mensualmente (cron job o trigger)
async function calcularDistribucionProfesores(mes: number, anio: number) {
  // Obtener todas las clases realizadas del mes
  const clases = await getClasesRealizadas(mes, anio)
  
  // Agrupar por profesor
  const porProfesor = groupBy(clases, 'profesor_id')
  
  for (const [profesorId, clasesProfes] of Object.entries(porProfesor)) {
    const monto = clasesProfes.reduce((sum, clase) => {
      // Solo cuenta las inscripciones confirmadas o canceladas_tarde
      return sum + (clase.precio * clase.inscripciones_cobradas)
    }, 0)
    
    await upsert('distribucion_profesores', {
      profesor_id: profesorId,
      mes, anio, monto,
      clases_count: clasesProfes.length
    })
  }
}
```

> **Nota:** La distribución es informativa para el admin. El pago real a los profesores se maneja fuera del sistema (transferencia bancaria directa).

---

## 🖥 UI de Pagos

### Vista Apoderado (`/apoderado/pagos`)

```
┌─────────────────────────────────────────┐
│  💰 Mis Pagos                            │
├─────────────────────────────────────────┤
│  ABRIL 2026                             │
│  ─────────────────────────────          │
│  5 clases grupales    $150.000          │
│  3 clases individuales $135.000          │
│  ─────────────────────────────          │
│  TOTAL                $285.000          │
│                                         │
│  Estado: ⏳ PENDIENTE                   │
│  Vence:  31/03/2026                     │
│                                         │
│  [  💳 PAGAR AHORA  ]                   │
└─────────────────────────────────────────┘

│  Historial                              │
│  MARZO 2026  ✅ Pagado  $210.000        │
│  FEB 2026    ✅ Pagado  $150.000        │
```

### Vista Admin (`/admin/pagos`)

Tabla con todos los apoderados:

| Apoderado | Hijos | Clases | Monto | Estado | Acción |
|-----------|-------|--------|-------|--------|--------|
| Juan P. | 2 | 8 | $285.000 | 🔴 Atrasado | Marcar pagado / Condonar |

---

## ⚙️ Cron Jobs (Supabase Edge Functions + cron)

```typescript
// Día 20 de cada mes – generar resúmenes del mes siguiente
cron.schedule('0 9 20 * *', generarResumenesMensuales)

// Día 1 de cada mes – marcar pagos pendientes como atrasados
cron.schedule('0 9 1 * *', marcarPagosAtrasados)

// Diario a las 9am – enviar recordatorios de pagos atrasados
cron.schedule('0 9 * * *', enviarRecordatoriosPagos)
```