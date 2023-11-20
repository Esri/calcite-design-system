import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

import { CalciteTokenTransformConfig } from "../support/types/config.js";
import { Platform } from "../support/types/platform.js";
import { globalTokens, coreTokens } from "./index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const config: CalciteTokenTransformConfig = {
  files: [coreTokens, globalTokens],
  options: {
    prefix: "calcite",
  },
  output: {
    dir: resolve(__dirname, "../dist"),
    platforms: [Platform.SCSS, Platform.CSS, Platform.JS, Platform.ES6],
    expandFiles: {
      css: {
        typography: "classes.css",
        colorScheme: { light: "light.css", dark: "dark.css" },
        breakpoint: "breakpoint.css",
        index: {
          name: "index.css",
          import: ["./global.css", "./classes.css"],
          media: [
            ["prefers-color-scheme: light", "light"],
            ["prefers-color-scheme: dark", "dark"],
          ],
          class: [
            ["calcite-mode-light", "light"],
            ["calcite-mode-dark", "dark"],
          ],
        },
      },
      scss: {
        typography: "mixins.scss",
        colorScheme: { light: "light.scss", dark: "dark.scss" },
        breakpoint: "breakpoints.scss",
        index: {
          name: "index.scss",
          import: ["./global.scss", "./breakpoints.scss", "./mixins.scss"],
          mixin: [
            ["calcite-mode-light", "light"],
            ["calcite-mode-dark", "dark"],
          ],
        },
      },
      js: {
        breakpoint: "breakpoints.js",
        index: {
          name: "index.js",
          export: ["./global.js", "./breakpoints.js"],
        },
      },
    },
  },
};

export default config;
