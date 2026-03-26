"use client";

import { useState } from "react";
import { Search, Filter, Download, CreditCard, CheckCircle, Clock, AlertCircle, Eye, MessageSquare } from "lucide-react";

const mockPagos = [
  { id: "MP-123", apoderado: "Juan Pérez", monto: "$150.000", fecha: "2026-03-24", metodo: "Mercado Pago", estado: "Aprobado", mes: "Marzo 2026" },
  { id: "MP-124", apoderado: "María González", monto: "$285.000", fecha: "2026-03-23", metodo: "Mercado Pago", estado: "Aprobado", mes: "Marzo 2026" },
  { id: "PEN-99", apoderado: "Pedro Soto", monto: "$150.000", fecha: "---", metodo: "Transferencia", estado: "Pendiente", mes: "Marzo 2026" },
  { id: "ATR-55", apoderado: "Lucía Méndez", monto: "$150.000", fecha: "---", metodo: "Tarjeta", estado: "Atrasado", mes: "Febrero 2026" },
  { id: "MP-125", apoderado: "Andrés Silva", monto: "$225.000", fecha: "2026-03-20", metodo: "Mercado Pago", estado: "Aprobado", mes: "Marzo 2026" },
];

export default function PagosAdminPage() {
  return (
    <div className="max-w-7xl mx-auto py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="font-serif text-headline-lg text-on-surface">Gestión de Pagos</h1>
          <p className="text-body-md text-on-surface-variant">Seguimiento de cuotas mensuales y pagos de inscripciones</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary py-2 px-4 text-label-md flex items-center gap-2">
            <Download size={18} /> Exportar Excel
          </button>
          <button className="btn-primary py-2 px-4 text-label-md">Generar Cobros Mes</button>
        </div>
      </div>

      {/* Summary Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="tonal-card p-6 border-l-4 border-primary">
          <p className="editorial-label mb-1">Recaudado este mes</p>
          <p className="font-serif text-display-sm text-primary">$2.450.000</p>
          <p className="text-label-sm text-on-surface-variant mt-1">75% de la meta mensual</p>
        </div>
        <div className="tonal-card p-6 border-l-4 border-secondary">
          <p className="editorial-label mb-1">Pendiente de pago</p>
          <p className="font-serif text-display-sm text-secondary">$850.000</p>
          <p className="text-label-sm text-on-surface-variant mt-1">6 apoderados por pagar</p>
        </div>
        <div className="tonal-card p-6 border-l-4 border-error">
          <p className="editorial-label mb-1">Pagos Atrasados</p>
          <p className="font-serif text-display-sm text-error">$150.000</p>
          <p className="text-label-sm text-on-surface-variant mt-1">Requiere atención (1 caso)</p>
        </div>
      </div>

      {/* Filter / Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50" size={18} />
          <input type="text" placeholder="Buscar apoderado o ID de pago..." className="editorial-input pl-10" />
        </div>
        <div className="flex gap-2">
          {["Todos", "Aprobado", "Pendiente", "Atrasado"].map(s => (
            <button key={s} className={`chip ${s === "Todos" ? "active" : ""}`}>{s}</button>
          ))}
        </div>
      </div>

      {/* Pagos Table */}
      <div className="tonal-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="px-6 py-4 editorial-label">Apoderado</th>
                <th className="px-6 py-4 editorial-label">Monto</th>
                <th className="px-6 py-4 editorial-label">Mes / Ciclo</th>
                <th className="px-6 py-4 editorial-label">Estado</th>
                <th className="px-6 py-4 editorial-label">Fecha</th>
                <th className="px-6 py-4 editorial-label text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {mockPagos.map((p) => (
                <tr key={p.id} className="hover:bg-surface-container-low/30 transition-colors">
                  <td className="px-6 py-4 text-body-md font-semibold text-on-surface">{p.apoderado}</td>
                  <td className="px-6 py-4 font-serif text-on-surface font-bold">{p.monto}</td>
                  <td className="px-6 py-4 text-body-sm text-on-surface-variant">{p.mes}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-label-sm font-medium ${
                      p.estado === "Aprobado" ? "bg-primary/10 text-primary" : 
                      p.estado === "Pendiente" ? "bg-secondary/10 text-secondary" : "bg-error-container/20 text-error"
                    }`}>
                      {p.estado === "Aprobado" ? <CheckCircle size={12}/> : 
                       p.estado === "Pendiente" ? <Clock size={12}/> : <AlertCircle size={12}/>}
                      {p.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-body-sm text-on-surface-variant">{p.fecha}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">
                      <button className="p-1.5 hover:bg-surface-container rounded transition-all text-on-surface-variant" title="Ver Recibo">
                        <Eye size={18} />
                      </button>
                      <button className="p-1.5 hover:bg-primary/10 rounded transition-all text-primary" title="Enviar Recordatorio WhatsApp">
                        <MessageSquare size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
