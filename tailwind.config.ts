import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      height: {
        128: "32rem",
        136: "34rem",
        144: "36rem",
      },
      width: {
        100: "25rem",
        102: "26rem",
        104: "27rem",
        110: "30rem",
      },
      maxWidth: {
        100: "25rem",
        102: "26rem",
        104: "27rem",
        110: "30rem",
        112: "32rem",
        114: "34rem",
      },
      colors: {
        pink: "#e3bce2",
        glow: "color-mix(in srgb, var(--glow-color) calc(<alpha-value> * 100%), transparent)",
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("glow", ".glow-capture .glow-overlay &");
    }),
    tailwindcssAnimate,
  ],
};
export default config;
