"use client";

import { useState } from "react";
import { Plus, Search, MoreVertical, Edit2, Trash2, Heart, AlertCircle, CheckCircle2 } from "lucide-react";

const mockCaballos = [
  { id: 1, nombre: "Relámpago", edad: 8, raza: "Árabe", estado: "Disponible", notas: "Excelente para principiantes.", imagen: "🐎" },
  { id: 2, nombre: "Tornado", edad: 10, raza: "Pura Sangre", estado: "Disponible", notas: "Reservado para alumnos avanzados.", imagen: "🐎" },
  { id: 3, nombre: "Canela", edad: 12, raza: "Criollo", estado: "En Reposo", notas: "Lesión leve en pata delantera derecha.", imagen: "🐎" },
  { id: 4, nombre: "Estrella", edad: 7, raza: "Appaloosa", estado: "Disponible", notas: "Muy dócil, ideal para niños.", imagen: "🐎" },
  { id: 5, nombre: "Luna", edad: 9, raza: "Árabe", estado: "Disponible", notas: "Veloz, buena para endurance.", imagen: "🐎" },
  { id: 6, nombre: "Sol", edad: 11, raza: "Cuarto de Milla", estado: "Disponible", notas: "Potencia y fuerza.", imagen: "🐎" },
  { id: 7, nombre: "Brisa", edad: 6, raza: "Lusitano", estado: "No Disponible", notas: "En entrenamiento intensivo.", imagen: "🐎" },
];

export default function CaballosPage() {
  return (
    <div className="max-w-7xl mx-auto py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="font-serif text-headline-lg text-on-surface">Nuestra Flota de Caballos</h1>
          <p className="text-body-md text-on-surface-variant">Administra la salud y disponibilidad de los caballos del club</p>
        </div>
        <button className="btn-primary py-2 px-6 text-label-md flex items-center gap-2 shadow-float">
          <Plus size={18} /> Agregar Caballo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCaballos.map((c) => (
          <div key={c.id} className="tonal-card overflow-hidden group">
            {/* Header / Placeholder for Image */}
            <div className="h-40 bg-surface-container flex items-center justify-center text-7xl relative">
              {c.imagen}
              <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-sm">
                <Edit2 size={16} />
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-serif text-title-lg text-on-surface">{c.nombre}</h3>
                  <p className="text-body-sm text-on-surface-variant">{c.raza} · {c.edad} años</p>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-label-sm font-medium ${
                  c.estado === "Disponible" ? "bg-primary/10 text-primary" : 
                  c.estado === "En Reposo" ? "bg-secondary/10 text-secondary" : "bg-error-container/20 text-error"
                }`}>
                   {c.estado === "Disponible" ? <CheckCircle2 size={12}/> : 
                    c.estado === "En Reposo" ? <Heart size={12}/> : <AlertCircle size={12}/>}
                  {c.estado}
                </span>
              </div>
              
              <p className="text-body-md text-on-surface-variant mb-6 line-clamp-2 italic">
                &ldquo;{c.notas}&rdquo;
              </p>

              <div className="flex gap-2">
                <button className="flex-1 btn-secondary text-label-sm py-2 px-3 hover:bg-primary/5 hover:text-primary transition-all">Ver Ficha</button>
                <button className="p-2 hover:bg-error-container/20 rounded-lg text-on-surface-variant hover:text-error transition-all">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
