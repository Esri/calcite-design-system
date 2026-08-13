import { resolve } from "node:path";
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    viteStaticCopy({
      targets: [
        {
          src: resolve("node_modules", "@esri", "calcite-components", "dist", "cdn", "assets"),
          dest: ".",
        },
      ],
    })
  ],
  test: {
    environment: "happy-dom",
  },
});
