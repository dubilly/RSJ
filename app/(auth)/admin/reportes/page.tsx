"use client";

import { useState } from "react";
import { TrendingUp, TrendingDown, Users, Calendar, Download, PieChart, BarChart } from "lucide-react";

// Mock data for charts visualization
const dataIngresos = [
  { mes: "Ene", valor: 450000 },
  { mes: "Feb", valor: 510000 },
  { mes: "Mar", valor: 840000 },
  { mes: "Abr", valor: 0 },
];

export default function ReportesPage() {
  const [periodo, setPeriodo] = useState("Marzo 2026");

  return (
    <div className="max-w-7xl mx-auto py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="font-serif text-headline-lg text-on-surface">Reportes y Estadísticas</h1>
          <p className="text-body-md text-on-surface-variant">Análisis de rendimiento, asistencia y finanzas del club</p>
        </div>
        <div className="flex gap-3">
          <select 
            className="editorial-input py-2 px-4 !w-auto text-label-md" 
            value={periodo} 
            onChange={(e) => setPeriodo(e.target.value)}
          >
            <option>Marzo 2026</option>
            <option>Febrero 2026</option>
            <option>Enero 2026</option>
          </select>
          <button className="btn-secondary py-2 px-4 text-label-md flex items-center gap-2">
            <Download size={18} /> Descargar PDF
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Asistencia Promedio", value: "92%", icon: Users, change: "+5%", trend: "up" },
          { label: "Nuevos Alumnos", value: "8", icon: Users, change: "+3", trend: "up" },
          { label: "Clases Dictadas", value: "54", icon: Calendar, change: "-10%", trend: "down" },
          { label: "Tasa de Pago Único", value: "84%", icon: PieChart, change: "+2%", trend: "up" },
        ].map((stat, i) => (
          <div key={i} className="tonal-card p-6">
            <div className="flex items-center justify-between mb-3 text-on-surface-variant">
              <span className="editorial-label">{stat.label}</span>
              <stat.icon size={20} className="opacity-60" />
            </div>
            <p className="font-serif text-headline-md text-on-surface font-bold">{stat.value}</p>
            <p className={`flex items-center gap-1 text-label-sm font-bold mt-2 ${stat.trend === "up" ? "text-primary" : "text-error"}`}>
              {stat.trend === "up" ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {stat.change} vs. mes anterior
            </p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Revenue Chart Placeholder */}
        <div className="tonal-card p-8 min-h-[400px]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-serif text-title-lg text-on-surface">Crecimiento de Ingresos</h3>
            <BarChart size={20} className="text-on-surface-variant opacity-50" />
          </div>
          
          <div className="flex items-end justify-between h-64 px-4">
            {dataIngresos.map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-3 w-16">
                <div 
                  className={`w-full rounded-t-lg transition-all duration-1000 ${i === 2 ? 'bg-primary' : 'bg-surface-container-highest'}`}
                  style={{ height: d.valor > 0 ? `${(d.valor / 900000) * 100}%` : '8px' }}
                />
                <span className="editorial-label text-xs">{d.mes}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-outline-variant/10 flex justify-between">
            <div>
              <p className="editorial-label text-xs">Total Trimestre</p>
              <p className="font-serif text-title-lg text-primary">$1.800.000</p>
            </div>
            <div className="text-right">
              <p className="editorial-label text-xs">Mejor Mes</p>
              <p className="font-serif text-title-lg text-on-surface">Marzo</p>
            </div>
          </div>
        </div>

        {/* Attendance heatmap or secondary chart */}
        <div className="tonal-card p-8 min-h-[400px]">
          <h3 className="font-serif text-title-lg text-on-surface mb-8">Ocupación por Horario</h3>
          
          <div className="space-y-4">
            {[
              { hora: "14:00", label: "Lunes", pct: 60 },
              { hora: "15:00", label: "Martes", pct: 85 },
              { hora: "16:00", label: "Miércoles", pct: 100 },
              { hora: "17:00", label: "Jueves", pct: 40 },
              { hora: "18:00", label: "Viernes", pct: 20 },
            ].map((h, i) => (
              <div key={i}>
                <div className="flex justify-between editorial-label text-[10px] mb-1.5 px-1">
                  <span>{h.hora} - {h.label}</span>
                  <span>{h.pct}%</span>
                </div>
                <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${h.pct === 100 ? 'bg-error' : h.pct > 70 ? 'bg-secondary' : 'bg-primary'}`} 
                    style={{ width: `${h.pct}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-body-sm text-on-surface-variant mt-8 italic">
            * Los horarios de las 16:00 presentan sobrecupo sistemático. Se recomienda abrir nuevos bloques paralelos.
          </p>
        </div>
      </div>
    </div>
  );
}
