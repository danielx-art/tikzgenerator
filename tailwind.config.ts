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

        c_base: "#f5f5f5",
        c_interact: "#3273dc",
        c_high1: "#ff817a",
        c_high2: "#e0ffff",
        c_scnd_int: "#114497",
        c_scnd: "#333333",
        c_scnd2: "#4a4a4a",
        c_discrete: "#dddddd",
        c_disabled: "#cccccc",
        c_disabled2: "#5e8edb",
        c_faded: "#9aafd0",
      },
    },
  },
  plugins: [],
} satisfies Config;
