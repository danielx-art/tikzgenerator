import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        jost: ["var(--font-jost)"],
      },
      colors: {
        a_highlight: "#f6f6f3",
        a_light: "#c9c0b9",
        a_neutral: "#675f63",
        a_dark: "#675355",
        a_dark_highlight: "#806065",
        a_aux: "#a58772",
      },
    },
  },
  plugins: [],
} satisfies Config;
