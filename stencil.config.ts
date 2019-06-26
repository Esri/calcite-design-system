import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";

export const config: Config = {
  namespace: "calcite",
  bundles: [
    {
      components: ["calcite-switch"]
    },
    {
      components: ["calcite-config"]
    },
    {
      components: [
        "calcite-tab",
        "calcite-tab-title",
        "calcite-tab-nav",
        "calcite-tabs"
      ]
    },
    { components: ["calcite-progress"] },
    { components: ["calcite-alert", "calcite-alerts"] },
    { components: ["calcite-loader"] }
  ],
  outputTargets: [
    { type: "dist" },
    { type: "docs-readme" },
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
