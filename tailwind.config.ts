import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: colors.pink[500],
        secondary: colors.yellow[300],
      },
      backdropBlur: {
        xs: "2px",
      },
      screens: {
        "3xl": "1920px",
        "4xl": "2560px",
      },
    },
  },
} satisfies Config;
