"use client";

import { 
  Users, 
  Calendar, 
  Clock, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";

export default function ProfesorDashboard() {
  const hoy = new Date().toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="editorial-label text-primary font-bold tracking-[0.2em] mb-2 uppercase">Bienvenida a tu Dashboard</p>
          <h1 className="font-serif text-headline-xl text-on-surface">Hola, Carolina 👋</h1>
          <p className="text-title-md text-on-surface-variant flex items-center gap-2 mt-1">
            <Calendar size={18} className="text-secondary" /> {hoy}
          </p>
        </div>
        <div className="flex gap-4">
          <button className="btn-secondary py-3 px-6 text-label-md">Ver Perfil</button>
          <button className="btn-primary py-3 px-6 text-label-md shadow-float">Marcar Asistencia</button>
        </div>
      </div>

      {/* KPI Cards for Professor */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="tonal-card p-6 border-l-4 border-primary shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="editorial-label">Mis Alumnos</span>
            <Users size={20} className="text-primary opacity-60" />
          </div>
          <p className="font-serif text-display-sm text-on-surface">12</p>
          <p className="text-label-sm text-on-surface-variant mt-1">+2 activos esta semana</p>
        </div>
        
        <div className="tonal-card p-6 border-l-4 border-secondary shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="editorial-label">Clases Hoy</span>
            <Clock size={20} className="text-secondary opacity-60" />
          </div>
          <p className="font-serif text-display-sm text-on-surface">4</p>
          <p className="text-label-sm text-on-surface-variant mt-1">Próxima: 14:00 (Grupal)</p>
        </div>

        <div className="tonal-card p-6 border-l-4 border-tertiary shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="editorial-label">Promedio Asistencia</span>
            <Award size={20} className="text-tertiary opacity-60" />
          </div>
          <p className="font-serif text-display-sm text-on-surface">94%</p>
          <p className="text-label-sm text-on-surface-variant mt-1">Excediendo meta del club</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Today's Agenda */}
        <div className="tonal-card p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-headline-sm text-on-surface">Agenda del Día</h2>
            <button className="text-label-sm font-bold text-primary flex items-center gap-1 hover:underline">
              Semana completa <ArrowRight size={14} />
            </button>
          </div>
          <div className="space-y-6">
            {[
              { hora: "14:00", alumno: "Juanito Pérez (Grupal)", caballo: "Relámpago", status: "Confirmado" },
              { hora: "15:30", alumno: "Sofía Méndez (Individual)", caballo: "Tornado", status: "Confirmado" },
              { hora: "17:00", alumno: "Andrés Silva (Grupal)", caballo: "Luna", status: "Pendiente" },
              { hora: "18:30", alumno: "Taller Juvenil", caballo: "Varios", status: "Confirmado" },
            ].map((clase, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-surface-container/30 rounded-2xl group hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-outline-variant/10">
                <div className="flex items-center gap-5">
                  <div className="font-mono text-headline-sm text-on-surface-variant tabular-nums w-14">
                    {clase.hora}
                  </div>
                  <div>
                    <p className="text-title-md text-on-surface font-semibold">{clase.alumno}</p>
                    <p className="text-body-sm text-secondary flex items-center gap-1 font-medium">🐎 {clase.caballo}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {clase.status === "Confirmado" ? (
                    <CheckCircle2 size={18} className="text-primary" />
                  ) : (
                    <AlertCircle size={18} className="text-error" />
                  )}
                  <span className={`text-label-sm font-bold ${clase.status === "Confirmado" ? 'text-primary' : 'text-error'}`}>
                    {clase.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Student Requests */}
        <div className="tonal-card p-8">
          <h2 className="font-serif text-headline-sm text-on-surface mb-8">Nuevos Alumnos</h2>
          <div className="space-y-6">
            {[
              { nombre: "Javier Soto", edad: "12 años", nivel: "Principiante", fecha: "Ayer" },
              { nombre: "Isabela Mora", edad: "9 años", nivel: "Iniciación", fecha: "Hace 2 días" },
            ].map((req, i) => (
              <div key={i} className="p-6 bg-surface-container-low rounded-2xl border border-outline-variant/5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-title-md text-on-surface font-black">{req.nombre}</h3>
                    <p className="text-body-sm text-on-surface-variant">{req.edad} · {req.nivel}</p>
                  </div>
                  <span className="text-[10px] uppercase font-black text-on-surface-variant/50">{req.fecha}</span>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 btn-primary py-2 text-label-sm">Aceptar</button>
                  <button className="flex-1 btn-secondary py-2 text-label-sm">Ver Detalles</button>
                </div>
              </div>
            ))}
            <button className="w-full py-3 border-2 border-dashed border-outline-variant/20 rounded-2xl text-on-surface-variant text-label-md hover:bg-surface-container transition-all">
              Ver solicitudes anteriores
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
