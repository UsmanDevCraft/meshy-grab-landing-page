import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        lime: "#C5F955",
        pink: "#FF3E8F",
        "deep-black": "#181818",
        "bg-page": "#0B0B0B",
        "bg-card": "#101010",
        "bg-elevated": "#141414",
        "border-subtle": "rgba(255, 255, 255, 0.08)",
        "border-glow": "rgba(197, 249, 85, 0.3)",
        "text-primary": "#FFFFFF",
        "text-secondary": "#A1A1AA",
        "text-muted": "#71717A",
      },
    },
  },
  plugins: [],
};

export default config;
