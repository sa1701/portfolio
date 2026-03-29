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
        background: "var(--background)",
        foreground: "var(--foreground)",
        navy: {
          DEFAULT: "#0a0a1a",
          secondary: "#111128",
          light: "#1a1a35",
        },
        cyan: {
          accent: "#4fc3f7",
          dim: "rgba(79, 195, 247, 0.15)",
        },
        purple: {
          accent: "#7c4dff",
          dim: "rgba(124, 77, 255, 0.15)",
        },
        pink: {
          accent: "#f472b6",
          dim: "rgba(244, 114, 182, 0.15)",
        },
        "text-primary": "#e8e8f0",
        "text-secondary": "#9999b8",
        "glass-bg": "rgba(255, 255, 255, 0.04)",
        "glass-border": "rgba(255, 255, 255, 0.08)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      animation: {
        "gradient-shift": "gradient-shift 15s ease infinite",
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "float-slow": "float 8s ease-in-out 1s infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "glow-cyan": "0 0 20px rgba(79, 195, 247, 0.2), 0 0 60px rgba(79, 195, 247, 0.08)",
        "glow-purple": "0 0 20px rgba(124, 77, 255, 0.2), 0 0 60px rgba(124, 77, 255, 0.08)",
        "glow-pink": "0 0 20px rgba(244, 114, 182, 0.2), 0 0 60px rgba(244, 114, 182, 0.08)",
        "card-hover": "0 8px 32px rgba(79, 195, 247, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
