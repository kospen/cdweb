import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#050505",
        textPrimary: "#FFFFFF",
        textSecondary: "#B0B0B0",
        accentRed: "#FF3F3F"
      },
      fontFamily: {
        body: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        heading: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      backgroundImage: {
        "primary-gradient": "linear-gradient(120deg, #00F2FE, #4FACFE)"
      },
      boxShadow: {
        glow: "0 0 30px rgba(79, 172, 254, 0.35)",
        redGlow: "0 0 35px rgba(255, 63, 63, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
