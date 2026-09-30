import { defineConfig } from "vitest/config";
import packageJson from "./package.json" with { type: "json" };

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: () => "index.js",
    },
    rollupOptions: {
      external: ["stylelint"],
      output: {
        banner: `/*!
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/${packageJson.version}/LICENSE.md for details.
*/`,
      },
    },
  },

  test: {
    testTimeout: 0,
    setupFiles: "./vitest.setup.ts",
    globals: true,
  },
});
