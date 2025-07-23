// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        bg: "#fbfaf6",
        accent: "#fdd459",
        text: {
          DEFAULT: "#151515",
          light: "#f1f9ff",
        },
      },
      fontFamily: {
        syne: ["syne", "system-ui", "sans-serif"],
        styrene: ["styrene", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
