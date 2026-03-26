"use client";

import { CreditCard, Download, ExternalLink, CheckCircle2, Clock, AlertCircle } from "lucide-react";

const mockPagos = [
  { id: "M-MAR-26", concepto: "Mensualidad Marzo - Juanito Perez", monto: "30.000", fecha: "05/03/2026", estado: "Pagado", metodo: "Mercado Pago" },
  { id: "I-MAR-26", concepto: "Inscripción - Sofía Perez", monto: "50.000", fecha: "01/03/2026", estado: "Pagado", metodo: "Mercado Pago" },
  { id: "M-ABR-26", concepto: "Mensualidad Abril", monto: "30.000", fecha: "Pendiente", estado: "Pendiente", metodo: "N/A" },
];

export default function PagosPage() {
  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="font-serif text-headline-lg text-on-surface">Pagos y Facturación</h1>
          <p className="text-body-md text-on-surface-variant">Gestiona tus cuotas mensuales y pagos del club</p>
        </div>
        <div className="flex items-center gap-2 text-label-md font-bold text-primary italic">
           <span className="p-2 rounded-lg bg-primary/10">Cuenta Familiar</span>
        </div>
      </div>

      <div className="tonal-card p-10 mb-12 bg-surface-container relative overflow-hidden group">
         <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
               <p className="editorial-label mb-2 opacity-60">Cuota Pendiente Actual</p>
               <p className="font-serif text-display-large text-on-surface font-black">$30.000</p>
               <p className="text-label-md text-secondary mt-2 font-bold italic tracking-wider">VENCE EN 12 DÍAS</p>
            </div>
            <div className="w-full md:w-auto">
               <button className="w-full btn-primary py-4 px-12 text-label-lg shadow-lg flex items-center justify-center gap-3 hover:scale-[1.02] transition-all">
                  <CreditCard size={20} /> Pagar con Mercado Pago
               </button>
               <p className="text-center text-[10px] text-on-surface-variant mt-4 font-bold tracking-widest opacity-40 uppercase">
                  Transacción 100% Segura
               </p>
            </div>
         </div>
         {/* Background Visual */}
         <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/3 group-hover:rotate-12 transition-transform duration-1000" />
      </div>

      <div className="space-y-6">
         <h2 className="font-serif text-title-lg text-on-surface">Historial de Transacciones</h2>
         {mockPagos.map((p, i) => (
           <div key={i} className="tonal-card p-6 flex items-center justify-between group hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-outline-variant/5">
              <div className="flex items-center gap-6">
                 <div className={`p-4 rounded-2xl ${p.estado === "Pagado" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"}`}>
                    {p.estado === "Pagado" ? <CheckCircle2 size={24}/> : <Clock size={24}/>}
                 </div>
                 <div>
                    <p className="text-body-md font-black text-on-surface">{p.concepto}</p>
                    <p className="text-label-sm text-on-surface-variant">{p.metodo} · {p.fecha}</p>
                 </div>
              </div>
              <div className="text-right flex flex-col items-end gap-2">
                 <p className="font-serif text-title-lg text-on-surface font-black">${p.monto}</p>
                 {p.estado === "Pagado" ? (
                   <button className="text-[10px] items-center gap-1 font-black uppercase tracking-widest text-on-surface-variant flex hover:text-primary transition-colors">
                      <Download size={12}/> Comprobante
                   </button>
                 ) : (
                   <span className="text-[10px] font-black uppercase tracking-widest text-secondary flex items-center gap-1">
                      <AlertCircle size={12}/> Pendiente
                   </span>
                 )}
              </div>
           </div>
         ))}
      </div>

      <div className="mt-16 text-center border-t border-outline-variant/10 pt-8">
         <p className="text-body-sm text-on-surface-variant opacity-60 flex items-center justify-center gap-2">
            ¿Necesitas ayuda con tus pagos? <span className="font-bold text-secondary cursor-pointer hover:underline">Soporte RSJ</span> <ExternalLink size={14}/>
         </p>
      </div>
    </div>
  );
}
