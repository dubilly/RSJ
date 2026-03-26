# 04 – MÓDULO DE CLASES Y AGENDAMIENTO

## 🏇 Tipos de Clase

| Tipo | Precio | Cupo máximo | Descripción |
|------|--------|-------------|-------------|
| `grupal` | $30.000 CLP | Configurable (default: 6) | Varios alumnos simultáneos |
| `individual` | $45.000 CLP | 1 alumno | Clase exclusiva |

> Los precios se configuran en `configuracion_club` y pueden ser modificados por el admin. El precio al momento de agendar queda **grabado en `clases.precio`** (no cambia si el admin lo modifica después).

---

## 📅 Flujo de Agendamiento (Apoderado)

```
1. Apoderado entra a /apoderado/hijos/:hijoId/agendar

2. Sistema verifica:
   - alumno.status = 'activo' (aprobado por admin)
   - alumno.status_profesor = 'aceptado' (aceptado por el profesor)
   - alumno.profesor_id NOT NULL

3. Se muestra el calendario del mes actual y siguiente

4. Solo se muestran en el calendario los días con
   disponibilidad del profesor asignado al alumno

5. Apoderado selecciona:
   a. Fecha
   b. Bloque horario disponible
   c. Tipo de clase: Grupal / Individual

6. Sistema ejecuta validaciones (ver abajo)

7. Si todo OK → confirma la inscripción
   - Crea registro en `clases` (si no existe una grupal en ese horario)
   - Crea registro en `clase_inscripciones`
   - Envía WhatsApp de confirmación

8. Si hay error → muestra mensaje claro al apoderado
```

---

## ✅ Validaciones al Agendar

Todas estas validaciones deben ejecutarse en orden. Si alguna falla, se detiene y se muestra error.

### V1 – Alumno activo y aprobado
```
alumno.status = 'activo' AND alumno.status_profesor = 'aceptado'
Error: "Este alumno aún no ha sido aprobado para tomar clases"
```

### V2 – Cupos disponibles (caballos)
```
Contar clases simultáneas en ese horario (fecha + hora) en toda la plataforma
Si COUNT >= total_caballos_disponibles:
Error: "No hay caballos disponibles para ese horario. Elige otro."
```

### V3 – Profesor disponible
```
Verificar que el día/hora esté en disponibilidad_semanal del profesor
Y que el profesor no tenga otra clase encima (check_horario_disponible)
Error: "El profesor no tiene disponibilidad en ese horario"
```

### V4 – Cupo de la clase grupal
```
Si tipo = 'grupal':
  Si ya existe una clase grupal en ese horario con el mismo profesor:
    Si cupos_ocupados >= cupos_total:
      Error: "Esta clase grupal ya está completa"
    Sino: se suma a la clase existente
  Si no existe: se crea nueva clase grupal
```

### V5 – No inscripción duplicada
```
Verificar que el alumno no ya esté inscrito en esa clase
Error: "Este alumno ya tiene una clase agendada en ese horario"
```

### V6 – Pago al día (opcional, configurable)
```
Si configuracion_club.requiere_pago_al_dia = TRUE:
  Verificar que no haya pagos con status = 'atrasado'
  Error: "Tienes pagos pendientes. Regulariza para agendar clases."
```

---

## ❌ Regla de Cancelación

```typescript
// Cancelar una inscripción
async function cancelarInscripcion(inscripcionId: string, userId: string) {
  const inscripcion = await getInscripcion(inscripcionId)
  const clase = await getClase(inscripcion.clase_id)
  
  const ahora = new Date()
  const inicioClase = new Date(`${clase.fecha}T${clase.hora_inicio}`)
  const horasRestantes = (inicioClase.getTime() - ahora.getTime()) / (1000 * 60 * 60)
  const limiteHoras = configuracion_club.horas_cancelacion // default: 24
  
  if (horasRestantes < limiteHoras) {
    // Cancelación tardía
    inscripcion.status = 'cancelada_tarde'
    // La clase IGUAL se cobra en el resumen mensual
    // Se envía WhatsApp de alerta
    await enviarWhatsApp(apoderado.telefono, 'cancelacion_tardia', { clase })
  } else {
    // Cancelación válida - no se cobra
    inscripcion.status = 'cancelada'
    // Se libera el cupo
  }
  
  // En ambos casos: se puede reagendar en otro horario
}
```

---

## 🔄 Reagendamiento

El apoderado puede reagendar una clase cancelada (incluso tardía) a otro horario disponible en el mismo mes, SIN costo adicional, ya que la clase original ya fue cobrada.

- Solo disponible si `clase.status = 'programada'` (no realizada)
- La nueva clase sigue las mismas validaciones V1–V6
- Se crea una nueva inscripción en la nueva clase
- La inscripción original queda como `cancelada` o `cancelada_tarde`

---

## 👩‍🏫 Vista del Profesor – Gestión de Agenda

### Configurar disponibilidad semanal (`/profesor/disponibilidad`)

```
El profesor define bloques recurrentes:
- Día de la semana (checkbox: Lun / Mar / Mié / Jue / Vie / Sáb / Dom)
- Hora inicio
- Hora fin

Ejemplo: Lunes de 16:00 a 20:00
Esto significa que cada lunes puede tener clases dentro de ese bloque.
```

**Lógica importante:** La disponibilidad define el rango, no clases específicas. Las clases individuales de 1 hora se agendan dentro del rango.

### Aceptar/Rechazar alumnos (`/profesor/alumnos`)

```
Lista de alumnos pendientes de aceptación:
- Nombre del alumno
- Edad
- Nivel
- Nombre del apoderado
- [Aceptar] [Rechazar]

Al aceptar: alumno.status_profesor = 'aceptado'
Al rechazar: alumno.status_profesor = 'rechazado'
             → WhatsApp al apoderado
```

### Marcar asistencia (`/profesor/asistencia/:claseId`)

```
Se muestra lista de alumnos de la clase
Para cada alumno: [✅ Asistió] [❌ No asistió]
Puede agregar nota opcional por alumno
Solo disponible el día de la clase (y los 2 días siguientes como margen)
```

---

## 👩‍👧 Vista del Apoderado – Ver compañeros de clase

En clases grupales, el apoderado puede ver la lista de otros alumnos inscritos:
- Nombre del alumno (solo nombre de pila)
- Nivel
- **No se muestra** información del apoderado ni teléfono

---

## 📆 Lógica del Calendario

### Generación de slots disponibles

```typescript
// Para un alumno dado, generar slots disponibles en un mes
function generarSlotsDisponibles(
  alumnoId: string,
  mes: number,
  anio: number
): Slot[] {
  
  const profesor = getProfesorDelAlumno(alumnoId)
  const disponibilidad = getDisponibilidadSemanal(profesor.id)
  const clasesExistentes = getClasesDelProfesor(profesor.id, mes, anio)
  const caballosDisponibles = getTotalCaballosDisponibles()
  
  const slots = []
  
  // Para cada día del mes
  for (const dia of getDiasDelMes(mes, anio)) {
    const diaSemana = getDiaSemana(dia) // 1-7
    const disponibilidadDia = disponibilidad.filter(d => d.dia_semana === diaSemana)
    
    for (const bloque of disponibilidadDia) {
      // Generar slots de 1 hora dentro del bloque
      for (const hora of generarHorasDelBloque(bloque.hora_inicio, bloque.hora_fin)) {
        const ocupacionGlobal = getClasesSImultaneas(dia, hora)
        const hayCapacidad = ocupacionGlobal < caballosDisponibles
        const profesorLibre = !hayConflictoProfesor(profesor.id, dia, hora)
        
        if (hayCapacidad && profesorLibre) {
          slots.push({ dia, hora, tipo: ['grupal', 'individual'] })
        }
      }
    }
  }
  
  return slots
}
```

---

## 📊 Estados de una Clase

```
programada → realizada   (profesor marca asistencia)
programada → cancelada   (cancelación válida)
```

Los estados de `clase_inscripciones`:
```
confirmada → cancelada          (cancelación > 24 hrs)
confirmada → cancelada_tarde    (cancelación < 24 hrs – igual se cobra)
```