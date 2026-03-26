"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Calendar, 
  Users, 
  CheckSquare, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Clock
} from "lucide-react";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/profesor/dashboard", icon: Home },
  { name: "Agenda de Clases", href: "/profesor/agenda", icon: Calendar },
  { name: "Disponibilidad", href: "/profesor/disponibilidad", icon: Clock },
  { name: "Mis Alumnos", href: "/profesor/alumnos", icon: Users },
  { name: "Asistencia", href: "/profesor/asistencia", icon: CheckSquare },
];

export default function ProfesorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 flex-col bg-surface-container border-r border-outline-variant/10">
        <div className="p-8">
          <Link href="/profesor/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-on-primary transition-transform group-hover:rotate-6 shadow-float">
              <Home size={24} />
            </div>
            <div>
              <p className="font-serif text-title-md text-on-surface leading-tight">Rancho San José</p>
              <p className="text-label-sm text-primary font-bold tracking-widest uppercase opacity-70">Profesor</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? "bg-primary text-on-primary shadow-lg" 
                    : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                }`}
              >
                <item.icon size={20} className={isActive ? "text-on-primary" : "text-primary"} />
                <span className="text-label-lg font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-6 mt-auto">
          <div className="tonal-card p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-serif font-bold">CP</div>
              <div className="overflow-hidden">
                <p className="text-body-sm font-bold text-on-surface truncate">Carolina Pérez</p>
                <p className="text-[11px] text-on-surface-variant truncate">Level: Senior</p>
              </div>
            </div>
          </div>
          <button className="flex items-center gap-4 w-full px-4 py-3 rounded-xl text-on-surface-variant hover:bg-error-container/10 hover:text-error transition-all group">
            <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
            <span className="text-label-lg font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="lg:hidden bg-surface py-4 px-6 border-b border-outline-variant/10 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md">
           <Link href="/profesor/dashboard" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded shadow-sm" />
              <span className="font-serif text-title-md">RSJ Profesor</span>
           </Link>
           <button 
             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
             className="p-2 hover:bg-surface-container rounded-lg"
           >
             {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
           </button>
        </header>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-white p-8">
            <div className="flex justify-between items-center mb-8">
              <span className="font-serif text-headline-sm">Menú</span>
              <button onClick={() => setIsMobileMenuOpen(false)}><X size={32} /></button>
            </div>
            <nav className="space-y-6">
              {navigation.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-6 text-headline-sm text-on-surface-variant font-serif"
                >
                  <item.icon size={28} className="text-primary" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 bg-neutral-50/30">
          <div className="max-w-7xl mx-auto space-y-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
