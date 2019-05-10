import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";

export const config: Config = {
  namespace: "calcite",
  outputTargets: [
    { type: "dist" },
    { type: "docs" },
    {
      type: "www",
      serviceWorker: null // disable service workers
    }
  ],
  plugins: [
    sass({
      includePaths: ["node_modules/calcite-web/lib/sass"],
      injectGlobalPaths: [
        "node_modules/calcite-web/lib/sass/calcite-web/imports.scss"
      ]
    })
  ]
};
