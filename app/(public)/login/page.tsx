"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Integrate with Supabase Auth
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <main className="min-h-screen bg-surface flex">
      {/* Left: Decorative — hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-primary items-end p-12">
        {/* Decorative elements */}
        <div className="absolute top-12 left-12 flex items-center gap-3">
          <span className="text-3xl">🐎</span>
          <span className="font-serif text-title-lg text-white font-semibold">
            Rancho San José
          </span>
        </div>

        {/* Decorative circles */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full border border-white/10" />
        <div className="absolute top-1/3 right-1/3 w-96 h-96 rounded-full border border-white/5" />

        <div className="relative z-10 max-w-md">
          <h2 className="font-serif text-display-sm text-white mb-4 leading-tight">
            Bienvenido a tu club ecuestre digital
          </h2>
          <p className="text-body-lg text-white/70">
            Gestiona clases, realiza pagos y mantente informado sobre las
            próximas carreras de Endurance, todo en un solo lugar.
          </p>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <span className="text-3xl">🐎</span>
            <div>
              <span className="font-serif text-title-lg font-semibold text-primary block">
                Rancho San José
              </span>
              <span className="editorial-label">Club Ecuestre</span>
            </div>
          </div>

          <div className="mb-10">
            <span className="editorial-label text-secondary mb-3 block">
              Iniciar Sesión
            </span>
            <h1 className="font-serif text-headline-lg text-on-surface mb-2">
              Accede a tu cuenta
            </h1>
            <p className="text-body-md text-on-surface-variant">
              Ingresa tus credenciales para continuar
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="editorial-label mb-2 block">
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
                  id="login-email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="editorial-label mb-2 block">Contraseña</label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/50"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="editorial-input pl-11 pr-11"
                  required
                  id="login-password"
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
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60"
              id="login-submit"
            >
              {isLoading ? (
                <>
                  <span className="animate-spin inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                  Iniciando sesión...
                </>
              ) : (
                <>
                  Iniciar Sesión
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-outline-variant/20" />
            <span className="text-label-md text-on-surface-variant">o</span>
            <div className="flex-1 h-px bg-outline-variant/20" />
          </div>

          {/* Google OAuth */}
          <button
            className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-md bg-surface-container-lowest ghost-border hover:bg-surface-container-low transition-all duration-500 font-sans text-body-md font-medium text-on-surface"
            id="login-google"
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

          {/* Register link */}
          <p className="text-center text-body-md text-on-surface-variant mt-8">
            ¿No tienes cuenta?{" "}
            <Link
              href="/registro"
              className="text-primary font-semibold hover:underline"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
