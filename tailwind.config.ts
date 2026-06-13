import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#07111f",
          900: "#0b1b32",
          800: "#102b4a",
          700: "#16436b",
        },
        steel: "#6f7d8d",
        signal: "#f28c28",
      },
      boxShadow: {
        industrial: "0 20px 60px rgba(7, 17, 31, 0.14)",
      },
    },
  },
  plugins: [],
};

export default config;
