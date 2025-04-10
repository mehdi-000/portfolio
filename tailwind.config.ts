import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

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
        pink: "#5ac4db",
        violet: "#623bbb",
        turquoise: "#3d9dac",
        blue: "#6278dd",
        glow: "color-mix(in srgb, var(--glow-color) calc(<alpha-value> * 100%), transparent)",
      },
      fontFamily: {
        heebo: ["var(--font-heebo)"],
        iBMPlexSans: ["var(--font-iBMPlexSans)"],
        ubuntu: ["var(--font-ubuntu)"],
        pPMonumentExtended: ["var(--font-pPMonumentExtended-Black)"],
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("glow", ".glow-capture .glow-overlay &");
    }),
  ],
};
export default config;
