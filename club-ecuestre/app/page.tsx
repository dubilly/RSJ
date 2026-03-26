import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Calendar,
  Users,
  Trophy,
  ChevronDown,
  Phone,
  Mail,
} from "lucide-react";

/* ── Mock data for the next Endurance race ── */
const proximaCarrera = {
  nombre: "Endurance Valle de Colchagua",
  fecha: "26 de Abril, 2026",
  ubicacion: "Hacienda El Huique, O'Higgins",
  region: "O'Higgins",
  dias_restantes: 31,
};

export default function Home() {
  return (
    <main className="min-h-screen bg-surface">
      {/* ── Navigation ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-2xl">🐎</span>
            <div>
              <span className="font-serif text-title-md font-semibold text-primary">
                Rancho San José
              </span>
              <span className="block text-label-sm editorial-label text-on-surface-variant">
                Club Ecuestre
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#sobre"
              className="text-body-md text-on-surface-variant hover:text-primary transition-colors duration-500"
            >
              Sobre Nosotros
            </Link>
            <Link
              href="#carreras"
              className="text-body-md text-on-surface-variant hover:text-primary transition-colors duration-500"
            >
              Carreras
            </Link>
            <Link
              href="#contacto"
              className="text-body-md text-on-surface-variant hover:text-primary transition-colors duration-500"
            >
              Contacto
            </Link>
            <Link href="/login" className="btn-secondary text-body-md">
              Iniciar Sesión
            </Link>
            <Link href="/registro" className="btn-primary text-body-md">
              Registrarse
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-on-surface-variant"
            aria-label="Abrir menú"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative h-screen min-h-[700px] flex items-end overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero.png"
            alt="Jinete cabalgando en los campos de Chile con la Cordillera de los Andes de fondo"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          {/* Gradient overlays for editorial look */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#154212]/80 via-[#154212]/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#154212]/50 via-transparent to-transparent" />
        </div>

        {/* Hero content – asymmetric, left-aligned */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 md:pb-28 w-full">
          <div className="max-w-2xl animate-slide-up">
            {/* Editorial label */}
            <span className="inline-block mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-label-md tracking-widest uppercase">
              Club Ecuestre · Chile
            </span>

            <h1 className="font-serif text-display-lg md:text-[4.5rem] text-white leading-[1.05] mb-6">
              La tradición<br />
              <span className="text-primary-fixed-dim" style={{ color: "#a1d494" }}>
                ecuestre
              </span>{" "}
              chilena
            </h1>

            <p className="text-body-lg md:text-title-md text-white/80 mb-10 max-w-lg leading-relaxed font-sans">
              Formamos jinetes con pasión, disciplina y respeto por el caballo.
              Desde clases personalizadas hasta competencias de Endurance a nivel
              nacional.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/registro"
                className="btn-primary inline-flex items-center gap-2 justify-center text-body-lg"
              >
                Únete al Club
                <ArrowRight size={18} />
              </Link>
              <a
                href="#carreras"
                className="inline-flex items-center gap-2 justify-center px-8 py-3.5 rounded-md bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 transition-all duration-500 font-sans font-semibold text-body-md"
              >
                Ver Próxima Carrera
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <ChevronDown className="text-white/50" size={28} />
        </div>
      </section>

      {/* ── Quick Stats Strip ── */}
      <section className="relative z-20 -mt-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 bg-surface-container-lowest rounded-xl shadow-ambient overflow-hidden">
            {[
              { value: "10+", label: "Años de experiencia", icon: Trophy },
              { value: "50+", label: "Alumnos activos", icon: Users },
              { value: "8", label: "Caballos entrenados", icon: "🐎" },
              { value: "12", label: "Carreras al año", icon: Calendar },
            ].map((stat, i) => (
              <div
                key={i}
                className={`flex flex-col items-center text-center py-7 px-4 ${
                  i > 0 ? "border-l border-outline-variant/10" : ""
                }`}
                style={{
                  animationDelay: `${i * 100}ms`,
                }}
              >
                <span className="text-2xl mb-2">
                  {typeof stat.icon === "string" ? (
                    stat.icon
                  ) : (
                    <stat.icon size={24} className="text-primary" />
                  )}
                </span>
                <span className="font-serif text-headline-md text-primary font-bold">
                  {stat.value}
                </span>
                <span className="editorial-label mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About Section ── */}
      <section id="sobre" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left: Text – editorial asymmetry */}
            <div>
              <span className="editorial-label text-secondary mb-4 block">
                Sobre Nosotros
              </span>
              <h2 className="font-serif text-display-sm md:text-display-md text-on-surface mb-8 leading-tight">
                Donde la pasión por los{" "}
                <span className="text-primary">caballos</span> se vive
              </h2>
              <p className="text-body-lg text-on-surface-variant mb-6 leading-relaxed">
                En Rancho San José formamos jinetes desde el nivel inicial hasta
                competidores de Endurance. Nuestro enfoque combina la tradición
                ecuestre chilena con métodos modernos de entrenamiento, siempre
                priorizando el bienestar del caballo y el disfrute del alumno.
              </p>
              <p className="text-body-lg text-on-surface-variant mb-8 leading-relaxed">
                Ofrecemos clases grupales e individuales con profesores
                especializados, en un ambiente cálido y familiar donde cada
                alumno recibe atención personalizada.
              </p>

              <div className="flex flex-wrap gap-3">
                {[
                  "Clases Grupales",
                  "Clases Individuales",
                  "Endurance",
                  "Doma",
                ].map((tag) => (
                  <span key={tag} className="chip">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Feature cards stacked */}
            <div className="flex flex-col gap-5">
              {[
                {
                  emoji: "🐎",
                  title: "Caballos de Primer Nivel",
                  desc: "8 caballos entrenados para distintos niveles, desde principiantes hasta avanzados.",
                },
                {
                  emoji: "👩‍🏫",
                  title: "Profesores Certificados",
                  desc: "Equipo de docentes con años de experiencia en formación ecuestre y competencias.",
                },
                {
                  emoji: "🏇",
                  title: "Competencias Endurance",
                  desc: "Participamos en carreras a lo largo de todo Chile, desde Atacama hasta Los Lagos.",
                },
                {
                  emoji: "📱",
                  title: "Gestión Digital",
                  desc: "Agenda clases, realiza pagos y recibe notificaciones por WhatsApp desde tu celular.",
                },
              ].map((feat, i) => (
                <div
                  key={i}
                  className="tonal-card p-6 flex gap-5 items-start"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <span className="text-3xl flex-shrink-0">{feat.emoji}</span>
                  <div>
                    <h3 className="font-serif text-title-md font-semibold text-on-surface mb-1">
                      {feat.title}
                    </h3>
                    <p className="text-body-md text-on-surface-variant leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Next Race / Endurance Section ── */}
      <section id="carreras" className="section-shift-high py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="editorial-label text-secondary mb-4 block">
              Carreras Endurance
            </span>
            <h2 className="font-serif text-display-sm md:text-display-md text-on-surface mb-4">
              Próxima Competencia
            </h2>
            <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Participa en las mejores carreras de Endurance a lo largo de Chile
            </p>
          </div>

          {/* Featured Race Card */}
          <div className="max-w-3xl mx-auto">
            <div className="tonal-card overflow-hidden">
              {/* Race header with gradient */}
              <div className="bg-gradient-primary p-8 md:p-10 text-white">
                <span className="inline-block mb-3 px-3 py-1 rounded-full bg-white/15 text-label-md tracking-widest uppercase backdrop-blur-sm">
                  {proximaCarrera.dias_restantes} días restantes
                </span>
                <h3 className="font-serif text-headline-lg md:text-display-sm mb-2">
                  {proximaCarrera.nombre}
                </h3>
                <div className="flex flex-wrap gap-6 mt-4 text-body-md text-white/80">
                  <span className="flex items-center gap-2">
                    <Calendar size={16} />
                    {proximaCarrera.fecha}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin size={16} />
                    {proximaCarrera.ubicacion}
                  </span>
                </div>
              </div>

              {/* Race details */}
              <div className="p-8 md:p-10">
                <div className="grid grid-cols-3 gap-6 mb-8">
                  {[
                    { label: "Camión", precio: "$80.000", icon: "🚛" },
                    { label: "Acompañante", precio: "$50.000", icon: "👤" },
                    { label: "Peticero", precio: "$40.000", icon: "🐴" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="text-center p-4 rounded-lg bg-surface-container-low"
                    >
                      <span className="text-2xl block mb-2">{item.icon}</span>
                      <span className="block font-serif text-title-md font-bold text-on-surface">
                        {item.precio}
                      </span>
                      <span className="editorial-label mt-1 block">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <p className="text-body-md text-on-surface-variant mb-6">
                    Inscríbete en la plataforma para asegurar tu lugar
                  </p>
                  <Link
                    href="/registro"
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    Inscribir a mi hijo
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="rounded-xl overflow-hidden bg-surface-container-low h-[300px] flex items-center justify-center">
              <div className="text-center">
                <MapPin
                  size={40}
                  className="text-primary mx-auto mb-3 opacity-50"
                />
                <p className="editorial-label">
                  Mapa interactivo de carreras próximamente
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing Section ── */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="editorial-label text-secondary mb-4 block">
              Nuestras Clases
            </span>
            <h2 className="font-serif text-display-sm md:text-display-md text-on-surface mb-4">
              Planes de Entrenamiento
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Grupal */}
            <div className="tonal-card p-8 text-center">
              <span className="text-4xl block mb-4">👥</span>
              <span className="editorial-label text-secondary mb-2 block">
                Clase Grupal
              </span>
              <h3 className="font-serif text-display-sm text-on-surface mb-2">
                $30.000
              </h3>
              <p className="editorial-label mb-6">CLP / clase</p>
              <ul className="text-body-md text-on-surface-variant space-y-3 mb-8 text-left">
                <li className="flex gap-3">
                  <span className="text-primary">✓</span>
                  Hasta 6 alumnos por clase
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">✓</span>
                  1 hora de duración
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">✓</span>
                  Ideal para socializar
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">✓</span>
                  Todos los niveles
                </li>
              </ul>
              <Link href="/registro" className="btn-secondary w-full block text-center">
                Comenzar
              </Link>
            </div>

            {/* Individual */}
            <div className="relative overflow-hidden tonal-card p-8 text-center ring-2 ring-primary/20">
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-primary text-white text-label-sm">
                Recomendado
              </div>
              <span className="text-4xl block mb-4">👤</span>
              <span className="editorial-label text-secondary mb-2 block">
                Clase Individual
              </span>
              <h3 className="font-serif text-display-sm text-on-surface mb-2">
                $45.000
              </h3>
              <p className="editorial-label mb-6">CLP / clase</p>
              <ul className="text-body-md text-on-surface-variant space-y-3 mb-8 text-left">
                <li className="flex gap-3">
                  <span className="text-primary">✓</span>
                  Atención personalizada
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">✓</span>
                  1 hora de duración
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">✓</span>
                  Avance acelerado
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">✓</span>
                  Preparación para competencias
                </li>
              </ul>
              <Link href="/registro" className="btn-primary w-full block text-center">
                Comenzar
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="bg-gradient-primary py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="inline-block mb-6 px-4 py-2 rounded-full bg-white/10 text-white text-label-md tracking-widest uppercase">
            ¿Listo para empezar?
          </span>
          <h2 className="font-serif text-display-sm md:text-display-md text-white mb-6">
            Únete al Club Ecuestre<br />Rancho San José
          </h2>
          <p className="text-body-lg text-white/80 mb-10 max-w-xl mx-auto">
            Registra tu cuenta, inscribe a tus hijos y agenda tu primera clase.
            Todo digital, todo simple.
          </p>
          <Link
            href="/registro"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-md bg-white text-primary font-semibold text-body-lg hover:bg-white/90 transition-all duration-500 shadow-ambient-lg hover:shadow-float"
          >
            Crear Mi Cuenta
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer id="contacto" className="section-shift-high py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🐎</span>
                <span className="font-serif text-title-md font-semibold text-primary">
                  Rancho San José
                </span>
              </div>
              <p className="text-body-md text-on-surface-variant">
                Club ecuestre formando jinetes con pasión, disciplina y respeto
                por la tradición ecuestre chilena.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="editorial-label text-on-surface mb-4">
                Navegación
              </h4>
              <ul className="space-y-3">
                {["Sobre Nosotros", "Carreras", "Clases", "Contacto"].map(
                  (link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="text-body-md text-on-surface-variant hover:text-primary transition-colors duration-500"
                      >
                        {link}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="editorial-label text-on-surface mb-4">
                Contacto
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-body-md text-on-surface-variant">
                  <Phone size={16} className="text-primary" />
                  +56 9 1234 5678
                </li>
                <li className="flex items-center gap-3 text-body-md text-on-surface-variant">
                  <Mail size={16} className="text-primary" />
                  contacto@ranchosanjose.cl
                </li>
                <li className="flex items-center gap-3 text-body-md text-on-surface-variant">
                  <MapPin size={16} className="text-primary" />
                  Chile
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 text-center" style={{ borderTop: '1px solid var(--ghost-border)' }}>
            <p className="text-body-sm text-on-surface-variant">
              © 2026 Club Ecuestre Rancho San José. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
