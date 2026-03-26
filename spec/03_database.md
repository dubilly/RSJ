# 03 – BASE DE DATOS (Supabase / PostgreSQL)

## 🗂 Diagrama de Tablas

```
auth.users (Supabase)
    │
    └──► profiles ──────────────┬──► profesores
                                 ├──► apoderados
                                 └──► (admin)

apoderados ──► alumnos ──────────┬──► clase_inscripciones
                                  └──► asistencia

profesores ──► disponibilidad_semanal
            ──► clases (como dueño)

clases ──────► clase_inscripciones
             ──► asistencia

pagos ──────► apoderados (un pago por apoderado por mes)

carreras ───► carrera_inscripciones ──► alumnos

invitation_tokens ──► profiles (created_by, used_by)
```

---

## 📋 Esquema Completo

### `profiles`
```sql
CREATE TABLE profiles (
  id          UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role        TEXT NOT NULL CHECK (role IN ('admin','profesor','apoderado')),
  status      TEXT NOT NULL DEFAULT 'pendiente'
              CHECK (status IN ('pendiente','activo','rechazado','bloqueado')),
  nombre      TEXT NOT NULL,
  email       TEXT NOT NULL,
  telefono    TEXT,                    -- +569XXXXXXXX
  foto_url    TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);
```

---

### `profesores`
```sql
CREATE TABLE profesores (
  id              UUID REFERENCES profiles(id) ON DELETE CASCADE PRIMARY KEY,
  especialidad    TEXT,
  descripcion     TEXT,
  activo          BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
```

---

### `disponibilidad_semanal`
```sql
-- Define los bloques horarios recurrentes del profesor
CREATE TABLE disponibilidad_semanal (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profesor_id     UUID REFERENCES profesores(id) ON DELETE CASCADE NOT NULL,
  dia_semana      INT NOT NULL CHECK (dia_semana BETWEEN 1 AND 7),
                  -- 1=Lunes, 2=Martes, ..., 7=Domingo
  hora_inicio     TIME NOT NULL,          -- ej: 16:00
  hora_fin        TIME NOT NULL,          -- ej: 20:00
  activo          BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(profesor_id, dia_semana, hora_inicio)
);
```

---

### `apoderados`
```sql
CREATE TABLE apoderados (
  id              UUID REFERENCES profiles(id) ON DELETE CASCADE PRIMARY KEY,
  rut             TEXT,
  direccion       TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
```

---

### `alumnos`
```sql
CREATE TABLE alumnos (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  apoderado_id    UUID REFERENCES apoderados(id) ON DELETE CASCADE NOT NULL,
  profesor_id     UUID REFERENCES profesores(id),
  nombre          TEXT NOT NULL,
  fecha_nacimiento DATE NOT NULL,
  nivel           TEXT NOT NULL CHECK (nivel IN ('inicial','intermedio','avanzado')),
  foto_url        TEXT,
  condiciones_medicas TEXT,             -- alergias, condiciones relevantes
  status          TEXT NOT NULL DEFAULT 'pendiente'
                  CHECK (status IN ('pendiente','activo','rechazado','inactivo')),
  status_profesor TEXT DEFAULT 'pendiente'
                  CHECK (status_profesor IN ('pendiente','aceptado','rechazado')),
                  -- aprobación del profesor específico
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);
```

---

### `caballos`
```sql
CREATE TABLE caballos (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre          TEXT NOT NULL,
  disponible      BOOLEAN DEFAULT TRUE,
  notas           TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
```

---

### `configuracion_club`
```sql
-- Tabla de una sola fila con la configuración global
CREATE TABLE configuracion_club (
  id                    INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  max_alumnos_grupal    INT NOT NULL DEFAULT 6,
  precio_grupal         INT NOT NULL DEFAULT 30000,   -- CLP
  precio_individual     INT NOT NULL DEFAULT 45000,   -- CLP
  horas_cancelacion     INT NOT NULL DEFAULT 24,
  nombre_club           TEXT DEFAULT 'Club Ecuestre',
  telefono_admin        TEXT,
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);
```

---

### `clases`
```sql
CREATE TABLE clases (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profesor_id     UUID REFERENCES profesores(id) NOT NULL,
  tipo            TEXT NOT NULL CHECK (tipo IN ('grupal','individual')),
  fecha           DATE NOT NULL,
  hora_inicio     TIME NOT NULL,
  hora_fin        TIME NOT NULL,
  caballo_id      UUID REFERENCES caballos(id),
  precio          INT NOT NULL,           -- CLP, capturado al momento de agendar
  cupos_total     INT NOT NULL DEFAULT 1, -- 1 para individual, N para grupal
  cupos_ocupados  INT NOT NULL DEFAULT 0,
  status          TEXT NOT NULL DEFAULT 'programada'
                  CHECK (status IN ('programada','realizada','cancelada')),
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  
  -- Índices para validaciones de sobreposición
  CONSTRAINT no_overlap CHECK (hora_fin > hora_inicio)
);

CREATE INDEX idx_clases_profesor_fecha ON clases(profesor_id, fecha);
CREATE INDEX idx_clases_fecha ON clases(fecha);
```

---

### `clase_inscripciones`
```sql
CREATE TABLE clase_inscripciones (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clase_id        UUID REFERENCES clases(id) NOT NULL,
  alumno_id       UUID REFERENCES alumnos(id) NOT NULL,
  apoderado_id    UUID REFERENCES apoderados(id) NOT NULL,
  status          TEXT NOT NULL DEFAULT 'confirmada'
                  CHECK (status IN ('confirmada','cancelada','cancelada_tarde')),
  cancelada_at    TIMESTAMPTZ,
  motivo_cancelacion TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(clase_id, alumno_id)
);
```

---

### `asistencia`
```sql
CREATE TABLE asistencia (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clase_id        UUID REFERENCES clases(id) NOT NULL,
  alumno_id       UUID REFERENCES alumnos(id) NOT NULL,
  asistio         BOOLEAN NOT NULL,
  marcado_por     UUID REFERENCES profiles(id),  -- profesor que marcó
  marcado_at      TIMESTAMPTZ DEFAULT NOW(),
  notas           TEXT,
  UNIQUE(clase_id, alumno_id)
);
```

---

### `pagos`
```sql
CREATE TABLE pagos (
  id                    UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  apoderado_id          UUID REFERENCES apoderados(id) NOT NULL,
  mes                   INT NOT NULL CHECK (mes BETWEEN 1 AND 12),
  anio                  INT NOT NULL,
  monto_total           INT NOT NULL,         -- CLP
  detalle               JSONB,                -- {"grupales": 5, "individuales": 3, ...}
  status                TEXT NOT NULL DEFAULT 'pendiente'
                        CHECK (status IN ('pendiente','pagado','atrasado','condonado')),
  mp_preference_id      TEXT,                 -- ID de preferencia Mercado Pago
  mp_payment_id         TEXT,                 -- ID de pago Mercado Pago
  mp_status             TEXT,                 -- status devuelto por MP
  fecha_vencimiento     DATE NOT NULL,        -- último día del mes anterior (prepago)
  pagado_at             TIMESTAMPTZ,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(apoderado_id, mes, anio)
);
```

---

### `distribucion_profesores`
```sql
-- Cuánto le corresponde a cada profesor por mes
CREATE TABLE distribucion_profesores (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profesor_id     UUID REFERENCES profesores(id) NOT NULL,
  mes             INT NOT NULL,
  anio            INT NOT NULL,
  monto           INT NOT NULL,           -- CLP
  clases_count    INT NOT NULL,
  calculado_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(profesor_id, mes, anio)
);
```

---

### `carreras`
```sql
CREATE TABLE carreras (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre          TEXT NOT NULL,
  ubicacion       TEXT NOT NULL,
  region          TEXT NOT NULL,           -- para el mapa de Chile
  lat             DECIMAL(9,6),
  lng             DECIMAL(9,6),
  fecha           DATE NOT NULL,
  fecha_limite_inscripcion DATE,
  costo_camion    INT NOT NULL DEFAULT 0,  -- CLP por caballo
  costo_acompanante INT NOT NULL DEFAULT 0,
  costo_peticero  INT NOT NULL DEFAULT 0,
  descripcion     TEXT,
  activa          BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
```

---

### `carrera_inscripciones`
```sql
CREATE TABLE carrera_inscripciones (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  carrera_id      UUID REFERENCES carreras(id) NOT NULL,
  alumno_id       UUID REFERENCES alumnos(id) NOT NULL,
  apoderado_id    UUID REFERENCES apoderados(id) NOT NULL,
  lleva_camion    BOOLEAN DEFAULT TRUE,
  lleva_acompanante BOOLEAN DEFAULT FALSE,
  lleva_peticero  BOOLEAN DEFAULT FALSE,
  monto_total     INT NOT NULL,           -- calculado automáticamente
  status          TEXT DEFAULT 'pendiente'
                  CHECK (status IN ('pendiente','pagado','cancelado')),
  mp_payment_id   TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(carrera_id, alumno_id)
);
```

---

### `notificaciones_log`
```sql
-- Registro de todos los WhatsApp enviados (auditoría)
CREATE TABLE notificaciones_log (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  destinatario    TEXT NOT NULL,           -- número de teléfono
  tipo            TEXT NOT NULL,
                  -- 'recordatorio_clase' | 'confirmacion_pago' |
                  -- 'pago_pendiente' | 'cancelacion_tardia' | 'carrera'
  mensaje         TEXT NOT NULL,
  twilio_sid      TEXT,                    -- ID de Twilio
  status          TEXT DEFAULT 'enviado',
  referencia_id   UUID,                    -- ID de la clase/pago/carrera
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
```

---

### `invitation_tokens`
```sql
CREATE TABLE invitation_tokens (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  token       TEXT UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(32), 'hex'),
  role        TEXT NOT NULL DEFAULT 'profesor',
  created_by  UUID REFERENCES profiles(id),
  used_by     UUID REFERENCES profiles(id),
  used_at     TIMESTAMPTZ,
  expires_at  TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '48 hours'),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

---

## ⚡ Funciones y Triggers

### Trigger: Actualizar `cupos_ocupados` en clases
```sql
CREATE OR REPLACE FUNCTION update_cupos_ocupados()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE clases
  SET cupos_ocupados = (
    SELECT COUNT(*) FROM clase_inscripciones
    WHERE clase_id = NEW.clase_id AND status = 'confirmada'
  )
  WHERE id = NEW.clase_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_cupos
AFTER INSERT OR UPDATE OR DELETE ON clase_inscripciones
FOR EACH ROW EXECUTE FUNCTION update_cupos_ocupados();
```

### Trigger: Actualizar `updated_at`
```sql
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar a todas las tablas con updated_at
CREATE TRIGGER trg_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

### Función: Validar sobreposición de horarios
```sql
CREATE OR REPLACE FUNCTION check_horario_disponible(
  p_profesor_id UUID,
  p_fecha DATE,
  p_hora_inicio TIME,
  p_hora_fin TIME,
  p_excluir_clase_id UUID DEFAULT NULL
) RETURNS BOOLEAN AS $$
BEGIN
  RETURN NOT EXISTS (
    SELECT 1 FROM clases
    WHERE profesor_id = p_profesor_id
      AND fecha = p_fecha
      AND status != 'cancelada'
      AND id != COALESCE(p_excluir_clase_id, '00000000-0000-0000-0000-000000000000')
      AND (hora_inicio, hora_fin) OVERLAPS (p_hora_inicio, p_hora_fin)
  );
END;
$$ LANGUAGE plpgsql;
```

### Función: Generar resumen de pago mensual
```sql
CREATE OR REPLACE FUNCTION generar_resumen_pago(
  p_apoderado_id UUID,
  p_mes INT,
  p_anio INT
) RETURNS TABLE(
  grupales INT,
  individuales INT,
  monto_grupales INT,
  monto_individuales INT,
  total INT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*) FILTER (WHERE c.tipo = 'grupal')::INT as grupales,
    COUNT(*) FILTER (WHERE c.tipo = 'individual')::INT as individuales,
    (COUNT(*) FILTER (WHERE c.tipo = 'grupal') * cfg.precio_grupal)::INT as monto_grupales,
    (COUNT(*) FILTER (WHERE c.tipo = 'individual') * cfg.precio_individual)::INT as monto_individuales,
    (
      COUNT(*) FILTER (WHERE c.tipo = 'grupal') * cfg.precio_grupal +
      COUNT(*) FILTER (WHERE c.tipo = 'individual') * cfg.precio_individual
    )::INT as total
  FROM clase_inscripciones ci
  JOIN clases c ON c.id = ci.clase_id
  CROSS JOIN configuracion_club cfg
  WHERE ci.apoderado_id = p_apoderado_id
    AND EXTRACT(MONTH FROM c.fecha) = p_mes
    AND EXTRACT(YEAR FROM c.fecha) = p_anio
    AND ci.status IN ('confirmada','cancelada_tarde');
END;
$$ LANGUAGE plpgsql;
```

---

## 🔒 Row Level Security (RLS) Completo

```sql
-- Habilitar RLS en todas las tablas
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE alumnos ENABLE ROW LEVEL SECURITY;
ALTER TABLE clases ENABLE ROW LEVEL SECURITY;
ALTER TABLE clase_inscripciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE pagos ENABLE ROW LEVEL SECURITY;

-- ALUMNOS: apoderado ve solo sus hijos, profesor ve solo sus alumnos, admin ve todos
CREATE POLICY "alumnos_select" ON alumnos FOR SELECT USING (
  apoderado_id = auth.uid()
  OR profesor_id = auth.uid()
  OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

-- CLASES: apoderado ve clases donde su hijo está inscrito o disponibles para agendar
CREATE POLICY "clases_select" ON clases FOR SELECT USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) IN ('admin','profesor')
  OR EXISTS (
    SELECT 1 FROM clase_inscripciones ci
    JOIN alumnos a ON a.id = ci.alumno_id
    WHERE ci.clase_id = clases.id AND a.apoderado_id = auth.uid()
  )
);

-- PAGOS: apoderado ve solo sus pagos, admin ve todos
CREATE POLICY "pagos_select" ON pagos FOR SELECT USING (
  apoderado_id = auth.uid()
  OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);
```