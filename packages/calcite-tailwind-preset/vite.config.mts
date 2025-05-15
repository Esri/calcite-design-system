import { defineConfig } from "vite";
import dts from 'vite-plugin-dts'
import packageJson from "./package.json" with { type: "json" };

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["cjs"],
      fileName: () => "index.js",
    },
    rollupOptions: {
      external: ["tailwindcss"],
      output: {
        banner: `/*!
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/${packageJson.version}/LICENSE.md for details.
*/`,
      }
    },
  },
  plugins: [
    dts({
      rollupTypes: true
    }),
  ],
});
