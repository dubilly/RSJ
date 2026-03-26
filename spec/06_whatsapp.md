# 06 – SISTEMA DE NOTIFICACIONES WHATSAPP (Twilio)

## 🔧 Configuración

**Proveedor:** Twilio  
**Canal:** WhatsApp Business API  
**Número:** Número de WhatsApp Business del club (configurado en Twilio Console)  
**Zona horaria:** America/Santiago (para cálculo de tiempos de envío)

---

## 📩 Templates de Mensajes

Todos los mensajes deben estar registrados como **WhatsApp Message Templates** aprobados en Twilio. Se listan aquí en español chileno.

---

### 1. 🟢 Confirmación de clase agendada

**Trigger:** Inmediatamente al crear `clase_inscripciones`

```
Hola {{nombre_apoderado}} 👋

Tu clase ha sido agendada exitosamente 🐎

Alumno:   {{nombre_alumno}}
Profesor: {{nombre_profesor}}
Fecha:    {{fecha_clase}}
Hora:     {{hora_clase}}
Tipo:     {{tipo_clase}}

¡Te esperamos en el club!
```

---

### 2. ⏰ Recordatorio de clase (mismo día)

**Trigger:** Cron job cada hora, enviado 3–4 horas antes de cada clase

```
Hola {{nombre_apoderado}} 👋

Te recordamos que hoy tienes clase de equitación 🐎

Alumno:   {{nombre_alumno}}
Profesor: {{nombre_profesor}}
Hora:     {{hora_clase}}
Tipo:     {{tipo_clase}}

¡Te esperamos!
```

**Lógica de envío:**
```typescript
// Cron: cada hora en punto
cron.schedule('0 * * * *', async () => {
  const ahora = new Date()
  const en3horas = addHours(ahora, 3)
  const en4horas = addHours(ahora, 4)
  
  // Buscar clases que empiecen entre 3 y 4 horas desde ahora
  const clases = await getClasesEnRango(en3horas, en4horas)
  
  for (const inscripcion of clases.inscripciones) {
    // Evitar duplicados (verificar en notificaciones_log)
    const yaEnviado = await checkNotificacionEnviada(
      inscripcion.id, 'recordatorio_clase'
    )
    if (!yaEnviado) {
      await enviarWhatsApp(inscripcion.apoderado.telefono, 'recordatorio_clase', {
        nombre_apoderado: inscripcion.apoderado.nombre,
        nombre_alumno: inscripcion.alumno.nombre,
        nombre_profesor: inscripcion.clase.profesor.nombre,
        hora_clase: formatHora(inscripcion.clase.hora_inicio),
        tipo_clase: inscripcion.clase.tipo === 'grupal' ? 'Clase grupal' : 'Clase individual'
      })
    }
  }
})
```

---

### 3. 🟡 Confirmación de pago recibido

**Trigger:** Webhook de Mercado Pago cuando `status = 'approved'`

```
Hola {{nombre_apoderado}} 👋

Tu pago ha sido recibido correctamente ✅

Monto: ${{monto_formateado}}
Mes:   {{mes_anio}}

¡Gracias por confiar en el Club Ecuestre!
```

---

### 4. 🔴 Recordatorio de pago pendiente

**Trigger:** Cron job diario a las 9:00 AM (solo cuando hay pagos atrasados)

```
Hola {{nombre_apoderado}} 👋

Tienes un pago pendiente del mes de {{mes_anio}} 🧾

Monto: ${{monto_formateado}}

Por favor regulariza a la brevedad para mantener 
tus clases activas 🐎

Puedes pagar en: {{link_pago}}
```

**Lógica:** Se envía MÁXIMO 1 vez por día por apoderado para no ser invasivo.

---

### 5. ⚠️ Alerta de cancelación tardía

**Trigger:** Cuando `clase_inscripciones.status` cambia a `'cancelada_tarde'`

```
Hola {{nombre_apoderado}} 👋

La cancelación de la clase de {{nombre_alumno}} 
no cumple con el plazo de 24 horas ⏰

Profesor: {{nombre_profesor}}
Fecha:    {{fecha_clase}}
Hora:     {{hora_clase}}

Por lo tanto la clase será considerada como 
realizada y cobrada normalmente.

Puedes reagendar en otro horario disponible.
```

---

### 6. ✅ Alumno aprobado por profesor

**Trigger:** Cuando `alumno.status_profesor` cambia a `'aceptado'`

```
Hola {{nombre_apoderado}} 👋

¡Buenas noticias! El profesor {{nombre_profesor}} 
ha aceptado a {{nombre_alumno}} 🐎🎉

Ya puedes agendar las clases del próximo mes 
desde la plataforma.
```

---

### 7. 🏇 Recordatorio de carrera Endurance

**Trigger:** Cron job, 7 días antes de cada carrera, solo para inscritos

```
Hola {{nombre_apoderado}} 👋

Se acerca la carrera en la que participa {{nombre_alumno}} 🐎

Carrera:  {{nombre_carrera}}
Fecha:    {{fecha_carrera}}
Lugar:    {{ubicacion_carrera}}

¡Recuerda revisar todos los detalles en la plataforma!
```

---

## 🔧 Función de Envío Centralizada

```typescript
// lib/whatsapp.ts
import twilio from 'twilio'

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

const FROM_NUMBER = `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`

type TipoNotificacion =
  | 'confirmacion_clase'
  | 'recordatorio_clase'
  | 'confirmacion_pago'
  | 'pago_pendiente'
  | 'cancelacion_tardia'
  | 'alumno_aprobado'
  | 'recordatorio_carrera'

const TEMPLATES: Record<TipoNotificacion, string> = {
  confirmacion_clase:   'HXabc123...',  // SIDs de templates en Twilio
  recordatorio_clase:   'HXdef456...',
  confirmacion_pago:    'HXghi789...',
  pago_pendiente:       'HXjkl012...',
  cancelacion_tardia:   'HXmno345...',
  alumno_aprobado:      'HXpqr678...',
  recordatorio_carrera: 'HXstu901...',
}

export async function enviarWhatsApp(
  telefono: string,
  tipo: TipoNotificacion,
  variables: Record<string, string>,
  referenciaId?: string
) {
  try {
    const message = await client.messages.create({
      from: FROM_NUMBER,
      to: `whatsapp:${telefono}`,
      contentSid: TEMPLATES[tipo],
      contentVariables: JSON.stringify(variables),
    })
    
    // Registrar en log
    await supabase.from('notificaciones_log').insert({
      destinatario: telefono,
      tipo,
      mensaje: JSON.stringify(variables),
      twilio_sid: message.sid,
      status: 'enviado',
      referencia_id: referenciaId
    })
    
    return { ok: true, sid: message.sid }
    
  } catch (error) {
    console.error('Error enviando WhatsApp:', error)
    
    // Registrar el error también
    await supabase.from('notificaciones_log').insert({
      destinatario: telefono,
      tipo,
      mensaje: JSON.stringify(variables),
      status: 'error',
      referencia_id: referenciaId
    })
    
    return { ok: false, error }
  }
}
```

---

## 📋 Formato de Teléfono

El sistema espera teléfonos en formato E.164 chileno:
- **Formato correcto:** `+56912345678`
- Twilio lo convierte automáticamente a `whatsapp:+56912345678`

**Validación en frontend:**
```typescript
const REGEX_TELEFONO_CL = /^\+569\d{8}$/
// Ej: +56912345678 ✅
// Ej: 912345678 ❌ (falta prefijo)
```

---

## 🛡 Anti-spam / Rate Limiting

- Recordatorios de pago: máximo 1 por día por apoderado
- Recordatorio de clase: solo 1 por clase (verificar `notificaciones_log`)
- No enviar mensajes entre 22:00 y 8:00 (hora Santiago) – reencolar para las 9:00

```typescript
function debeEnviarAhora(): boolean {
  const horaChile = new Date().toLocaleString('es-CL', {
    timeZone: 'America/Santiago',
    hour: 'numeric',
    hour12: false
  })
  const hora = parseInt(horaChile)
  return hora >= 8 && hora < 22
}
```

---

## 📊 Log de Notificaciones (Admin)

El admin puede ver en `/admin/notificaciones` un historial con:
- Fecha y hora de envío
- Destinatario
- Tipo de mensaje
- Estado (enviado / error)
- Twilio SID para trazabilidad