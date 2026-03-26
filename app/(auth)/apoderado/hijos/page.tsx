"use client";

import { useState } from "react";
import { PlusCircle, Edit3, Trash2, Heart, Award, Info, ChevronRight } from "lucide-react";

export default function MisHijosPage() {
  const [hijos, setHijos] = useState([
    { id: 1, nombre: "Juanito Pérez", edad: "8 años", nivel: "Principiante", clases: 12, caballoPref: "Relámpago" },
    { id: 2, nombre: "Sofía Pérez", edad: "10 años", nivel: "Intermedio", clases: 24, caballoPref: "Tornado" },
  ]);

  return (
    <div className="max-w-5xl mx-auto py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="font-serif text-headline-lg text-on-surface italic">Mis Pequeños Jinetes</h1>
          <p className="text-body-md text-on-surface-variant">Gestiona los perfiles y el progreso de tus hijos</p>
        </div>
        <button className="btn-primary py-3 px-8 text-label-lg shadow-float flex items-center gap-3">
          <PlusCircle size={20} /> Inscribir Nuevo Hijo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {hijos.map((hijo) => (
          <div key={hijo.id} className="tonal-card overflow-hidden group hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-outline-variant/5">
            <div className="p-8">
              <div className="flex justify-between items-start mb-8">
                 <div className="w-16 h-16 rounded-3xl bg-surface-container flex items-center justify-center text-secondary font-serif font-black text-2xl shadow-inner group-hover:bg-secondary group-hover:text-on-secondary transition-all">
                    {hijo.nombre[0]}
                 </div>
                 <div className="flex gap-2">
                    <button className="p-2.5 hover:bg-surface-container rounded-xl text-on-surface-variant transition-colors"><Edit3 size={18} /></button>
                    <button className="p-2.5 hover:bg-error-container/10 rounded-xl text-on-surface-variant hover:text-error transition-colors"><Trash2 size={18} /></button>
                 </div>
              </div>

              <h2 className="font-serif text-headline-sm text-on-surface mb-1">{hijo.nombre}</h2>
              <div className="flex items-center gap-3 mb-8">
                 <span className="text-label-sm font-black px-2.5 py-1 bg-surface-container-highest rounded text-on-surface-variant">{hijo.edad}</span>
                 <span className="text-label-sm font-black px-2.5 py-1 bg-primary/10 rounded text-primary">{hijo.nivel}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                 <div className="p-4 bg-surface-container-low rounded-2xl text-center">
                    <p className="editorial-label text-[10px] mb-1">Clases Realizadas</p>
                    <p className="font-serif text-title-lg text-on-surface">{hijo.clases}</p>
                 </div>
                 <div className="p-4 bg-surface-container-low rounded-2xl text-center">
                    <p className="editorial-label text-[10px] mb-1">Caballo Favorito</p>
                    <p className="font-serif text-title-lg text-secondary">🐎 {hijo.caballoPref.split(" ")[0]}</p>
                 </div>
              </div>

              <button className="w-full flex items-center justify-between p-4 bg-secondary/5 hover:bg-secondary/10 rounded-2xl text-secondary text-label-md font-bold transition-all group-2">
                 <span>Ver Reportes de Progreso</span>
                 <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        ))}

        {/* Empty State / Add Card */}
        <div className="border-4 border-dashed border-outline-variant/10 rounded-3xl p-12 flex flex-col items-center justify-center text-center opacity-40 hover:opacity-100 hover:border-secondary/30 transition-all cursor-pointer group">
           <PlusCircle size={48} className="text-on-surface-variant mb-4 group-hover:scale-110 transition-transform" />
           <p className="font-serif text-title-md text-on-surface mb-1">¿Otro futuro jinete?</p>
           <p className="text-body-sm text-on-surface-variant">Inscribe a otro miembro de la familia</p>
        </div>
      </div>

      <div className="mt-16 tonal-card p-6 bg-secondary/5 border border-secondary/10 flex gap-5 items-start">
         <div className="p-2 rounded-full bg-secondary/10 text-secondary shrink-0">
            <Info size={24} />
         </div>
         <div>
            <h4 className="text-title-md text-on-surface font-black mb-1">Sobre el binomio activo</h4>
            <p className="text-body-sm text-on-surface-variant">
              Tus hijos tienen un caballo asignado preferentemente. Esto ayuda a fortalecer el vínculo afectivo y la confianza, clave para el avance en clases de iniciación. Si deseas solicitar un cambio de caballo, por favor comunícate con su profesor asignado.
            </p>
         </div>
      </div>
    </div>
  );
}
