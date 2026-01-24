import { defineConfig } from "vite";
import dts from 'vite-plugin-dts'
import packageJson from "./package.json" with { type: "json" };

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: "src/index.ts",
        utils: "src/utils.ts"
      }
    },
    rollupOptions: {
      external: ["tailwindcss"],
      output: [
        {
          entryFileNames: "[name].js",
          format: "cjs",
          banner: `/*!
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/${packageJson.version}/LICENSE.md for details.
*/`,
        }
      ]
    },
  },
  plugins: [
    dts({
      rollupTypes: true
    }),
  ],
});
