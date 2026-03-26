import Link from "next/link";
import { Clock, LogOut, MessageCircle } from "lucide-react";

export default function PendienteAprobacionPage() {
  return (
    <main className="min-h-screen bg-surface flex items-center justify-center px-6">
      <div className="w-full max-w-lg text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <span className="text-3xl">🐎</span>
          <span className="font-serif text-title-lg font-semibold text-primary">
            Rancho San José
          </span>
        </div>

        {/* Status card */}
        <div className="tonal-card p-10">
          {/* Animated clock */}
          <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-secondary/10 flex items-center justify-center">
            <Clock size={36} className="text-secondary" />
          </div>

          <span className="editorial-label text-secondary mb-3 block">
            Cuenta en Revisión
          </span>

          <h1 className="font-serif text-headline-md text-on-surface mb-4">
            Tu cuenta está siendo revisada
          </h1>

          <p className="text-body-lg text-on-surface-variant mb-3 max-w-sm mx-auto">
            Nuestro equipo revisará tu solicitud de registro. Este proceso puede
            tomar hasta 24 horas hábiles.
          </p>

          {/* WhatsApp notification info */}
          <div className="mt-8 p-5 rounded-lg bg-surface-container-low flex items-start gap-4 text-left">
            <MessageCircle
              size={24}
              className="text-primary flex-shrink-0 mt-0.5"
            />
            <div>
              <p className="text-body-md font-semibold text-on-surface mb-1">
                Te avisaremos por WhatsApp
              </p>
              <p className="text-body-sm text-on-surface-variant">
                Cuando tu cuenta sea aprobada, recibirás una notificación por
                WhatsApp al número que registraste. También recibirás un email
                de confirmación.
              </p>
            </div>
          </div>

          {/* Steps */}
          <div className="mt-8 space-y-4 text-left">
            <p className="editorial-label text-on-surface-variant mb-4">
              ¿Qué sigue?
            </p>
            {[
              {
                step: "1",
                text: "El admin revisará tu solicitud",
                done: false,
                active: true,
              },
              {
                step: "2",
                text: "Recibirás la aprobación por WhatsApp",
                done: false,
                active: false,
              },
              {
                step: "3",
                text: "Registra a tus hijos como alumnos",
                done: false,
                active: false,
              },
              {
                step: "4",
                text: "¡Agenda tu primera clase!",
                done: false,
                active: false,
              },
            ].map((item) => (
              <div
                key={item.step}
                className={`flex items-center gap-4 p-3 rounded-lg ${
                  item.active ? "bg-surface-container" : ""
                }`}
              >
                <span
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-label-md font-bold ${
                    item.active
                      ? "bg-secondary text-white"
                      : "bg-surface-container-high text-on-surface-variant"
                  }`}
                >
                  {item.step}
                </span>
                <span
                  className={`text-body-md ${
                    item.active
                      ? "text-on-surface font-medium"
                      : "text-on-surface-variant"
                  }`}
                >
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Logout */}
        <button
          className="mt-8 inline-flex items-center gap-2 text-body-md text-on-surface-variant hover:text-error transition-colors duration-500"
          id="logout-btn"
        >
          <LogOut size={16} />
          Cerrar sesión
        </button>
      </div>
    </main>
  );
}
