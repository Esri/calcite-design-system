import type { Config } from "tailwindcss";
import calcitePreset from "@esri/calcite-tailwind-preset";
import { invert } from "@esri/calcite-tailwind-preset/dist/utils";
import plugin from "tailwindcss/plugin";

const config: Config = {
  presets: [calcitePreset],
  content: ["./src/components/**/*.scss"],
  theme: {
    extend: {
      animation: {
        in: "in var(--calcite-internal-animation-timing-slow) ease-in-out",
        "in-down": "in-down var(--calcite-internal-animation-timing-slow) ease-in-out",
        "in-up": "in-up var(--calcite-internal-animation-timing-slow) ease-in-out",
        "in-scale": "in-scale var(--calcite-internal-animation-timing-slow) linear",
      },
      transitionDuration: {
        DEFAULT: "var(--calcite-animation-timing)",
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        // we override preset focus utils to allow using the internal focus color
        ".focus-base": {
          outline: "2px solid",
          "outline-color": "transparent",
          "outline-offset": invert("2px", "--calcite-offset-invert-focus"),
        },
        ".focus-normal": {
          "outline-color": " var(--calcite-internal-color-focus)",
        },
        ".focus-outset": {
          "outline-color": " var(--calcite-internal-color-focus)",
        },
        ".focus-inset": {
          "outline-color": " var(--calcite-internal-color-focus)",
        },
      });
    }),
  ],
};

export default config;
