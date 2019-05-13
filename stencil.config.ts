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
  globalStyle: "src/assets/styles/includes.scss",
  plugins: [
    sass({
      injectGlobalPaths: [
        "node_modules/calcite-fonts/fonts.scss",
        "node_modules/@esri/calcite-colors/colors.scss",
        "node_modules/@esri/calcite-base/dist/_index.scss"
      ]
    })
  ]
};
