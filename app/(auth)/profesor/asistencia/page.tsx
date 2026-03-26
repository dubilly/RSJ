"use client";

import { useState } from "react";
import { Check, X, AlertCircle, Save, Calendar, Clock } from "lucide-react";

export default function AsistenciaPage() {
  const [claseSelect, setClaseSelect] = useState("14:00 - Taller Grupal");
  const hoy = new Date().toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long' });

  const [asistencia, setAsistencia] = useState<{ [key: number]: string }>({
    1: "Presente",
    2: "Pendiente",
    3: "Justificado",
  });

  const marcar = (id: number, estado: string) => {
    setAsistencia({ ...asistencia, [id]: estado });
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="font-serif text-headline-lg text-on-surface">Pasar Asistencia</h1>
          <p className="text-body-md text-on-surface-variant">Control diario de alumnos en clase</p>
        </div>
        <div className="flex flex-col items-end">
           <p className="text-label-md text-primary font-black uppercase tracking-widest">{hoy}</p>
           <p className="text-body-sm text-on-surface-variant opacity-60">RSJ System v1.0</p>
        </div>
      </div>

      <div className="tonal-card p-8 mb-8">
        <label className="editorial-label mb-3 block">Seleccionar Bloque Horario</label>
        <div className="flex flex-wrap gap-3">
          {["14:00 - Taller Grupal", "15:30 - Individual", "17:00 - Grupal"].map(c => (
            <button 
              key={c}
              onClick={() => setClaseSelect(c)}
              className={`px-6 py-3 rounded-2xl text-label-md transition-all border-2 ${
                claseSelect === c ? "bg-primary text-on-primary border-primary shadow-lg" : "bg-white text-on-surface-variant border-surface-container-highest hover:border-primary/30"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Alumnos List */}
      <h2 className="editorial-label text-on-surface-variant/50 mb-4 px-2 uppercase tracking-widest">Lista de Alumnos</h2>
      <div className="space-y-4">
        {[
          { id: 1, nombre: "Juanito Pérez", apoderado: "Juan Pérez", caballo: "Relámpago" },
          { id: 2, nombre: "Andrés Silva", apoderado: "Andrés Silva Sr.", caballo: "Luna" },
          { id: 3, nombre: "Lucía García", apoderado: "Pedro García", caballo: "Estrella" },
        ].map((a) => (
          <div key={a.id} className="tonal-card p-6 flex items-center justify-between group hover:shadow-md transition-all">
            <div className="flex items-center gap-5">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-serif font-black transition-colors ${
                asistencia[a.id] === "Presente" ? "bg-primary text-on-primary" : 
                asistencia[a.id] === "Justificado" ? "bg-secondary text-on-secondary" : "bg-surface-container-highest text-on-surface-variant"
              }`}>
                {a.nombre[0]}
              </div>
              <div>
                <p className="text-title-md text-on-surface font-black">{a.nombre}</p>
                <p className="text-body-sm text-secondary font-medium italic">🐎 {a.caballo}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => marcar(a.id, "Presente")}
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                  asistencia[a.id] === "Presente" ? "bg-primary text-on-primary shadow-lg" : "bg-surface-container-low text-on-surface-variant hover:bg-primary/10"
                }`}
              >
                <Check size={24} />
              </button>
              <button 
                 onClick={() => marcar(a.id, "Ausente")}
                 className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                  asistencia[a.id] === "Ausente" ? "bg-error text-white shadow-lg" : "bg-surface-container-low text-on-surface-variant hover:bg-error/10"
                }`}
              >
                <X size={24} />
              </button>
              <button 
                 onClick={() => marcar(a.id, "Justificado")}
                 className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                  asistencia[a.id] === "Justificado" ? "bg-secondary text-white shadow-lg" : "bg-surface-container-low text-on-surface-variant hover:bg-secondary/10"
                }`}
              >
                <AlertCircle size={24} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-12 mb-20">
        <button className="btn-primary py-4 px-12 text-label-lg shadow-xl hover:scale-[1.02] flex items-center gap-3">
          <Save size={20} /> Finalizar y Guardar
        </button>
      </div>
    </div>
  );
}
