import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";

export const config: Config = {
  namespace: "calcite",
  bundles: [
    {
      components: [
        "calcite-modal",
        "calcite-alert",
        "calcite-alert-container",
        "calcite-tabs",
        "calcite-tab",
        "calcite-tab-title",
        "calcite-tab-nav"
      ]
    }
  ],
  outputTargets: [
    { type: "dist" },
    // { type: "docs" },
    {
      type: "www",
      serviceWorker: null // disable service workers
    }
  ],
  globalStyle: "src/assets/styles/includes.scss",
  plugins: [
    sass({
      injectGlobalPaths: ["src/assets/styles/includes.scss"]
    })
  ]
};
