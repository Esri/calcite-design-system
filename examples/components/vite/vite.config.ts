import { resolve } from "node:path";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: resolve("node_modules", "@esri", "calcite-components", "dist", "calcite", "assets"),
          dest: ".",
        },
      ],
    }),
  ],
});
