import { Config } from "@stencil/core";
import { postcss } from "@stencil/postcss";
import { sass } from "@stencil/sass";
import autoprefixer from "autoprefixer";
import { generatePreactTypes } from "./support/preact";

export const create: () => Config = () => ({
  buildEs5: "prod",
  namespace: "calcite",
  bundles: [
    { components: ["calcite-accordion", "calcite-accordion-item"] },
    { components: ["calcite-alert"] },
    { components: ["calcite-button"] },
    { components: ["calcite-card"] },
    { components: ["calcite-chip"] },
    { components: ["calcite-color", "calcite-color-hex-input", "calcite-color-swatch"] },
    { components: ["calcite-combobox"] },
    {
      components: ["calcite-date", "calcite-date-month", "calcite-date-month-header", "calcite-date-day"]
    },
    {
      components: ["calcite-dropdown", "calcite-dropdown-group", "calcite-dropdown-item"]
    },
    { components: ["calcite-icon"] },
    { components: ["calcite-input"] },
    { components: ["calcite-input-message"] },
    { components: ["calcite-label"] },
    { components: ["calcite-link"] },
    { components: ["calcite-loader"] },
    { components: ["calcite-modal"] },
    { components: ["calcite-notice"] },
    { components: ["calcite-pagination"] },
    { components: ["calcite-popover", "calcite-popover-manager"] },
    { components: ["calcite-progress"] },
    { components: ["calcite-radio-group", "calcite-radio-group-item"] },
    { components: ["calcite-scrim"] },
    { components: ["calcite-slider"] },
    { components: ["calcite-stepper", "calcite-stepper-item"] },
    { components: ["calcite-switch"] },
    {
      components: ["calcite-tab", "calcite-tab-title", "calcite-tab-nav", "calcite-tabs"]
    },
    { components: ["calcite-tooltip", "calcite-tooltip-manager"] },
    { components: ["calcite-tree", "calcite-tree-item"] }
  ],
  outputTargets: [
    { type: "dist-hydrate-script" },
    { type: "dist-custom-elements-bundle" },
    { type: "dist" },
    { type: "docs-readme" },
    { type: "custom", name: "preact", generator: generatePreactTypes },
    {
      type: "www",
      baseUrl: "https://stenciljs.com/",
      prerenderConfig: "./prerender.config.ts",
      copy: [
        { src: "demos", dest: "demos" },
        {
          src: "../node_modules/dedent/dist",
          dest: "vendor/dedent"
        }
      ],
      serviceWorker: {
        unregister: true
      }
    }
  ],
  globalStyle: "src/assets/styles/global.scss",
  plugins: [
    sass({
      injectGlobalPaths: ["src/assets/styles/includes.scss"]
    }),
    postcss({
      plugins: [autoprefixer()]
    })
  ],
  testing: {
    moduleNameMapper: {
      "^/assets/(.*)$": "<rootDir>/src/tests/iconPathDataStub.ts"
    },
    setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.ts"],
    testPathIgnorePatterns: [
      "src/components/calcite-action/",
      "src/components/calcite-action-bar/",
      "src/components/calcite-action-group/",
      "src/components/calcite-action-pad/",
      "src/components/calcite-block/",
      "src/components/calcite-block-section/",
      "src/components/calcite-fab/",
      "src/components/calcite-filter/",
      "src/components/calcite-flow/",
      "src/components/calcite-flow-item/",
      "src/components/calcite-handle/",
      "src/components/calcite-panel/",
      "src/components/calcite-pick-list/",
      "src/components/calcite-pick-list-group/",
      "src/components/calcite-pick-list-item/",
      "src/components/calcite-shell/",
      "src/components/calcite-shell-center-row/",
      "src/components/calcite-shell-panel/",
      "src/components/calcite-sortable-list/",
      "src/components/calcite-tip/",
      "src/components/calcite-tip-group/",
      "src/components/calcite-tip-manager/",
      "src/components/calcite-value-list/",
      "src/components/calcite-value-list-item/"
    ]
  },
  hydratedFlag: {
    selector: "attribute",
    name: "calcite-hydrated"
  },
  extras: {
    appendChildSlotFix: true,
    cssVarsShim: true,
    dynamicImportShim: true,
    safari10: true,
    scriptDataOpts: true,
    shadowDomShim: true,
    slotChildNodesFix: true
  }
});

export const config = create();
