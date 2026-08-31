import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        laterite: "#D9622B",
        charcoal: {
          DEFAULT: "#181A1B",
          card: "#212325",
          border: "#2C2E2F",
        },
        cream: "#F3EFE7",
        warmgray: {
          DEFAULT: "#9C9A94",
          light: "#8A8985",
          dark: "#6E6C67",
        },
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
