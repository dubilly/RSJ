"use client";

import { Map, Flag, Trophy, Award, Clock, ArrowRight, Activity, TrendingUp } from "lucide-react";

export default function EndurancePersonalPage() {
  return (
    <div className="max-w-5xl mx-auto py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
        <div>
          <h1 className="font-serif text-headline-lg text-on-surface">Camino al Endurance</h1>
          <p className="text-body-md text-on-surface-variant italic">Tu progreso en la disciplina de larga distancia de Rancho San José</p>
        </div>
        <div className="p-3 bg-secondary/10 rounded-2xl flex items-center gap-2 border border-secondary/20 shadow-sm animate-pulse-slow">
           <Trophy size={20} className="text-secondary" />
           <span className="text-label-md font-black text-on-surface uppercase tracking-widest">Nivel 4: Regional</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
         {/* Main Stats */}
         <div className="lg:col-span-2 space-y-8">
            <div className="tonal-card p-10 bg-surface-container-highest/20 relative overflow-hidden group">
               <div className="relative z-10">
                  <p className="editorial-label text-on-surface-variant mb-2">Kilómetros Familiares Acumulados</p>
                  <p className="font-serif text-display-large text-on-surface leading-none mb-8">142<span className="text-headline-md text-on-surface-variant font-sans px-2">km</span></p>
                  
                  <div className="grid grid-cols-2 gap-8 border-t border-outline-variant/10 pt-8">
                     <div>
                        <p className="text-[10px] uppercase font-black text-on-surface-variant/50 mb-1">Última Salida</p>
                        <p className="text-title-md font-serif text-on-surface">Cerro Grande · 15km</p>
                     </div>
                     <div>
                        <p className="text-[10px] uppercase font-black text-on-surface-variant/50 mb-1">Rimo Promedio</p>
                        <p className="text-title-md font-serif text-on-surface">18.2 km/h</p>
                     </div>
                  </div>
               </div>
               <Activity size={120} className="absolute -bottom-8 -right-8 text-secondary/5 rotate-[-15deg] group-hover:rotate-0 transition-transform duration-1000" />
            </div>

            {/* Participation Graph Mockup */}
            <div className="tonal-card p-8 min-h-[300px]">
               <h3 className="font-serif text-title-lg text-on-surface mb-8">Actividad de Trote (Últimos 30 días)</h3>
               <div className="flex items-end justify-between h-40 gap-2">
                  {[4, 8, 2, 0, 15, 6, 8, 4, 12, 10, 5, 18, 5, 2].map((v, i) => (
                    <div key={i} className="flex-1 bg-secondary/10 rounded-t-lg transition-all duration-700 hover:bg-secondary relative group cursor-pointer" style={{ height: `${(v/20)*100}%` }}>
                       <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-on-surface text-on-primary px-2 py-1 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                          {v} km
                       </div>
                    </div>
                  ))}
               </div>
               <div className="flex justify-between editorial-label text-[10px] mt-6 opacity-40 italic">
                  <span>Hace 30 días</span>
                  <span>Hoy</span>
               </div>
            </div>
         </div>

         {/* Individual Progress Sidebars */}
         <div className="space-y-8">
            <h3 className="font-serif text-title-lg text-on-surface italic">Por Jinete</h3>
            
            <div className="tonal-card p-6 border-l-4 border-primary">
               <div className="flex items-center justify-between mb-4">
                  <p className="text-title-md font-serif text-on-surface font-black">Juanito</p>
                  <Award size={18} className="text-primary" />
               </div>
               <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-2">Meta: 40km FEI 3*</p>
               <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-primary w-[65%]" />
               </div>
               <p className="text-label-sm text-primary font-bold">65% Completado</p>
            </div>

            <div className="tonal-card p-6 border-l-4 border-secondary">
               <div className="flex items-center justify-between mb-4">
                  <p className="text-title-md font-serif text-on-surface font-black">Sofía</p>
                  <Award size={18} className="text-secondary" />
               </div>
               <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-2">Meta: Regional 20km</p>
               <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-secondary w-[90%]" />
               </div>
               <p className="text-label-sm text-secondary font-bold">¡90% Completado!</p>
            </div>

            <div className="tonal-card p-6 bg-surface-container-low border border-dashed border-outline-variant/20">
               <h4 className="text-label-md font-black text-on-surface-variant uppercase mb-4 tracking-widest">Próximas Metas</h4>
               <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                     <TrendingUp size={16} className="text-tertiary mt-0.5 shrink-0" />
                     <p className="text-body-sm text-on-surface-variant">Inscribir binomio Sofía-Tornado en Regional Mayo.</p>
                  </li>
                  <li className="flex items-start gap-3 opacity-60">
                     <Clock size={16} className="text-on-surface-variant mt-0.5 shrink-0" />
                     <p className="text-body-sm text-on-surface-variant">Mejorar ritmo cardíaco de Relámpago en 120km.</p>
                  </li>
               </ul>
            </div>
         </div>
      </div>

      <div className="tonal-card p-8 flex flex-col md:flex-row items-center justify-between gap-8 bg-black text-white hover:scale-[1.01] transition-transform cursor-pointer">
         <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-white border border-white/20">
               <Flag size={32} />
            </div>
            <div>
               <h3 className="font-serif text-headline-sm italic">Ver Calendario de Competencias</h3>
               <p className="text-on-surface-variant/80 text-body-md">Inscríbete en los próximos eventos nacionales e internacionales</p>
            </div>
         </div>
         <ArrowRight size={32} />
      </div>
    </div>
  );
}
