"use client";

import { Search, MoreVertical, MessageSquare, Award, Calendar, ExternalLink, Users } from "lucide-react";

const mockAlumnos = [
  { id: 1, nombre: "Juanito Pérez", edad: "8 años", apoderado: "Juan Pérez", nivel: "Principiante", inicio: "2026-01-10", caballoPref: "Relámpago" },
  { id: 2, nombre: "Sofía Méndez", edad: "10 años", apoderado: "Lucía Méndez", nivel: "Intermedio", inicio: "2025-11-05", caballoPref: "Tornado" },
  { id: 3, nombre: "Andrés Silva", edad: "9 años", apoderado: "Andrés Silva Sr.", nivel: "Principiante", inicio: "2026-03-01", caballoPref: "Luna" },
  { id: 4, nombre: "Isidora Rojas", edad: "12 años", apoderado: "Isidora Rojas Sr.", nivel: "Avanzado", inicio: "2024-09-12", caballoPref: "Sol" },
];

export default function AlumnosProfesorPage() {
  return (
    <div className="max-w-7xl mx-auto py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="font-serif text-headline-lg text-on-surface">Mis Alumnos</h1>
          <p className="text-body-md text-on-surface-variant">Seguimiento de progreso y binomios actuales</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50" size={18} />
          <input type="text" placeholder="Buscar alumno..." className="editorial-input pl-10" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockAlumnos.map((a) => (
          <div key={a.id} className="tonal-card overflow-hidden group hover:shadow-lg transition-transform hover:-translate-y-1">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-serif font-black text-2xl border-4 border-white shadow-sm transition-transform group-hover:scale-110">
                  {a.nombre.split(" ").map(n => n[0]).join("")}
                </div>
                <button className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant">
                  <MoreVertical size={20} />
                </button>
              </div>

              <h3 className="font-serif text-headline-sm text-on-surface mb-1 group-hover:text-primary transition-colors">{a.nombre}</h3>
              <p className="text-body-md text-on-surface-variant mb-6">{a.edad} · {a.nivel}</p>

              <div className="space-y-4 pt-6 border-t border-outline-variant/10">
                <div className="flex items-center justify-between text-body-sm">
                  <span className="flex items-center gap-2 text-on-surface-variant opacity-60"><Calendar size={14} /> Inicio</span>
                  <span className="font-medium text-on-surface">{a.inicio}</span>
                </div>
                <div className="flex items-center justify-between text-body-sm">
                  <span className="flex items-center gap-2 text-on-surface-variant opacity-60"><Award size={14} /> Caballo Pref.</span>
                  <span className="font-medium text-primary">🐎 {a.caballoPref}</span>
                </div>
                <div className="flex items-center justify-between text-body-sm">
                  <span className="flex items-center gap-2 text-on-surface-variant opacity-60"><Users size={14} /> Apoderado</span>
                  <span className="font-medium text-on-surface flex items-center gap-1">
                    {a.apoderado} <ExternalLink size={12} className="opacity-30" />
                  </span>
                </div>
              </div>

              <div className="flex gap-2 mt-8">
                <button className="flex-1 btn-primary py-2.5 text-label-sm flex items-center justify-center gap-2">
                   Ver Progreso
                </button>
                <button className="p-2.5 btn-secondary text-primary hover:bg-primary/5 transition-all">
                  <MessageSquare size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
