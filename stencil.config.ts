import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";

export const config: Config = {
  namespace: "calcite",
  bundles: [
    {
      components: ["calcite-switch"]
    },
    {
      components: [
        "calcite-tabs",
        "calcite-tab",
        "calcite-tab-title",
        "calcite-tab-nav"
      ]
    },
    { components: ["calcite-progress"] },
    { components: ["calcite-alerts", "calcite-alert"] },
    { components: ["calcite-loader"] }
  ],
  outputTargets: [
    { type: "dist" },
    // { type: "docs-readme" },
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
