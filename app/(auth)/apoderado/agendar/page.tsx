"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, User, Info, CheckCircle2 } from "lucide-react";

export default function AgendarClasePage() {
  const [hijoSelect, setHijoSelect] = useState("Juanito Pérez");
  const [claseSelect, setClaseSelect] = useState("Grupal");
  const [diaSelect, setDiaSelect] = useState("Miércoles 25");

  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="font-serif text-headline-lg text-on-surface">Agendar Nueva Clase</h1>
          <p className="text-body-md text-on-surface-variant italic">Selecciona un horario para tu pequeño jinete</p>
        </div>
        <div className="px-6 py-2 bg-secondary/5 rounded-full border border-secondary/10 flex items-center gap-2">
           <span className="text-label-sm font-bold text-secondary">CLP $30.000 (Grupal)</span>
        </div>
      </div>

      <div className="space-y-12">
        {/* Step 1: Who's riding? */}
        <div className="tonal-card p-8">
          <label className="editorial-label mb-4 block text-secondary uppercase tracking-[0.2em] font-black">1. ¿Quién montará hoy?</label>
          <div className="flex gap-4">
            {["Juanito Pérez", "Sofía Pérez"].map(h => (
              <button 
                key={h} 
                onClick={() => setHijoSelect(h)}
                className={`flex-1 p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 ${
                  hijoSelect === h ? "bg-secondary text-white border-secondary shadow-lg" : "bg-white border-surface-container-highest opacity-60 hover:opacity-100"
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-serif font-black ${hijoSelect === h ? 'bg-white/20' : 'bg-surface-container'}`}>
                  {h[0]}
                </div>
                <span className="text-label-md font-bold">{h}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Date Selection */}
        <div className="tonal-card p-8">
           <div className="flex justify-between items-center mb-6">
              <label className="editorial-label text-secondary uppercase tracking-[0.2em] font-black">2. Fecha y Horario</label>
              <div className="flex items-center gap-4 text-on-surface-variant font-serif">
                 <button className="p-1.5 hover:bg-surface-container rounded-lg"><ChevronLeft size={20}/></button>
                 <span className="text-title-md">Marzo 23 – 29</span>
                 <button className="p-1.5 hover:bg-surface-container rounded-lg"><ChevronRight size={20}/></button>
              </div>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
              {["Lun 23", "Mar 24", "Mié 25", "Jue 26", "Vie 27", "Sáb 28", "Dom 29"].map(d => (
                 <button 
                   key={d} 
                   onClick={() => setDiaSelect(d)}
                   className={`p-4 rounded-2xl flex flex-col items-center transition-all ${
                     diaSelect === d ? "bg-primary text-on-primary shadow-lg border-primary" : "bg-surface-container-low text-on-surface-variant hover:bg-white border-transparent"
                   }`}
                 >
                    <span className="text-[10px] uppercase font-bold opacity-70 mb-1">{d.split(" ")[0]}</span>
                    <span className="font-serif text-title-lg font-black">{d.split(" ")[1]}</span>
                 </button>
              ))}
           </div>

           <div className="space-y-3">
              <p className="editorial-label text-[11px] mb-4">Horarios Disponibles</p>
              {[
                { h: "14:00", t: "Grupal", q: "3 cupos" },
                { h: "15:30", t: "Individual", q: "1 cupo" },
                { h: "17:00", t: "Grupal", q: "Lleno", full: true },
              ].map((slot, i) => (
                <button 
                  key={i} 
                  disabled={slot.full}
                  className={`w-full p-4 rounded-2xl flex items-center justify-between border-2 transition-all group ${
                    slot.full ? "opacity-30 grayscale cursor-not-allowed bg-neutral-100" : "bg-white border-surface-container-highest hover:border-primary/40 hover:shadow-md"
                  }`}
                >
                   <div className="flex items-center gap-6">
                      <span className="font-mono text-headline-sm tabular-nums text-on-surface">{slot.h}</span>
                      <div className="text-left">
                         <p className="text-body-md font-bold text-on-surface">{slot.t}</p>
                         <p className="text-label-sm text-on-surface-variant">{slot.q}</p>
                      </div>
                   </div>
                   {!slot.full && <div className="p-3 bg-primary/5 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-all"><ChevronRight size={20}/></div>}
                </button>
              ))}
           </div>
        </div>

        <div className="tonal-card p-6 border-l-4 border-primary bg-primary/5">
           <div className="flex gap-4">
              <CheckCircle2 size={24} className="text-primary" />
              <div>
                 <h4 className="text-title-md text-on-surface font-black mb-1">Confirmación Inmediata</h4>
                 <p className="text-body-sm text-on-surface-variant">Un recordatorio será enviado a tu WhatsApp y al correo de {hijoSelect} 24 horas antes de la clase.</p>
              </div>
           </div>
        </div>

        <button className="w-full btn-primary py-4 px-12 text-label-lg shadow-xl hover:scale-[1.01] transition-all flex items-center justify-center gap-3">
           Confirmar Agendamiento
        </button>
      </div>
    </div>
  );
}
