import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import copy from "rollup-plugin-copy";
import postcss from "rollup-plugin-postcss";
import { defineConfig } from "rollup";

// `pnpm build` -> `production` is true
// `pnpm dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default defineConfig({
  input: "src/main.js",
  output: [{ dir: "public", format: "es" }],
  plugins: [
    resolve(), // tells Rollup how to find node_modules
    commonjs({
      // needed if you're using libraries that leverage commonjs
      exclude: ["node_modules/@esri/calcite-components/dist/custom-elements/index.js"],
    }),
    postcss({
      // allows us to import the global calcite styles
      extensions: [".css"],
    }),
    copy({
      // copy over the calcite-components assets
      targets: [
        {
          src: "./node_modules/@esri/calcite-components/dist/cdn/assets",
          dest: "./public",
        },
      ],
    }),
    production && terser(), // minify, but only in production
  ],
});
