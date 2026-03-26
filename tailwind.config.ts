import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ── Primary: Forest Green ── */
        primary: {
          DEFAULT: "#154212",
          container: "#2D5A27",
          fixed: "#bcf0ae",
          "fixed-dim": "#a1d494",
          on: "#ffffff",
          "on-container": "#9dd090",
        },
        /* ── Secondary: Earthy Brown ── */
        secondary: {
          DEFAULT: "#79573f",
          container: "#ffd1b3",
          fixed: "#ffdcc6",
          "fixed-dim": "#eabda0",
          on: "#ffffff",
          "on-container": "#7a5840",
        },
        /* ── Tertiary: Dark Timber ── */
        tertiary: {
          DEFAULT: "#483611",
          container: "#614d26",
          fixed: "#fcdfab",
          "fixed-dim": "#dfc392",
          on: "#ffffff",
          "on-container": "#dbbf8e",
        },
        /* ── Surface: Sand / Beige ── */
        surface: {
          DEFAULT: "#fcf9f4",
          dim: "#dcdad5",
          bright: "#fcf9f4",
          container: "#f0ede8",
          "container-low": "#f6f3ee",
          "container-lowest": "#ffffff",
          "container-high": "#ebe8e3",
          "container-highest": "#e5e2dd",
          variant: "#e5e2dd",
          tint: "#3b6934",
        },
        /* ── On Surface ── */
        "on-surface": {
          DEFAULT: "#1c1c19",
          variant: "#42493e",
        },
        /* ── Background ── */
        background: "#fcf9f4",
        "on-background": "#1c1c19",
        /* ── Inverse ── */
        "inverse-surface": "#31302d",
        "inverse-on-surface": "#f3f0eb",
        "inverse-primary": "#a1d494",
        /* ── Outline ── */
        outline: {
          DEFAULT: "#72796e",
          variant: "#c2c9bb",
        },
        /* ── Error ── */
        error: {
          DEFAULT: "#ba1a1a",
          container: "#ffdad6",
          on: "#ffffff",
          "on-container": "#93000a",
        },
      },
      fontFamily: {
        serif: ["var(--font-noto-serif)", "Noto Serif", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "Manrope", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-lg": ["3.5rem", { lineHeight: "1.12", letterSpacing: "-0.01em" }],
        "display-md": ["2.75rem", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "display-sm": ["2.25rem", { lineHeight: "1.2" }],
        "headline-lg": ["2rem", { lineHeight: "1.25" }],
        "headline-md": ["1.75rem", { lineHeight: "1.3" }],
        "headline-sm": ["1.5rem", { lineHeight: "1.35" }],
        "title-lg": ["1.375rem", { lineHeight: "1.35" }],
        "title-md": ["1.125rem", { lineHeight: "1.4", letterSpacing: "0.01em" }],
        "title-sm": ["0.875rem", { lineHeight: "1.45", letterSpacing: "0.01em" }],
        "body-lg": ["1rem", { lineHeight: "1.6" }],
        "body-md": ["0.875rem", { lineHeight: "1.55" }],
        "body-sm": ["0.75rem", { lineHeight: "1.55" }],
        "label-lg": ["0.875rem", { lineHeight: "1.4", letterSpacing: "0.03em" }],
        "label-md": ["0.75rem", { lineHeight: "1.35", letterSpacing: "0.05rem" }],
        "label-sm": ["0.6875rem", { lineHeight: "1.3", letterSpacing: "0.05rem" }],
      },
      borderRadius: {
        sm: "0.25rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.5rem",
        "2xl": "2rem",
      },
      boxShadow: {
        ambient: "0px 12px 32px rgba(28, 28, 25, 0.06)",
        "ambient-lg": "0px 20px 40px rgba(28, 28, 25, 0.08)",
        float: "0px 8px 24px rgba(28, 28, 25, 0.1)",
      },
      spacing: {
        "1": "0.25rem",
        "2": "0.4rem",
        "3": "0.7rem",
        "4": "1.1rem",
        "5": "1.4rem",
        "6": "1.75rem",
        "7": "2rem",
        "8": "2.5rem",
        "10": "3rem",
        "12": "3.5rem",
        "16": "4.5rem",
        "20": "6rem",
      },
      transitionTimingFunction: {
        equestrian: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #154212, #2D5A27)",
        "gradient-cta": "linear-gradient(135deg, #154212, #3b6934)",
      },
    },
  },
  plugins: [],
};
export default config;
