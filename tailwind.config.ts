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
        carbon: {
          DEFAULT: "#0d0c0a",
          2: "#14120e",
        },
        ink: "#ece7dc",
        muted: "#97907f",
        line: "rgba(236, 231, 220, 0.13)",
        "line-strong": "rgba(236, 231, 220, 0.28)",
        signal: {
          DEFAULT: "#ff4d00",
          soft: "rgba(255, 77, 0, 0.12)",
        },
        ok: "#3dd68c",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
