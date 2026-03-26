# 08 – DASHBOARD Y REPORTES (Admin)

## 📊 Dashboard Principal (`/admin/dashboard`)

### KPIs – Tarjetas en la parte superior

```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  🐎 Caballos │  │  👨‍🎓 Alumnos  │  │ 💰 Ingresos  │  │  📅 Clases   │
│  8 / 10      │  │  23 activos  │  │  $2.850.000  │  │  47 este mes │
│  disponibles │  │  3 pendientes│  │  este mes    │  │  8 hoy       │
└──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘
```

### Alertas del día

```
🔴 3 apoderados con pago atrasado
🟡 2 alumnos esperando aprobación
🟡 1 alumno esperando respuesta del profesor
```

### Agenda del día

Vista de todas las clases de hoy con estado:
- Programadas / Realizadas / Canceladas
- Qué caballos están siendo usados hora a hora

---

## 📈 Módulo de Reportes (`/admin/reportes`)

### Reporte 1: Ingresos por Mes

**Filtros:** Rango de fechas (mes/año de – mes/año hasta)

```
INGRESOS – ENERO 2026 a MARZO 2026
────────────────────────────────────────────────
Mes         Grupales    Individuales    Total
────────────────────────────────────────────────
Enero        $450.000    $315.000       $765.000
Febrero      $510.000    $270.000       $780.000
Marzo        $480.000    $360.000       $840.000
────────────────────────────────────────────────
TOTAL      $1.440.000    $945.000     $2.385.000
```

Gráfico de barras por mes (Chart.js).

---

### Reporte 2: Asistencia por Alumno

**Filtros:** Profesor, mes, nivel

```
ASISTENCIA – MARZO 2026
──────────────────────────────────────────────────────
Alumno          Profesor      Clases  Asistió  %
──────────────────────────────────────────────────────
Martín López    Carolina P.   8       7        87.5%
Sofía Ruiz      Ana M.        6       6        100%
Pedro Silva     Carolina P.   4       2        50%  ⚠️
──────────────────────────────────────────────────────
```

---

### Reporte 3: Pagos Atrasados

Lista de apoderados con pagos pendientes o atrasados:

```
PAGOS PENDIENTES / ATRASADOS
────────────────────────────────────────────────────────
Apoderado       Hijos    Mes       Monto     Estado   Días
────────────────────────────────────────────────────────
Juan Pérez      2        Marzo     $285.000  Atrasado  15
María Soto      1        Abril     $150.000  Pendiente  –
────────────────────────────────────────────────────────
```

Acciones: Enviar WhatsApp recordatorio / Marcar como pagado / Condonar

---

### Reporte 4: Ocupación de Caballos por Horario

Vista tipo "heatmap" semanal:

```
         Lun   Mar   Mié   Jue   Vie   Sáb
14:00    ██░░  ░░░░  ██░░  ░░░░  ██░░  ████
15:00    ████  ██░░  ████  ██░░  ████  ████
16:00    ████  ████  ████  ████  ████  ████  ← LLENO
17:00    ██░░  ████  ██░░  ████  ██░░  ████
18:00    ░░░░  ██░░  ░░░░  ██░░  ░░░░  ██░░
```

Colores: Verde (< 50%) → Amarillo (50–80%) → Rojo (> 80%)

---

### Reporte 5: Distribución a Profesores

```
DISTRIBUCIÓN PROFESORES – MARZO 2026
────────────────────────────────────────────────
Profesor        Clases   Grupales  Individuales  Total
────────────────────────────────────────────────
Carolina P.     18       12        6             $630.000
Ana Morales     14       10        4             $480.000
────────────────────────────────────────────────
TOTAL           32       22        10          $1.110.000
```

---

## 📤 Exportación

Todos los reportes pueden exportarse a:

### Excel (XLSX)
```typescript
import * as XLSX from 'xlsx'

function exportarReporte(datos: any[], nombreArchivo: string) {
  const ws = XLSX.utils.json_to_sheet(datos)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Reporte')
  XLSX.writeFile(wb, `${nombreArchivo}.xlsx`)
}
```

### PDF
```typescript
// Usando jsPDF + autoTable
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

function exportarPDF(titulo: string, headers: string[], datos: any[][]) {
  const doc = new jsPDF()
  doc.text(titulo, 14, 16)
  autoTable(doc, {
    head: [headers],
    body: datos,
    startY: 25,
    theme: 'grid',
    headStyles: { fillColor: [44, 62, 80] }
  })
  doc.save(`${titulo}.pdf`)
}
```

---

## 🔔 Panel de Aprobaciones Pendientes (`/admin/usuarios`)

### Apoderados pendientes

Tarjetas con:
- Nombre completo
- Email
- Teléfono
- Fecha de registro
- Botones: [✅ Aprobar] [❌ Rechazar]

### Alumnos pendientes de aprobación admin

(Separado de la aprobación del profesor)

### Profesores activos

Tabla con actividad reciente:
- Nombre
- Clases impartidas este mes
- Alumnos activos
- Último acceso

---

## ⚙️ Configuración del Club (`/admin/configuracion`)

```
Club
─────────────────────────────────
Nombre del club:         [Club Ecuestre        ]
Teléfono admin:          [+56912345678         ]

Capacidad
─────────────────────────────────
Caballos disponibles:    [ 10 ]
Cupo máximo clase grupal:[ 6  ]

Precios
─────────────────────────────────
Precio clase grupal:     [ $30.000 ]
Precio clase individual: [ $45.000 ]

Reglas
─────────────────────────────────
Horas mínimas para cancelar: [ 24 ]
Requiere pago al día para agendar: [✅]

[  GUARDAR CAMBIOS  ]
```

---

## 🐎 Gestión de Caballos (`/admin/caballos`)

```
Lista de caballos:
┌─────────────────────────────────────────┐
│  🐎 Relampago       [Disponible ✅] [...] │
│  🐎 Tornado         [Disponible ✅] [...] │
│  🐎 Canela          [No disponible ❌] [...]│
│  🐎 Estrella        [Disponible ✅] [...] │
└─────────────────────────────────────────┘

[ + Agregar caballo ]
```

Cada caballo tiene: nombre, disponibilidad, notas (ej: "lesión en pata delantera – reposo 2 semanas").

La cantidad de caballos **disponibles** es lo que limita los cupos simultáneos.