"use client";

import { useState } from "react";
import { Search, Filter, ShieldCheck, ShieldAlert, MoreVertical, Mail, Phone, Calendar } from "lucide-react";

const mockUsuarios = [
  { id: 1, nombre: "María González", email: "maria.g@email.com", telefono: "+56912345678", fecha: "2026-03-25", rol: "Apoderado", estado: "Pendiente" },
  { id: 2, nombre: "Pedro Soto", email: "pedro.soto@email.com", telefono: "+56987654321", fecha: "2026-03-24", rol: "Apoderado", estado: "Pendiente" },
  { id: 3, nombre: "Carolina Pérez", email: "carolina.p@email.com", telefono: "+56955554444", fecha: "2025-12-10", rol: "Profesor", estado: "Activo" },
  { id: 4, nombre: "Juan Pérez", email: "juan.p@email.com", telefono: "+56911112222", fecha: "2026-01-15", rol: "Apoderado", estado: "Activo" },
  { id: 5, nombre: "Ana Morales", email: "ana.m@email.com", telefono: "+56999998888", fecha: "2025-11-20", rol: "Profesor", estado: "Activo" },
];

export default function UsuariosPage() {
  const [filter, setFilter] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsuarios = mockUsuarios.filter(u => {
    const matchesFilter = filter === "Todos" || u.estado === filter || u.rol === filter;
    const matchesSearch = u.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="font-serif text-headline-lg text-on-surface">Gestión de Usuarios</h1>
          <p className="text-body-md text-on-surface-variant">Aprueba nuevos registros y administra el equipo del club</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary py-2 px-4 text-label-md">Exportar Lista</button>
          <button className="btn-primary py-2 px-4 text-label-md">+ Invitar Profesor</button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nombre o email..." 
            className="editorial-input pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {["Todos", "Pendiente", "Activo", "Profesor"].map((f) => (
            <button 
              key={f} 
              onClick={() => setFilter(f)}
              className={`chip ${filter === f ? "active" : ""}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Users Grid/List */}
      <div className="tonal-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="px-6 py-4 editorial-label">Usuario</th>
                <th className="px-6 py-4 editorial-label">Rol</th>
                <th className="px-6 py-4 editorial-label">Contacto</th>
                <th className="px-6 py-4 editorial-label">Estado</th>
                <th className="px-6 py-4 editorial-label">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {filteredUsuarios.map((user) => (
                <tr key={user.id} className="hover:bg-surface-container-low/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-serif font-bold">
                        {user.nombre.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-body-md font-semibold text-on-surface">{user.nombre}</p>
                        <p className="text-label-sm text-on-surface-variant flex items-center gap-1">
                          <Calendar size={12} /> {user.fecha}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-label-sm px-2.5 py-1 rounded-full ${user.rol === "Profesor" ? "bg-tertiary/10 text-tertiary" : "bg-primary/10 text-primary"}`}>
                      {user.rol}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <p className="text-body-sm text-on-surface-variant flex items-center gap-2">
                        <Mail size={14} className="opacity-50" /> {user.email}
                      </p>
                      <p className="text-body-sm text-on-surface-variant flex items-center gap-2">
                        <Phone size={14} className="opacity-50" /> {user.telefono}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {user.estado === "Pendiente" ? (
                      <span className="flex items-center gap-1.5 text-label-sm font-medium text-secondary">
                        <ShieldAlert size={14} /> En espera
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-label-sm font-medium text-primary">
                        <ShieldCheck size={14} /> Aprobado
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {user.estado === "Pendiente" ? (
                        <>
                          <button className="text-label-sm font-bold text-primary hover:underline">Aprobar</button>
                          <button className="text-label-sm font-bold text-error hover:underline">Rechazar</button>
                        </>
                      ) : (
                        <button className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant">
                          <MoreVertical size={18} />
                        </button>
                      )}
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
