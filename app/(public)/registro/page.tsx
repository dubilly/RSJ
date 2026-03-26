"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  User,
  Phone,
  FileText,
} from "lucide-react";

export default function RegistroPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [telefono, setTelefono] = useState("+569");
  const [telefonoError, setTelefonoError] = useState("");

  const REGEX_TELEFONO_CL = /^\+569\d{8}$/;

  const handleTelefonoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTelefono(value);
    if (value.length > 4 && !REGEX_TELEFONO_CL.test(value)) {
      setTelefonoError("Formato: +569XXXXXXXX (12 dígitos)");
    } else {
      setTelefonoError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!REGEX_TELEFONO_CL.test(telefono)) {
      setTelefonoError("Ingresa un número válido: +569XXXXXXXX");
      return;
    }
    setIsLoading(true);
    // TODO: Integrate with Supabase Auth
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <main className="min-h-screen bg-surface flex">
      {/* Left: Decorative */}
      <div className="hidden lg:flex lg:w-[45%] relative bg-gradient-primary items-end p-12">
        <div className="absolute top-12 left-12 flex items-center gap-3">
          <span className="text-3xl">🐎</span>
          <span className="font-serif text-title-lg text-white font-semibold">
            Rancho San José
          </span>
        </div>

        <div className="absolute top-1/4 right-16 w-72 h-72 rounded-full border border-white/10" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full border border-white/5" />

        <div className="relative z-10 max-w-md">
          <h2 className="font-serif text-display-sm text-white mb-4 leading-tight">
            Únete a la familia ecuestre
          </h2>
          <p className="text-body-lg text-white/70 mb-8">
            Registra tu cuenta de apoderado para inscribir a tus hijos en clases
            de equitación y próximas carreras Endurance.
          </p>

          <div className="space-y-4">
            {[
              "Registra a tus hijos",
              "Agenda clases fácilmente",
              "Paga en línea con Mercado Pago",
              "Recibe notificaciones por WhatsApp",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 text-body-md text-white/80"
              >
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white/15 text-white text-label-sm">
                  ✓
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 overflow-auto">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <span className="text-3xl">🐎</span>
            <div>
              <span className="font-serif text-title-lg font-semibold text-primary block">
                Rancho San José
              </span>
              <span className="editorial-label">Club Ecuestre</span>
            </div>
          </div>

          <div className="mb-8">
            <span className="editorial-label text-secondary mb-3 block">
              Registro de Apoderado
            </span>
            <h1 className="font-serif text-headline-lg text-on-surface mb-2">
              Crea tu cuenta
            </h1>
            <p className="text-body-md text-on-surface-variant">
              Completa tus datos para registrarte en el club
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nombre */}
            <div>
              <label className="editorial-label mb-2 block" htmlFor="reg-nombre">
                Nombre completo
              </label>
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/50"
                />
                <input
                  type="text"
                  placeholder="Ej: María Constanza López"
                  className="editorial-input pl-11"
                  required
                  id="reg-nombre"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="editorial-label mb-2 block" htmlFor="reg-email">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/50"
                />
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="editorial-input pl-11"
                  required
                  id="reg-email"
                />
              </div>
            </div>

            {/* Teléfono WhatsApp */}
            <div>
              <label className="editorial-label mb-2 block" htmlFor="reg-tel">
                Teléfono WhatsApp
              </label>
              <div className="relative">
                <Phone
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/50"
                />
                <input
                  type="tel"
                  value={telefono}
                  onChange={handleTelefonoChange}
                  placeholder="+56912345678"
                  className={`editorial-input pl-11 ${
                    telefonoError
                      ? "ring-2 ring-error/40 bg-error-container/10"
                      : ""
                  }`}
                  required
                  id="reg-tel"
                />
              </div>
              {telefonoError && (
                <p className="text-error text-label-sm mt-1.5">
                  {telefonoError}
                </p>
              )}
            </div>

            {/* RUT (optional) */}
            <div>
              <label className="editorial-label mb-2 block" htmlFor="reg-rut">
                RUT{" "}
                <span className="text-on-surface-variant/50">(opcional)</span>
              </label>
              <div className="relative">
                <FileText
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/50"
                />
                <input
                  type="text"
                  placeholder="12.345.678-9"
                  className="editorial-input pl-11"
                  id="reg-rut"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="editorial-label mb-2 block" htmlFor="reg-pass">
                Contraseña
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/50"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Mínimo 8 caracteres"
                  className="editorial-input pl-11 pr-11"
                  required
                  minLength={8}
                  id="reg-pass"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/50 hover:text-on-surface transition-colors"
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 mt-2"
              id="reg-submit"
            >
              {isLoading ? (
                <>
                  <span className="animate-spin inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                  Registrando...
                </>
              ) : (
                <>
                  Crear Mi Cuenta
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-outline-variant/20" />
            <span className="text-label-md text-on-surface-variant">o</span>
            <div className="flex-1 h-px bg-outline-variant/20" />
          </div>

          {/* Google OAuth */}
          <button
            className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-md bg-surface-container-lowest ghost-border hover:bg-surface-container-low transition-all duration-500 font-sans text-body-md font-medium text-on-surface"
            id="reg-google"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continuar con Google
          </button>

          {/* Note */}
          <div className="mt-6 p-4 rounded-lg bg-surface-container-low">
            <p className="text-body-sm text-on-surface-variant text-center">
              📋 Tu cuenta será revisada por la administración del club. Te
              avisaremos por WhatsApp cuando sea aprobada.
            </p>
          </div>

          {/* Login link */}
          <p className="text-center text-body-md text-on-surface-variant mt-6">
            ¿Ya tienes cuenta?{" "}
            <Link
              href="/login"
              className="text-primary font-semibold hover:underline"
            >
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
