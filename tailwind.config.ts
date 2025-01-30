import type { Config } from "tailwindcss";

export default {
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
        primary: "#045857",
        primaryDark: "#045857",
        primaryLight: "#0EC9C5",
        textSecondary: "#27262C",
      },
      backgroundImage: {
        "footer-bg": "url('/assets/bg/footerBG.png')",
      },
    },
  },
  plugins: [],
} satisfies Config;
