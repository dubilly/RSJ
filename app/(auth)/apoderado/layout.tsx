"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Calendar, 
  Users, 
  CreditCard, 
  Trophy, 
  LogOut, 
  Menu, 
  X,
  PlusCircle
} from "lucide-react";
import { useState } from "react";

const navigation = [
  { name: "Mi Dashboard", href: "/apoderado/dashboard", icon: Home },
  { name: "Mis Hijos", href: "/apoderado/hijos", icon: Users },
  { name: "Agendar Clase", href: "/apoderado/agendar", icon: Calendar },
  { name: "Pagos y Cuotas", href: "/apoderado/pagos", icon: CreditCard },
  { name: "Endurance", href: "/apoderado/endurance", icon: Trophy },
];

export default function ApoderadoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 flex-col bg-surface-container border-r border-outline-variant/10 shadow-sm relative z-20">
        <div className="p-8">
          <Link href="/apoderado/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-on-primary shadow-lg border-2 border-white">
               <span className="font-serif font-black">RSJ</span>
            </div>
            <div>
              <p className="font-serif text-title-md text-on-surface leading-tight">Rancho San José</p>
              <p className="text-label-sm text-secondary font-bold tracking-widest uppercase opacity-70">Apoderado</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 ${
                  isActive 
                    ? "bg-secondary text-on-secondary shadow-md" 
                    : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                }`}
              >
                <item.icon size={20} className={isActive ? "text-on-secondary" : "text-secondary"} />
                <span className="text-label-lg font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-6 mt-auto">
          <div className="tonal-card p-4 mb-6 bg-surface-container-highest/20 group cursor-pointer hover:bg-surface-container-highest/40 transition-all border border-transparent hover:border-outline-variant/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-serif font-bold">JP</div>
              <div className="overflow-hidden">
                <p className="text-body-sm font-black text-on-surface truncate">Juan Pérez</p>
                <p className="text-[11px] text-on-surface-variant truncate">Plan Familiar</p>
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
        <header className="lg:hidden bg-surface py-4 px-6 border-b border-outline-variant/10 flex items-center justify-between sticky top-0 z-40">
           <Link href="/apoderado/dashboard" className="flex items-center gap-3">
              <span className="font-serif text-title-md">RSJ Portal</span>
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
                  <item.icon size={28} className="text-secondary" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:px-12 md:py-10 bg-neutral-50/20">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
