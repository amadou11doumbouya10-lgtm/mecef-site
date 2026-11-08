import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: "#F0B429",
        sky: "#3F93D6",
        leaf: "#63AB42",
        charcoal: {
          DEFAULT: "#181A1B",
          card: "#212325",
          border: "#2C2E2F",
          // Texte courant sur les sections crème (contraste ≈ 10:1 sur cream).
          muted: "#3A3B3C",
        },
        cream: {
          DEFAULT: "#F3EFE7",
          // Filets et séparateurs sur les sections crème.
          border: "#D8D2C6",
        },
        warmgray: {
          DEFAULT: "#9C9A94",
          light: "#8A8985",
          dark: "#6E6C67",
        },
      },
      // Entrée en cascade du texte du hero (classe animate-fade-up + [animation-delay:…]).
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) both",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
