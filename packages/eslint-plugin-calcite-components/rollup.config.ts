import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { version } from "./package.json";

export default {
  input: "src/index.ts",
  plugins: [
    nodeResolve({
      preferBuiltins: true,
    }),
    typescript(),
  ],
  treeshake: {
    moduleSideEffects: "no-external",
  },
  external: ["stencil-eslint-core"],
  output: {
    banner: `/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/${version}/LICENSE.md for details.
*/`,
    file: "dist/index.js",
    format: "commonjs",
  },
};
