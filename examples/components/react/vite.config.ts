import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: resolve("node_modules", "@esri", "calcite-components", "dist", "cdn", "assets"),
          dest: ".",
        },
      ],
    }),
  ],
});
