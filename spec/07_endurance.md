# 07 – MÓDULO DE CARRERAS ENDURANCE

## 🗺 Visión General

El módulo de carreras permite al club gestionar la participación en competencias de Endurance a lo largo de Chile. Incluye un mapa interactivo de Chile mostrando la ubicación de cada carrera.

---

## 🏠 Landing Page Pública (`/`)

La página pública (sin login) muestra:

### Slogan Dinámico
```
🐎 "Próxima carrera: Endurance Atacama – Abril 2026"
```

**Lógica del slogan:**
```typescript
async function getProximaCarrera() {
  const hoy = new Date()
  const proxima = await supabase
    .from('carreras')
    .select('*')
    .eq('activa', true)
    .gte('fecha', hoy.toISOString().split('T')[0])
    .order('fecha', { ascending: true })
    .limit(1)
    .single()
  
  return proxima.data
  // Si no hay carreras futuras → no mostrar slogan
}
```

### Mapa de Chile con carreras
- Mapa interactivo (usando **Leaflet.js** o **Mapbox**)
- Marcadores en las ubicaciones de las carreras futuras
- Click en marcador → popup con nombre, fecha, ubicación
- Botón "Ver más" → `/endurance` (requiere login para inscribirse)

---

## 👑 Admin – Crear y Gestionar Carreras (`/admin/endurance`)

### Crear nueva carrera

```
Formulario:
- Nombre de la carrera *
- Región de Chile * (select: Arica / Tarapacá / Antofagasta / Atacama / 
                              Coquimbo / Valparaíso / Metropolitana / 
                              O'Higgins / Maule / Ñuble / Biobío / 
                              La Araucanía / Los Ríos / Los Lagos / 
                              Aysén / Magallanes)
- Ubicación exacta * (texto: "Hacienda El Huique, Km 45 Ruta 66")
- Coordenadas (lat/lng) * – se puede buscar en mapa o ingresar manualmente
- Fecha de la carrera *
- Fecha límite de inscripción
- Costos:
  - Camión por caballo ($) *
  - Acompañante ($)
  - Peticero ($)
- Descripción (opcional)
```

### Vista de inscriptos por carrera

Tabla con:
- Nombre alumno
- Apoderado
- Opciones elegidas (camión / acompañante / peticero)
- Monto total
- Estado de pago

**Totales automáticos:**
```
Total inscritos: 12
Total camiones:  8  → $640.000
Total acompañantes: 5 → $250.000
Total peticeros: 3  → $120.000
─────────────────────────────
TOTAL A COBRAR:      $1.010.000
```

---

## 👩‍👧 Apoderado – Ver e Inscribirse (`/apoderado/endurance`)

### Lista de carreras disponibles

```
┌──────────────────────────────────────────┐
│  🏇 Endurance Atacama 2026               │
│  📍 Norte de Chile – Región Atacama      │
│  📅 15 de Abril, 2026                    │
│  ⏰ Inscripción hasta: 01/04/2026        │
│                                          │
│  Costos:                                 │
│  🚛 Camión:      $80.000 por caballo     │
│  👤 Acompañante: $50.000                 │
│  🐴 Peticero:    $40.000                 │
│                                          │
│  [ INSCRIBIR HIJO ]                      │
└──────────────────────────────────────────┘
```

### Formulario de inscripción

```
Seleccionar hijo: [dropdown con hijos activos]

Opciones:
[✅] Camión para el caballo    +$80.000
[  ] Llevar acompañante        +$50.000
[  ] Contratar peticero        +$40.000

Total estimado: $80.000

[ INSCRIBIR Y PAGAR → ]
```

### Cálculo automático de costos

```typescript
function calcularCostoCarrera(
  carrera: Carrera,
  opciones: { camion: boolean, acompanante: boolean, peticero: boolean }
): number {
  let total = 0
  if (opciones.camion)      total += carrera.costo_camion
  if (opciones.acompanante) total += carrera.costo_acompanante
  if (opciones.peticero)    total += carrera.costo_peticero
  return total
}
```

---

## 💳 Pago de Inscripción a Carrera

El pago de carreras es **independiente** del pago mensual de clases. Se paga al momento de inscribirse.

```typescript
async function crearPreferenciaCarrera(
  inscripcion: CarreraInscripcion,
  carrera: Carrera
) {
  const preference = await mp.createPreference({
    items: [{
      title: `Inscripción ${carrera.nombre} – ${alumno.nombre}`,
      quantity: 1,
      unit_price: inscripcion.monto_total,
      currency_id: 'CLP'
    }],
    back_urls: {
      success: `/apoderado/endurance?status=success`,
      failure:  `/apoderado/endurance?status=failure`,
    },
    external_reference: inscripcion.id,
    notification_url: `/api/webhooks/mercadopago-carrera`
  })
  
  return preference.init_point
}
```

---

## 🗺 Componente de Mapa de Chile

```typescript
// components/MapaChile.tsx
// Usa Leaflet.js (open source, sin costo)

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const CHILE_CENTER = [-35.6751, -71.5430]  // Centro geográfico de Chile
const CHILE_ZOOM = 5

export function MapaChile({ carreras }: { carreras: Carrera[] }) {
  return (
    <MapContainer
      center={CHILE_CENTER}
      zoom={CHILE_ZOOM}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
      {carreras.map(carrera => (
        <Marker
          key={carrera.id}
          position={[carrera.lat, carrera.lng]}
          icon={caballoIcon}  // ícono personalizado con 🐎
        >
          <Popup>
            <strong>{carrera.nombre}</strong><br/>
            📅 {formatFecha(carrera.fecha)}<br/>
            📍 {carrera.ubicacion}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
```

**Regiones de Chile y sus coordenadas aproximadas:**

| Región | Lat | Lng |
|--------|-----|-----|
| Arica y Parinacota | -18.4746 | -70.2979 |
| Tarapacá | -20.2140 | -70.1522 |
| Antofagasta | -23.6509 | -70.3975 |
| Atacama | -27.3668 | -70.3323 |
| Coquimbo | -29.9533 | -71.3395 |
| Valparaíso | -33.0472 | -71.6127 |
| Metropolitana | -33.4569 | -70.6483 |
| O'Higgins | -34.5755 | -71.0022 |
| Maule | -35.4264 | -71.6554 |
| Ñuble | -36.7226 | -71.7620 |
| Biobío | -37.4689 | -72.3527 |
| La Araucanía | -38.9489 | -72.3311 |
| Los Ríos | -39.8142 | -73.2459 |
| Los Lagos | -41.4717 | -72.9395 |
| Aysén | -45.5752 | -72.0662 |
| Magallanes | -53.1638 | -70.9171 |

---

## 🗑 Limpieza Automática de Carreras Pasadas

Las carreras **no se eliminan** de la base de datos (mantienen historial). Solo se actualizan:

```typescript
// Cron diario: actualizar carreras pasadas
cron.schedule('0 0 * * *', async () => {
  const hoy = new Date().toISOString().split('T')[0]
  
  await supabase
    .from('carreras')
    .update({ activa: false })
    .lt('fecha', hoy)
    .eq('activa', true)
})
```

El slogan dinámico solo muestra carreras con `activa = true` y `fecha >= hoy`.