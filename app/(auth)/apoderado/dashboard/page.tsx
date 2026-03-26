"use client";

import { 
  Users, 
  Calendar, 
  CreditCard, 
  ChevronRight, 
  ArrowUpRight,
  Clock,
  Heart
} from "lucide-react";

export default function ApoderadoDashboard() {
  const hoy = new Date().toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="editorial-label text-secondary font-bold tracking-[0.2em] mb-2 uppercase italic">Bienvenido al Club</p>
          <h1 className="font-serif text-headline-xl text-on-surface">Hola, Juan Pérez 👋</h1>
          <p className="text-body-lg text-on-surface-variant mt-2 flex items-center gap-2">
            Disfruta de un gran día en Rancho San José · {hoy}
          </p>
        </div>
        <button className="btn-primary py-3 px-8 text-label-lg shadow-float flex items-center gap-3 hover:scale-[1.02] transition-all">
          <Calendar size={20} /> Agendar Clase
        </button>
      </div>

      {/* Summary Chips / KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="tonal-card p-6 border-b-4 border-primary">
          <div className="flex items-center gap-4 mb-4">
             <div className="p-3 rounded-full bg-primary/10 text-primary">
               <Users size={20} />
             </div>
             <span className="editorial-label">Hijos Inscritos</span>
          </div>
          <p className="font-serif text-headline-lg text-on-surface">2 <span className="text-body-md text-on-surface-variant font-sans">(Juanito & Sofía)</span></p>
        </div>

        <div className="tonal-card p-6 border-b-4 border-secondary">
          <div className="flex items-center gap-4 mb-4">
             <div className="p-3 rounded-full bg-secondary/10 text-secondary">
               <Clock size={20} />
             </div>
             <span className="editorial-label">Próxima Clase</span>
          </div>
          <p className="font-serif text-headline-lg text-on-surface">Mañana <span className="text-body-md text-on-surface-variant font-sans">14:00</span></p>
        </div>

        <div className="tonal-card p-6 border-b-4 border-tertiary">
          <div className="flex items-center gap-4 mb-4">
             <div className="p-3 rounded-full bg-tertiary/10 text-tertiary">
               <CreditCard size={20} />
             </div>
             <span className="editorial-label">Estado de Pago</span>
          </div>
          <p className="font-serif text-headline-lg text-primary">Al día</p>
          <p className="text-label-sm text-on-surface-variant mt-1">Próximo vencimiento: 05 Abr</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Family Agenda */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-headline-sm text-on-surface italic">Agenda Familiar</h2>
            <button className="text-label-sm font-bold text-secondary flex items-center gap-1 hover:underline">
               Ver historial <ChevronRight size={14} />
            </button>
          </div>
          <div className="space-y-4">
            {[
              { fecha: "Mañana", hora: "14:00", hijo: "Juanito Pérez", caballo: "Relámpago", prof: "Carolina P." },
              { fecha: "Sábado 28", hora: "10:30", hijo: "Sofía Pérez", caballo: "Tornado", prof: "Ana M." },
            ].map((clase, i) => (
              <div key={i} className="tonal-card p-6 flex flex-col sm:flex-row gap-6 items-center hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-outline-variant/10 group">
                <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-surface-container h-20 w-20 shrink-0">
                   <span className="text-label-sm font-bold text-primary">{clase.fecha}</span>
                   <span className="font-mono text-title-lg text-on-surface">{clase.hora}</span>
                </div>
                <div className="flex-1 text-center sm:text-left">
                   <p className="text-headline-sm font-serif text-on-surface mb-1 group-hover:text-secondary transition-colors">{clase.hijo}</p>
                   <p className="text-body-md text-on-surface-variant">Con {clase.prof} · 🐎 {clase.caballo}</p>
                </div>
                <ArrowUpRight size={24} className="text-on-surface-variant opacity-20 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
            ))}
          </div>
        </div>

        {/* Family Endurance Highlight */}
        <div className="tonal-card p-8 bg-surface-container relative overflow-hidden group">
           <div className="relative z-10">
              <h2 className="font-serif text-headline-sm text-on-surface mb-2">Camino al Endurance 🏆</h2>
              <p className="text-body-md text-on-surface-variant mb-8 max-w-[80%]">
                Juanito ha completado <span className="font-bold text-secondary">40km</span> totales este mes. ¡Está a solo 10km de su primer galardón regional!
              </p>
              
              <div className="h-3 w-full bg-surface-container-highest rounded-full overflow-hidden mb-4">
                 <div className="h-full bg-secondary w-[80%] rounded-full shadow-sm" />
              </div>
              <div className="flex justify-between editorial-label text-[11px] mb-8 italic">
                 <span>0km</span>
                 <span>Meta: 50km</span>
              </div>
              
              <button className="w-full btn-secondary py-3 text-label-md flex items-center justify-center gap-2">
                Ver estadísticas completas
              </button>
           </div>
           {/* Visual Flourish */}
           <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />
           <Heart size={80} className="absolute -bottom-4 -right-4 text-secondary/5 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
        </div>
      </div>
    </div>
  );
}
