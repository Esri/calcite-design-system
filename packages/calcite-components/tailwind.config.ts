import type { Config } from "tailwindcss";
import calcitePreset from "@esri/calcite-tailwind-preset";

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
};

export default config;
