import { defineConfig } from "vite";
import { version } from "./package.json";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["cjs"],
      fileName: () => "index.js",
    },
    rollupOptions: {
      external: ["eslint", "@typescript-eslint/utils"],
      output: {
        banner: `/*!
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/${version}/LICENSE.md for details.
*/`,
      }
    },
  },
});
