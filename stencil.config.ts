import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";

export const config: Config = {
  namespace: "calcite",
  bundles: [
    { components: ["calcite-accordion", "calcite-accordion-item"] },
    { components: ["calcite-alert"] },
    { components: ["calcite-button"] },
    {
      components: [
        "calcite-date-picker",
        "calcite-date-month",
        "calcite-date-month-header",
        "calcite-date-day"
      ]
    },
    {
      components: [
        "calcite-dropdown",
        "calcite-dropdown-group",
        "calcite-dropdown-item"
      ]
    },
    { components: ["calcite-icon"] },
    { components: ["calcite-loader"] },
    { components: ["calcite-modal"] },
    { components: ["calcite-notice"] },
    { components: ["calcite-pagination"] },
    { components: ["calcite-popover"] },
    { components: ["calcite-progress"] },
    { components: ["calcite-radio-group", "calcite-radio-group-item"] },
    { components: ["calcite-slider"] },
    { components: ["calcite-switch"] },
    {
      components: [
        "calcite-tab",
        "calcite-tab-title",
        "calcite-tab-nav",
        "calcite-tabs"
      ]
    },
    { components: ["calcite-tooltip"] },
    { components: ["calcite-tree", "calcite-tree-item"] }
  ],
  outputTargets: [
    { type: "dist-hydrate-script" },
    { type: "dist" },
    { type: "docs-readme" },
    {
      type: "www",
      baseUrl: "https://stenciljs.com/",
      prerenderConfig: "./prerender.config.js",
      copy: [{ src: "demos", dest: "demos" }],
      serviceWorker: {
        unregister: true
      }
    }
  ],
  globalStyle: "src/assets/styles/includes.scss",
  plugins: [
    sass({
      injectGlobalPaths: ["src/assets/styles/includes.scss"]
    })
  ],
  testing: {
    moduleNameMapper: {
      "^/assets/(.*)$": "<rootDir>/src/tests/iconPathDataStub.js"
    }
  },
  extras: {
    appendChildSlotFix: true
  }
};
