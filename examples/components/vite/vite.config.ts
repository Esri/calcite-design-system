import { resolve } from "node:path";
import { defineConfig, normalizePath } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { Features } from "lightningcss";

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: normalizePath(resolve("node_modules", "@esri", "calcite-components", "dist", "cdn", "assets")),
          dest: normalizePath("."),
          rename: { stripBase: 5 },
        },
      ],
    }),
  ],
  // Preserve the light-dark() CSS function to avoid a broken LightningCSS color-scheme polyfill.
  // https://github.com/parcel-bundler/lightningcss/issues/821
  css: {
    lightningcss: {
      exclude: Features.LightDark,
    },
  },
});
