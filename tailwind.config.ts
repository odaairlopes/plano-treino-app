import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  // "media" = segue automaticamente a preferência do sistema operacional
  darkMode: "media",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff9f4",
          100: "#d7f0e3",
          200: "#b0e1c8",
          300: "#7fcaa8",
          400: "#4fac85",
          500: "#2f8f68",
          600: "#207253",
          700: "#1b5b44",
          800: "#184937",
          900: "#153c2e",
        },
      },
      typography: ({ theme }: any) => ({
        DEFAULT: {
          css: {
            maxWidth: "none",
            img: {
              marginTop: "1.5rem",
              marginBottom: "1.5rem",
            },
          },
        },
        invert: {
          css: {
            "--tw-prose-body": theme("colors.slate[300]"),
            "--tw-prose-headings": theme("colors.slate[100]"),
            "--tw-prose-links": theme("colors.brand[300]"),
            "--tw-prose-bold": theme("colors.slate[100]"),
            "--tw-prose-bullets": theme("colors.brand[400]"),
            "--tw-prose-hr": theme("colors.slate[700]"),
            "--tw-prose-th-borders": theme("colors.slate[600]"),
            "--tw-prose-td-borders": theme("colors.slate[700]"),
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;
