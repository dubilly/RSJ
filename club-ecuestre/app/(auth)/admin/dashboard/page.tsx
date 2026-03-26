import {
  Users,
  CalendarDays,
  CreditCard,
  AlertTriangle,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";

/* ── Mock Data ── */
const kpis = [
  {
    label: "Caballos Disponibles",
    value: "8 / 10",
    icon: "🐎",
    change: "",
    color: "primary",
  },
  {
    label: "Alumnos Activos",
    value: "23",
    sub: "3 pendientes",
    icon: Users,
    change: "+2 este mes",
    color: "secondary",
  },
  {
    label: "Ingresos del Mes",
    value: "$2.850.000",
    icon: CreditCard,
    change: "+12% vs. mes anterior",
    color: "primary",
  },
  {
    label: "Clases Este Mes",
    value: "47",
    sub: "8 hoy",
    icon: CalendarDays,
    change: "",
    color: "tertiary",
  },
];

const alertas = [
  {
    type: "error",
    icon: CreditCard,
    text: "3 apoderados con pago atrasado",
    action: "Ver pagos",
    href: "/admin/pagos",
  },
  {
    type: "warning",
    icon: Users,
    text: "2 alumnos esperando aprobación",
    action: "Revisar",
    href: "/admin/usuarios",
  },
  {
    type: "warning",
    icon: Clock,
    text: "1 alumno esperando respuesta del profesor",
    action: "Ver detalle",
    href: "/admin/usuarios",
  },
];

const clasesHoy = [
  {
    hora: "14:00 – 15:00",
    tipo: "Grupal",
    profesor: "Carolina Pérez",
    alumnos: 4,
    cupos: 6,
    caballo: "Relámpago",
    status: "programada",
  },
  {
    hora: "15:00 – 16:00",
    tipo: "Individual",
    profesor: "Carolina Pérez",
    alumnos: 1,
    cupos: 1,
    caballo: "Tornado",
    status: "programada",
  },
  {
    hora: "16:00 – 17:00",
    tipo: "Grupal",
    profesor: "Ana Morales",
    alumnos: 6,
    cupos: 6,
    caballo: "Canela",
    status: "realizada",
  },
  {
    hora: "17:00 – 18:00",
    tipo: "Grupal",
    profesor: "Carolina Pérez",
    alumnos: 3,
    cupos: 6,
    caballo: "Estrella",
    status: "programada",
  },
  {
    hora: "17:00 – 18:00",
    tipo: "Individual",
    profesor: "Ana Morales",
    alumnos: 1,
    cupos: 1,
    caballo: "Relámpago",
    status: "cancelada",
  },
];

const pendientes = [
  {
    nombre: "María González",
    email: "maria.g@email.com",
    telefono: "+56912345678",
    fecha: "25/03/2026",
    tipo: "Apoderado",
  },
  {
    nombre: "Pedro Soto",
    email: "pedro.soto@email.com",
    telefono: "+56987654321",
    fecha: "24/03/2026",
    tipo: "Apoderado",
  },
];

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 pt-2">
        <span className="editorial-label text-secondary mb-2 block">
          Dashboard
        </span>
        <h1 className="font-serif text-headline-lg text-on-surface">
          Hola, Constanza 👋
        </h1>
        <p className="text-body-md text-on-surface-variant mt-1">
          Resumen del club para hoy
        </p>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {kpis.map((kpi, i) => (
          <div
            key={i}
            className="tonal-card p-6"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <span className="editorial-label">{kpi.label}</span>
              <span className="text-2xl">
                {typeof kpi.icon === "string" ? (
                  kpi.icon
                ) : (
                  <kpi.icon size={22} className={`text-${kpi.color}`} />
                )}
              </span>
            </div>
            <p className="font-serif text-headline-md text-on-surface font-bold">
              {kpi.value}
            </p>
            {kpi.sub && (
              <p className="text-body-sm text-on-surface-variant mt-1">
                {kpi.sub}
              </p>
            )}
            {kpi.change && (
              <p className="flex items-center gap-1 text-label-sm text-primary mt-2">
                <TrendingUp size={14} />
                {kpi.change}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* ── Alerts ── */}
      <div className="mb-8 space-y-3">
        <span className="editorial-label text-on-surface-variant mb-1 block">
          Alertas del Día
        </span>
        {alertas.map((alerta, i) => (
          <div
            key={i}
            className={`flex items-center gap-4 p-4 rounded-lg ${
              alerta.type === "error"
                ? "bg-error-container/30"
                : "bg-secondary-container/30"
            }`}
          >
            <AlertTriangle
              size={18}
              className={
                alerta.type === "error" ? "text-error" : "text-secondary"
              }
            />
            <span className="flex-1 text-body-md text-on-surface">
              {alerta.text}
            </span>
            <a
              href={alerta.href}
              className={`text-label-md font-medium hover:underline ${
                alerta.type === "error" ? "text-error" : "text-secondary"
              }`}
            >
              {alerta.action} →
            </a>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* ── Agenda del Día ── */}
        <div className="lg:col-span-2">
          <span className="editorial-label text-on-surface-variant mb-4 block">
            Agenda de Hoy
          </span>
          <div className="tonal-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-container-low">
                    <th className="px-5 py-3 editorial-label text-on-surface-variant font-medium">
                      Hora
                    </th>
                    <th className="px-5 py-3 editorial-label text-on-surface-variant font-medium">
                      Tipo
                    </th>
                    <th className="px-5 py-3 editorial-label text-on-surface-variant font-medium">
                      Profesor
                    </th>
                    <th className="px-5 py-3 editorial-label text-on-surface-variant font-medium">
                      Alumnos
                    </th>
                    <th className="px-5 py-3 editorial-label text-on-surface-variant font-medium">
                      Estado
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {clasesHoy.map((clase, i) => (
                    <tr
                      key={i}
                      className="transition-colors duration-300 hover:bg-surface-container-low/50"
                    >
                      <td className="px-5 py-4 text-body-md text-on-surface font-medium">
                        {clase.hora}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-label-sm font-medium ${
                            clase.tipo === "Grupal"
                              ? "bg-primary/10 text-primary"
                              : "bg-secondary/10 text-secondary"
                          }`}
                        >
                          {clase.tipo === "Grupal" ? "👥" : "👤"} {clase.tipo}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-body-md text-on-surface-variant">
                        {clase.profesor}
                      </td>
                      <td className="px-5 py-4 text-body-md text-on-surface-variant">
                        {clase.alumnos}/{clase.cupos}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 text-label-sm font-medium ${
                            clase.status === "programada"
                              ? "text-primary"
                              : clase.status === "realizada"
                              ? "text-green-600"
                              : "text-error"
                          }`}
                        >
                          {clase.status === "programada" && (
                            <Clock size={14} />
                          )}
                          {clase.status === "realizada" && (
                            <CheckCircle2 size={14} />
                          )}
                          {clase.status === "cancelada" && (
                            <XCircle size={14} />
                          )}
                          {clase.status.charAt(0).toUpperCase() +
                            clase.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ── Aprobaciones Pendientes ── */}
        <div>
          <span className="editorial-label text-on-surface-variant mb-4 block">
            Aprobaciones Pendientes
          </span>
          <div className="space-y-4">
            {pendientes.map((p, i) => (
              <div key={i} className="tonal-card p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-serif font-bold text-title-sm flex-shrink-0">
                    {p.nombre
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-body-md font-semibold text-on-surface">
                      {p.nombre}
                    </p>
                    <p className="text-body-sm text-on-surface-variant truncate">
                      {p.email}
                    </p>
                    <p className="text-label-sm text-on-surface-variant mt-1">
                      Registrado el {p.fecha}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 btn-primary text-label-md py-2.5">
                    ✅ Aprobar
                  </button>
                  <button className="flex-1 btn-secondary text-label-md py-2.5 text-error hover:bg-error-container/30">
                    ❌ Rechazar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Caballos en uso hoy ── */}
      <div className="mt-8 mb-4">
        <span className="editorial-label text-on-surface-variant mb-4 block">
          Ocupación de Caballos – Hoy
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {[
            { name: "Relámpago", status: "en uso", hora: "14:00" },
            { name: "Tornado", status: "en uso", hora: "15:00" },
            { name: "Canela", status: "terminó", hora: "16:00" },
            { name: "Estrella", status: "próximo", hora: "17:00" },
            { name: "Luna", status: "disponible", hora: "" },
            { name: "Sol", status: "disponible", hora: "" },
            { name: "Viento", status: "disponible", hora: "" },
            { name: "Brisa", status: "no disponible", hora: "" },
            { name: "Trueno", status: "disponible", hora: "" },
            { name: "Nube", status: "disponible", hora: "" },
          ].map((caballo, i) => (
            <div
              key={i}
              className={`p-4 rounded-lg text-center transition-all duration-300 ${
                caballo.status === "en uso"
                  ? "bg-primary/10 ring-1 ring-primary/20"
                  : caballo.status === "no disponible"
                  ? "bg-error-container/20"
                  : caballo.status === "próximo"
                  ? "bg-secondary-container/30"
                  : caballo.status === "terminó"
                  ? "bg-surface-container-high"
                  : "bg-surface-container-low"
              }`}
            >
              <span className="text-xl block mb-1">🐎</span>
              <p className="text-body-sm font-semibold text-on-surface">
                {caballo.name}
              </p>
              <p
                className={`text-label-sm mt-1 ${
                  caballo.status === "en uso"
                    ? "text-primary font-medium"
                    : caballo.status === "no disponible"
                    ? "text-error"
                    : "text-on-surface-variant"
                }`}
              >
                {caballo.status === "en uso" && `🟢 Clase ${caballo.hora}`}
                {caballo.status === "próximo" && `⏰ ${caballo.hora}`}
                {caballo.status === "terminó" && "✅ Terminó"}
                {caballo.status === "disponible" && "Disponible"}
                {caballo.status === "no disponible" && "❌ No disponible"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
