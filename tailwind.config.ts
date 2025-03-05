import type { Config } from "tailwindcss";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const textShadow = require("tailwindcss-textshadow");
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      textShadow: {
        sm: "1px 1px 2px rgba(0, 0, 0, 0.2)", // Small shadow
        md: "2px 2px 4px rgba(0, 0, 0, 0.3)", // Medium shadow
        lg: "3px 3px 6px rgba(0, 0, 0, 0.4)", // Large shadow
        xl: "4px 4px 8px rgba(0, 0, 0, 0.5)", // Extra large shadow
        glow: "0 0 10px rgba(255, 255, 255, 0.8)", // Glow effect
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#045857",
        primaryDark: "#045857",
        primaryLight: "#0EC9C5",
        textSecondary: "#27262C",
      },
    },
  },
  plugins: [textShadow],
} satisfies Config;
