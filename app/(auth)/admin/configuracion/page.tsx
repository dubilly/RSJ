"use client";

import { Save, Bell, Shield, Smartphone, CreditCard, HelpCircle, User } from "lucide-react";

export default function ConfigPage() {
  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="mb-8">
        <h1 className="font-serif text-headline-lg text-on-surface">Configuración del Club</h1>
        <p className="text-body-md text-on-surface-variant">Administra los parámetros globales del sistema y del club</p>
      </div>

      <div className="space-y-8">
        {/* Generales */}
        <div className="tonal-card p-8">
          <h2 className="font-serif text-title-lg text-on-surface mb-6 flex items-center gap-3">
            <Smartphone size={22} className="text-primary" /> Información del Club
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="editorial-label">Nombre del Club</label>
              <input type="text" defaultValue="Rancho San José" className="editorial-input" />
            </div>
            <div className="space-y-2">
              <label className="editorial-label">Email de Contacto</label>
              <input type="email" defaultValue="contacto@ranchosanjose.cl" className="editorial-input" />
            </div>
            <div className="space-y-2">
              <label className="editorial-label">WhatsApp Notificaciones</label>
              <input type="text" defaultValue="+56 9 1234 5678" className="editorial-input" />
            </div>
            <div className="space-y-2">
              <label className="editorial-label">Ubicación</label>
              <input type="text" defaultValue="San José de Maipo, Chile" className="editorial-input" />
            </div>
          </div>
        </div>

        {/* Tarifas */}
        <div className="tonal-card p-8">
          <h2 className="font-serif text-title-lg text-on-surface mb-6 flex items-center gap-3">
            <CreditCard size={22} className="text-secondary" /> Tarifas de Clases (CLP)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="editorial-label font-bold text-primary">Clase Grupal</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-50">$</span>
                <input type="number" defaultValue="30000" className="editorial-input pl-8" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="editorial-label font-bold text-secondary">Clase Individual</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-50">$</span>
                <input type="number" defaultValue="45000" className="editorial-input pl-8" />
              </div>
            </div>
          </div>
          <p className="text-label-sm text-on-surface-variant mt-4 italic">
            * Estas tarifas se aplicarán automáticamente a los nuevos alumnos inscritos.
          </p>
        </div>

        {/* Notificaciones */}
        <div className="tonal-card p-8">
          <h2 className="font-serif text-title-lg text-on-surface mb-6 flex items-center gap-3">
            <Bell size={22} className="text-tertiary" /> Sistema de Notificaciones
          </h2>
          <div className="space-y-6">
            {[
              { label: "Recordatorios WhatsApp (24h antes)", confirmed: true },
              { label: "Notificar pagos aprobados a apoderados", confirmed: true },
              { label: "Avisar a profesores de nuevas clases agendadas", confirmed: false },
              { label: "Reporte semanal automático a administración", confirmed: true },
            ].map((n, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-outline-variant/10 last:border-0">
                <span className="text-body-md text-on-surface">{n.label}</span>
                <div className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${n.confirmed ? 'bg-primary' : 'bg-surface-container-highest'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${n.confirmed ? 'translate-x-6' : 'translate-x-0'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Roles y Permisos */}
        <div className="tonal-card p-8">
          <h2 className="font-serif text-title-lg text-on-surface mb-6 flex items-center gap-3">
            <Shield size={22} className="text-on-surface" /> Seguridad y Roles
          </h2>
          <div className="flex items-center justify-between p-4 bg-surface-container rounded-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <User size={24} />
              </div>
              <div>
                <p className="font-serif text-title-md text-on-surface">Gestión de Accesos</p>
                <p className="text-body-sm text-on-surface-variant text-pretty">Define quién puede editar clases y ver reportes financieros.</p>
              </div>
            </div>
            <button className="btn-secondary py-2 px-4 text-label-sm">Configurar Roles</button>
          </div>
        </div>

        <div className="flex justify-end pt-4 pb-12">
          <button className="btn-primary py-3 px-10 text-label-lg flex items-center gap-3 shadow-lg hover:scale-[1.02] transition-all">
            <Save size={20} /> Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}
