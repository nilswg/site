import type { Config } from "tailwindcss";
import defaultTheme from 'tailwindcss/defaultTheme';
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: ['class'],
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
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
        notoSansTC: ['var(--font-noto-sans-tc)', ...defaultTheme.fontFamily.sans]
      },
    },
  },
  plugins: [typography],
};
export default config;
