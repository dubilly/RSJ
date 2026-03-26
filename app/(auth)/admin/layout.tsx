"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  CreditCard,
  BarChart3,
  Trophy,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/usuarios", label: "Usuarios", icon: Users },
  { href: "/admin/caballos", label: "Caballos", icon: "🐎" },
  { href: "/admin/clases", label: "Clases", icon: CalendarDays },
  { href: "/admin/pagos", label: "Pagos", icon: CreditCard },
  { href: "/admin/reportes", label: "Reportes", icon: BarChart3 },
  { href: "/admin/endurance", label: "Endurance", icon: Trophy },
  { href: "/admin/configuracion", label: "Configuración", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface flex">
      {/* ── Sidebar ── */}
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-surface-container-low flex flex-col transition-transform duration-500 ease-equestrian ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="px-6 py-6 flex items-center justify-between">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <span className="text-2xl">🐎</span>
            <div>
              <span className="font-serif text-title-md font-semibold text-primary">
                Rancho San José
              </span>
              <span className="block editorial-label text-on-surface-variant">
                Panel de Admin
              </span>
            </div>
          </Link>
          <button
            className="lg:hidden text-on-surface-variant"
            onClick={() => setSidebarOpen(false)}
            aria-label="Cerrar menú"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-auto">
          {navItems.map((item) => {
            const isActive = pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-body-md font-medium transition-all duration-400 ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                }`}
              >
                {typeof item.icon === "string" ? (
                  <span className="text-lg w-5 flex justify-center">
                    {item.icon}
                  </span>
                ) : (
                  <item.icon
                    size={20}
                    className={
                      isActive ? "text-primary" : "text-on-surface-variant"
                    }
                  />
                )}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="px-4 py-5">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-surface-container">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-serif font-bold text-title-sm">
              CD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-body-md font-semibold text-on-surface truncate">
                Constanza Duhalde
              </p>
              <p className="editorial-label text-xs">Administradora</p>
            </div>
          </div>
          <button
            className="mt-3 w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-body-sm text-on-surface-variant hover:text-error hover:bg-error-container/20 transition-all duration-500"
            id="admin-logout"
          >
            <LogOut size={16} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-surface/80 backdrop-blur-sm px-6 py-4 flex items-center justify-between lg:justify-end">
          <button
            className="lg:hidden p-2 text-on-surface-variant"
            onClick={() => setSidebarOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center gap-4">
            <span className="text-body-sm text-on-surface-variant">
              {new Date().toLocaleDateString("es-CL", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 px-6 pb-8">{children}</main>
      </div>
    </div>
  );
}
