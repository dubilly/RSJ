"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Filter, Users, Clock, MapPin, UserCheck } from "lucide-react";

// Helper to generate a dummy week
const today = new Date();
const currentWeek = Array.from({ length: 7 }, (_, i) => {
  const d = new Date(today);
  d.setDate(today.getDate() - today.getDay() + i + 1); // Start from Monday
  return d;
});

const mockClases = [
  { id: 1, hora: "14:00", tipo: "Grupal", dia: 0, profesor: "Carolina Pérez", cupos: "4/6", caballo: "Relámpago" },
  { id: 2, hora: "15:30", tipo: "Individual", dia: 1, profesor: "Ana Morales", cupos: "1/1", caballo: "Tornado" },
  { id: 3, hora: "17:00", tipo: "Grupal", dia: 2, profesor: "Carolina Pérez", cupos: "6/6", caballo: "Estrella" },
  { id: 4, hora: "09:00", tipo: "Grupal", dia: 5, profesor: "Ana Morales", cupos: "2/6", caballo: "Luna" },
  { id: 5, hora: "10:30", tipo: "Individual", dia: 5, profesor: "Carolina Pérez", cupos: "1/1", caballo: "Relámpago" },
];

export default function ClasesPage() {
  const [view, setView] = useState("Semana");

  return (
    <div className="max-w-7xl mx-auto py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="font-serif text-headline-lg text-on-surface">Calendario de Clases</h1>
          <p className="text-body-md text-on-surface-variant">Visualiza y gestiona la programación semanal del club</p>
        </div>
        <div className="flex bg-surface-container rounded-lg p-1">
          {["Hoy", "Semana", "Mes"].map((v) => (
            <button 
              key={v} 
              onClick={() => setView(v)}
              className={`px-4 py-1.5 text-label-md rounded flex items-center transition-all ${
                view === v ? "bg-white shadow-sm text-primary font-bold" : "text-on-surface-variant"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-surface-container rounded-full transition-all">
            <ChevronLeft size={20} />
          </button>
          <h2 className="font-serif text-headline-sm text-on-surface">
            Marzo 23 – 29, 2026
          </h2>
          <button className="p-2 hover:bg-surface-container rounded-full transition-all">
            <ChevronRight size={20} />
          </button>
          <button className="btn-secondary py-1.5 px-3 text-label-sm">Hoy</button>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary py-2 px-4 text-label-md flex items-center gap-2">
            <Filter size={18} /> Filtrar por Profesor
          </button>
          <button className="btn-primary py-2 px-4 text-label-md">+ Programar Clase</button>
        </div>
      </div>

      {/* Grid Calendario */}
      <div className="tonal-card overflow-hidden">
        <div className="grid grid-cols-7 border-b border-outline-variant/10">
          {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((day, i) => (
            <div key={day} className={`p-4 text-center border-r border-outline-variant/5 last:border-r-0 ${
              today.getDay() === (i + 1) % 7 ? "bg-primary/5" : ""
            }`}>
              <span className="editorial-label text-xs block mb-1">{day}</span>
              <span className={`text-display-sm font-serif ${
                today.getDay() === (i + 1) % 7 ? "text-primary" : "text-on-surface-variant"
              }`}>
                {currentWeek[i].getDate()}
              </span>
            </div>
          ))}
        </div>

        {/* Content slots - Mock Schedule */}
        <div className="grid grid-cols-7 h-[600px] overflow-auto">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="border-r border-outline-variant/5 last:border-r-0 p-2 space-y-2 bg-neutral-50/50">
              {mockClases.filter(c => c.dia === i).map(clase => (
                <div key={clase.id} className={`p-3 rounded-lg shadow-sm border-l-4 transition-all hover:scale-[1.02] cursor-pointer ${
                  clase.tipo === "Grupal" ? "bg-white border-primary" : "bg-tertiary-container/10 border-tertiary"
                }`}>
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-body-sm font-bold text-on-surface">{clase.hora}</span>
                    <span className={`text-[10px] uppercase tracking-tighter font-bold px-1.5 py-0.5 rounded ${
                      clase.tipo === "Grupal" ? "bg-primary/10 text-primary" : "bg-tertiary/10 text-tertiary"
                    }`}>
                      {clase.tipo}
                    </span>
                  </div>
                  <p className="text-[11px] font-semibold text-on-surface truncate mb-1">{clase.profesor}</p>
                  <div className="flex items-center justify-between text-[10px] text-on-surface-variant">
                    <span className="flex items-center gap-1"><Users size={10} /> {clase.cupos}</span>
                    <span className="flex items-center gap-1 font-medium truncate max-w-[50px]">🐎 {clase.caballo}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
