import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Brand palette (Strata Labs Brand Guide v1.0) ──────────────
        // Balance: 80 titanium/black · 15 greys · 5 orange (the spark).
        base: {
          DEFAULT: "#0A0B0D", // Near Black — primary background canvas
          900: "#0E0F12",
          800: "#141518",
          700: "#1B1D21",
          600: "#26282D",
        },
        graphite: "#5A5F66", // surfaces, dividers, muted text
        steel: "#8A8F98", // Brushed Steel — body text on dark
        titanium: "#C5C8CC", // Titanium Silver — headings, logo finish
        accent: {
          DEFAULT: "#FF6A00", // Molten Orange — primary accent (links, buttons)
          signal: "#FF8C1A", // Signal — bright accent, gradient end, hover
          ember: "#FFB266", // Ember — tints, highlights, subtle glows
        },
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "steel-sheen":
          "linear-gradient(135deg, rgba(197,200,204,0.14) 0%, rgba(138,143,152,0.04) 40%, rgba(10,11,13,0) 70%)",
        "accent-sheen":
          "linear-gradient(135deg, rgba(255,178,102,0.16) 0%, rgba(255,106,0,0.05) 45%, rgba(10,11,13,0) 72%)",
        "grid-faint":
          "linear-gradient(rgba(197,200,204,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(197,200,204,0.04) 1px, transparent 1px)",
      },
      boxShadow: {
        // Subtle orange glow — "the glow, never the surface". Use sparingly.
        accent: "0 0 0 1px rgba(255,106,0,0.4), 0 8px 30px -8px rgba(255,106,0,0.35)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        shimmer: "shimmer 2.4s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
