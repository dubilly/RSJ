"use client";

import { useState } from "react";
import { Clock, Plus, Trash2, Calendar, Info } from "lucide-react";

export default function DisponibilidadPage() {
  const [activeTab, setActiveTab] = useState("Semanal");

  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const mockBloques = [
    { id: 1, dia: "Lunes", inicio: "14:00", fin: "18:00" },
    { id: 2, dia: "Miércoles", inicio: "14:00", fin: "18:00" },
    { id: 3, dia: "Viernes", inicio: "09:00", fin: "13:00" },
    { id: 4, dia: "Viernes", inicio: "14:00", fin: "18:00" },
  ];

  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="font-serif text-headline-lg text-on-surface">Mi Disponibilidad</h1>
          <p className="text-body-md text-on-surface-variant">Configura las horas en las que puedes dictar clases</p>
        </div>
        <button className="btn-primary py-2 px-6 text-label-md flex items-center gap-2 shadow-float transition-all hover:scale-[1.02]">
          <Plus size={18} /> Agregar Bloque
        </button>
      </div>

      <div className="tonal-card p-6 mb-8 bg-primary/5 border border-primary/10">
        <div className="flex gap-4">
          <Info size={24} className="text-primary shrink-0" />
          <p className="text-body-sm text-on-surface-variant">
            <strong>Nota importante:</strong> Tus bloques de disponibilidad permiten que los apoderados te encuentren al agendar. Si necesitas cancelar un bloque ya publicado, asegúrate de no tener clases agendadas en ese horario.
          </p>
        </div>
      </div>

      <div className="space-y-12">
        {dias.map((dia) => (
          <div key={dia} className="tonal-card p-8 border-l-4 border-outline-variant/10 hover:border-primary transition-all group">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif text-headline-sm text-on-surface group-hover:text-primary transition-colors">{dia}</h2>
              <button className="text-label-sm font-bold text-primary hover:underline">+ Bloque Extra</button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mockBloques.filter(b => b.dia === dia).length > 0 ? (
                mockBloques.filter(b => b.dia === dia).map(bloque => (
                  <div key={bloque.id} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-outline-variant/10 shadow-sm transition-all hover:shadow-md">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant">
                        <Clock size={20} />
                      </div>
                      <div className="font-mono text-title-md text-on-surface tabular-nums">
                        {bloque.inicio} <span className="text-on-surface-variant/30 px-1">–</span> {bloque.fin}
                      </div>
                    </div>
                    <button className="p-2 hover:bg-error-container/10 rounded-lg text-on-surface-variant hover:text-error transition-all opacity-0 group-hover:opacity-100">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="sm:col-span-2 py-8 text-center bg-surface-container-low rounded-2xl border border-dashed border-outline-variant/20 italic text-on-surface-variant opacity-60">
                   Sin disponibilidad configurada para este día
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
