"use client";

import { useState } from "react";
import { Flag, Map, Users, Trophy, Plus, Calendar, Settings, MoreHorizontal, Medal } from "lucide-react";

const mockCarreras = [
  { id: 1, nombre: "Endurance Internacional San José", fecha: "2026-04-12", distancia: "120km", inscritos: 18, estado: "Próxima", categoria: "FEI ***" },
  { id: 2, nombre: "Copa Otoño Regional", fecha: "2026-05-05", distancia: "80km", inscritos: 32, estado: "Inscripciones Abiertas", categoria: "Nacional" },
  { id: 3, nombre: "Entrenamiento Controlado 40km", fecha: "2026-06-10", distancia: "40km", inscritos: 12, estado: "Planificada", categoria: "Promocional" },
];

export default function EnduranceAdminPage() {
  return (
    <div className="max-w-7xl mx-auto py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="font-serif text-headline-lg text-on-surface">Módulo Endurance</h1>
          <p className="text-body-md text-on-surface-variant">Gestión de competencias, rutas y resultados</p>
        </div>
        <button className="btn-primary py-2 px-6 text-label-md flex items-center gap-2 shadow-float">
          <Plus size={18} /> Nueva Competencia
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="font-serif text-title-lg text-on-surface flex items-center gap-2">
            <Flag size={20} className="text-primary" /> Próximos Eventos
          </h2>
          {mockCarreras.map((c) => (
            <div key={c.id} className="tonal-card p-6 flex flex-col md:flex-row gap-6 items-center">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex flex-col items-center justify-center text-primary border border-primary/20 shrink-0">
                <span className="text-label-sm font-bold uppercase">{c.fecha.split("-")[1] === "04" ? "ABR" : c.fecha.split("-")[1] === "05" ? "MAY" : "JUN"}</span>
                <span className="font-serif text-headline-sm font-black leading-none">{c.fecha.split("-")[2]}</span>
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
                  <h3 className="font-serif text-title-md text-on-surface">{c.nombre}</h3>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-surface-container rounded-full text-on-surface-variant">
                    {c.categoria}
                  </span>
                </div>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-body-sm text-on-surface-variant">
                  <span className="flex items-center gap-1"><Map size={14} /> {c.distancia}</span>
                  <span className="flex items-center gap-1"><Users size={14} /> {c.inscritos} Participantes</span>
                  <span className="flex items-center gap-1 font-bold text-primary">
                    <Calendar size={14} /> {c.estado}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <button className="flex-1 btn-secondary text-label-sm py-2 px-4">Gestionar</button>
                <button className="p-2 hover:bg-surface-container rounded-lg text-on-surface-variant">
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <h2 className="font-serif text-title-lg text-on-surface flex items-center gap-2">
            <Map size={20} className="text-secondary" /> Rutas Guardadas
          </h2>
          <div className="tonal-card p-4 space-y-4">
            {["Ruta Cerro Grande (20km)", "Circuito San José (15km)", "Sendero Bosque (10km)"].map((r, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-container transition-colors cursor-pointer border border-transparent hover:border-outline-variant/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-secondary/10 flex items-center justify-center text-secondary">
                    <Map size={18} />
                  </div>
                  <span className="text-body-sm font-medium text-on-surface">{r}</span>
                </div>
                <Settings size={14} className="text-on-surface-variant opacity-40" />
              </div>
            ))}
            <button className="w-full btn-secondary text-label-sm py-2 mt-4 border-dashed border-2">+ Subir GPX</button>
          </div>

          <h2 className="font-serif text-title-lg text-on-surface flex items-center gap-2 mt-8">
            <Medal size={20} className="text-tertiary" /> Salón de la Fama
          </h2>
          <div className="tonal-card p-5">
            <div className="flex items-center gap-4 mb-4">
              <Trophy size={32} className="text-tertiary animate-pulse" />
              <div>
                <p className="text-body-sm text-on-surface-variant">Mejor Tiempo 120km</p>
                <p className="font-serif text-title-md text-on-surface">Relámpago & J. Silva</p>
              </div>
            </div>
            <p className="text-[11px] text-tertiary font-bold tracking-widest uppercase mb-4">Último Podio</p>
            <div className="space-y-3">
              {[1, 2, 3].map((pos) => (
                <div key={pos} className="flex justify-between items-center text-body-sm">
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-surface-container-highest flex items-center justify-center text-[10px] font-bold">
                      {pos}
                    </span>
                    Binomio {pos}
                  </span>
                  <span className="font-mono text-on-surface-variant tabular-nums">06:42:1{pos}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
