# 02 – AUTENTICACIÓN Y CONTROL DE ACCESO

## 🔐 Proveedor

**Supabase Auth** con los siguientes métodos:

| Método | Roles que lo usan |
|--------|-------------------|
| Email + contraseña | Admin, Profesores, Apoderados |
| Google OAuth | Apoderados (opcional) |
| Link mágico (token único) | Solo Profesores |

---

## 👤 Flujo de Registro por Rol

### 1. Admin (Constanza Duhalde)
- La cuenta admin se crea **manualmente en Supabase** durante el setup inicial
- No existe "registro" público para admin
- Se asigna `role = 'admin'` directamente en la tabla `profiles`

---

### 2. Profesores

```
Admin genera link único
    └──► /registro/profesor/:token (token de 1 uso, expira en 48 hrs)
         │
         ▼
    Formulario de registro:
    - Nombre completo *
    - Email *
    - Teléfono (para WhatsApp) *
    - Contraseña *
    - Foto de perfil (opcional)
         │
         ▼
    Se crea usuario en Supabase Auth
    Se crea registro en tabla `profiles` con role = 'profesor', status = 'activo'
    Token queda marcado como usado
         │
         ▼
    Redirección a /profesor/dashboard
```

**El profesor NO necesita aprobación adicional** – el hecho de que el admin le enviara el link ya es la aprobación.

---

### 3. Apoderados

**Opción A – Registro con email/contraseña:**

```
/registro
    │
    Formulario:
    - Nombre completo *
    - Email *
    - Teléfono WhatsApp * (formato: +569XXXXXXXX)
    - Contraseña *
    - RUT (opcional)
    │
    ▼
Se crea usuario en Supabase Auth
Se crea registro en tabla `profiles`:
    role = 'apoderado'
    status = 'pendiente'
    │
    ▼
Admin recibe notificación (email + in-app)
    │
    ▼
Admin aprueba → status = 'activo'
Admin rechaza → status = 'rechazado' + email automático al apoderado
```

**Opción B – Google OAuth:**

```
Botón "Continuar con Google"
    │
    ▼
Supabase OAuth con Google
    │
    ▼
Si es primera vez:
    - Se crea perfil con datos de Google
    - status = 'pendiente' (igual que opción A)
    - Admin debe aprobar

Si ya tiene cuenta:
    - Login directo (si status = 'activo')
```

---

## 🛡 Middleware de Acceso (Next.js)

```typescript
// middleware.ts
// Reglas de acceso por ruta

const ROUTE_RULES = {
  '/admin/*'    : ['admin'],
  '/profesor/*' : ['profesor'],
  '/apoderado/*': ['apoderado'],
}

// Si usuario no autenticado → /login
// Si usuario autenticado con status = 'pendiente' → /pendiente-aprobacion
// Si usuario autenticado con status = 'rechazado' → /acceso-denegado
// Si rol no coincide con ruta → /unauthorized
```

---

## 📋 Estados de Usuario

| Status | Descripción | Puede acceder |
|--------|-------------|---------------|
| `pendiente` | Esperando aprobación del admin | No |
| `activo` | Aprobado | Sí |
| `rechazado` | Rechazado por admin | No |
| `bloqueado` | Bloqueado manualmente por admin | No |

---

## 🔑 Tabla `profiles` (extensión de Supabase Auth)

```sql
-- Se crea automáticamente via trigger cuando se registra un usuario
CREATE TABLE profiles (
  id          UUID REFERENCES auth.users(id) PRIMARY KEY,
  role        TEXT NOT NULL CHECK (role IN ('admin','profesor','apoderado')),
  status      TEXT NOT NULL DEFAULT 'pendiente'
              CHECK (status IN ('pendiente','activo','rechazado','bloqueado')),
  nombre      TEXT NOT NULL,
  telefono    TEXT,          -- formato +569XXXXXXXX para WhatsApp
  foto_url    TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 🔗 Tokens de Invitación (Profesores)

```sql
CREATE TABLE invitation_tokens (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  token       TEXT UNIQUE NOT NULL,
  role        TEXT NOT NULL DEFAULT 'profesor',
  created_by  UUID REFERENCES profiles(id),
  used_by     UUID REFERENCES profiles(id),
  used_at     TIMESTAMPTZ,
  expires_at  TIMESTAMPTZ NOT NULL,  -- NOW() + 48 hours
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

**Validaciones al usar el token:**
1. Token existe en la tabla
2. `used_at IS NULL` (no usado)
3. `expires_at > NOW()` (no expirado)

---

## 🔒 Row Level Security (RLS) – Reglas Base

```sql
-- Los usuarios solo ven su propio perfil (excepto admin que ve todos)
CREATE POLICY "profile_select" ON profiles
  FOR SELECT USING (
    auth.uid() = id
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Solo admin puede actualizar el status
CREATE POLICY "profile_update_status" ON profiles
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
```

---

## 📱 Pantallas de Auth (UI)

### `/login`
- Logo del club
- Campo email
- Campo contraseña
- Botón "Iniciar Sesión"
- Separador "o"
- Botón "Continuar con Google" (ícono Google)
- Link "¿No tienes cuenta? Regístrate"

### `/registro`
- Formulario apoderado (campos descritos arriba)
- Botón "Continuar con Google"
- Link "¿Ya tienes cuenta? Inicia sesión"
- **Validación en tiempo real:** formato de teléfono +569...

### `/pendiente-aprobacion`
- Mensaje: "Tu cuenta está siendo revisada por el equipo del club"
- "Te avisaremos por WhatsApp cuando sea aprobada"
- Botón cerrar sesión

### `/registro/profesor/:token`
- Verifica token al cargar la página
- Si inválido: muestra error "Link inválido o expirado"
- Si válido: muestra formulario de registro profesor