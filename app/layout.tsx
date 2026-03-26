import type { Metadata, Viewport } from "next";
import { Noto_Serif, Manrope } from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-serif",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Club Ecuestre – Rancho San José",
  description:
    "Plataforma digital del Club Ecuestre Rancho San José. Gestión de clases, alumnos, pagos y carreras Endurance en Chile.",
  keywords: ["club ecuestre", "equitación", "Chile", "endurance", "clases equitación"],
  openGraph: {
    title: "Club Ecuestre – Rancho San José",
    description: "Gestión integral del club ecuestre más prestigioso de Chile",
    locale: "es_CL",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#154212",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${notoSerif.variable} ${manrope.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
