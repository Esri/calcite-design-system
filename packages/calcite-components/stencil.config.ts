import { execSync } from "child_process";
import { Config } from "@stencil/core";
import { postcss } from "@stencil-community/postcss";
import { sass } from "@stencil/sass";
import autoprefixer from "autoprefixer";
import { reactOutputTarget } from "@stencil/react-output-target";
import tailwindcss, { Config as TailwindConfig } from "tailwindcss";
import stylelint from "stylelint";
import replace from "@rollup/plugin-replace";
import tailwindConfig from "./tailwind.config";
import { generatePreactTypes } from "./support/preact";
import { version } from "./package.json";

export const create: () => Config = () => ({
  namespace: "calcite",
  bundles: [
    { components: ["calcite-accordion", "calcite-accordion-item"] },
    { components: ["calcite-action"] },
    { components: ["calcite-action-bar"] },
    { components: ["calcite-action-menu"] },
    { components: ["calcite-action-pad"] },
    { components: ["calcite-alert"] },
    { components: ["calcite-avatar"] },
    { components: ["calcite-block", "calcite-block-section"] },
    { components: ["calcite-button"] },
    { components: ["calcite-card"] },
    { components: ["calcite-card-group"] },
    { components: ["calcite-carousel", "calcite-carousel-item"] },
    { components: ["calcite-checkbox"] },
    { components: ["calcite-chip"] },
    { components: ["calcite-chip-group"] },
    { components: ["calcite-color-picker", "calcite-color-picker-hex-input", "calcite-color-picker-swatch"] },
    { components: ["calcite-combobox", "calcite-combobox-item-group", "calcite-combobox-item"] },
    {
      components: [
        "calcite-date-picker",
        "calcite-date-picker-day",
        "calcite-date-picker-month",
        "calcite-date-picker-month-header",
      ],
    },
    { components: ["calcite-dialog"] },
    { components: ["calcite-dropdown", "calcite-dropdown-group", "calcite-dropdown-item"] },
    { components: ["calcite-fab"] },
    { components: ["calcite-flow"] },
    { components: ["calcite-icon"] },
    { components: ["calcite-inline-editable"] },
    { components: ["calcite-input"] },
    { components: ["calcite-input-date-picker"] },
    { components: ["calcite-input-message"] },
    { components: ["calcite-input-number"] },
    { components: ["calcite-input-time-picker", "calcite-time-picker"] },
    { components: ["calcite-input-time-zone"] },
    { components: ["calcite-label"] },
    { components: ["calcite-link"] },
    { components: ["calcite-list", "calcite-list-item", "calcite-list-item-group"] },
    { components: ["calcite-loader"] },
    { components: ["calcite-meter"] },
    { components: ["calcite-modal"] },
    { components: ["calcite-navigation", "calcite-navigation-user", "calcite-navigation-logo"] },
    { components: ["calcite-menu", "calcite-menu-item"] },
    { components: ["calcite-notice"] },
    { components: ["calcite-pagination"] },
    { components: ["calcite-panel"] },
    { components: ["calcite-popover"] },
    { components: ["calcite-progress"] },
    { components: ["calcite-radio-button"] },
    { components: ["calcite-radio-button-group"] },
    { components: ["calcite-rating"] },
    { components: ["calcite-scrim"] },
    { components: ["calcite-segmented-control", "calcite-segmented-control-item"] },
    { components: ["calcite-select", "calcite-option", "calcite-option-group"] },
    { components: ["calcite-sheet"] },
    { components: ["calcite-shell", "calcite-shell-center-row", "calcite-shell-panel"] },
    { components: ["calcite-slider", "calcite-graph"] },
    { components: ["calcite-sortable-list"] },
    { components: ["calcite-split-button"] },
    { components: ["calcite-stack"] },
    { components: ["calcite-stepper", "calcite-stepper-item"] },
    { components: ["calcite-switch"] },
    { components: ["calcite-tab", "calcite-tab-title", "calcite-tab-nav", "calcite-tabs"] },
    { components: ["calcite-text-area"] },
    { components: ["calcite-tile"] },
    { components: ["calcite-tile-group"] },
    { components: ["calcite-tile-select-group", "calcite-tile-select"] },
    { components: ["calcite-tip", "calcite-tip-group", "calcite-tip-manager"] },
    { components: ["calcite-tooltip"] },
    { components: ["calcite-tree", "calcite-tree-item"] },
  ],
  outputTargets: [
    reactOutputTarget({
      componentCorePackage: "@esri/calcite-components",
      proxiesFile: "../calcite-components-react/src/components.ts",
      excludeComponents: ["context-consumer"],
      customElementsDir: "dist/components",
    }),
    { type: "dist-hydrate-script" },
    { type: "dist-custom-elements", customElementsExportBehavior: "auto-define-custom-elements" },
    { type: "dist" },
    { type: "docs-readme" },
    { type: "docs-json", file: "./dist/extras/docs-json.json" },
    {
      type: "docs-vscode",
      file: "./dist/extras/vscode-data.json",
    },
    { type: "custom", name: "preact", generator: generatePreactTypes },
    {
      type: "www",
      baseUrl: "https://stenciljs.com/",
      prerenderConfig: "./prerender.config.ts",
      copy: [
        { src: "demos", dest: "demos" },
        { src: "robots.txt", dest: "robots.txt" },
      ],
      serviceWorker: {
        unregister: true,
      },
    },
  ],
  globalStyle: "src/assets/styles/global.scss",
  globalScript: "src/utils/globalScript.ts",
  plugins: [
    sass({
      injectGlobalPaths: ["src/assets/styles/includes.scss"],
    }),
    postcss({
      plugins: [
        tailwindcss(tailwindConfig as any as TailwindConfig),
        autoprefixer(),
        stylelint({
          configFile: ".stylelintrc-postcss.json",
          fix: true,
        }),
      ],
    }),
  ],
  rollupPlugins: {
    before: [
      replace({
        values: {
          __CALCITE_BUILD_DATE__: () => new Date().toISOString().split("T")[0],
          __CALCITE_REVISION__: execSync("git rev-parse --short HEAD", { encoding: "utf-8" }).trim(),
          __CALCITE_VERSION__: version,
        },
        include: ["src/utils/config.ts"],
        preventAssignment: true,
      }),
    ],
  },
  testing: {
    watchPathIgnorePatterns: ["<rootDir>/../../node_modules", "<rootDir>/dist", "<rootDir>/www", "<rootDir>/hydrate"],
    moduleNameMapper: {
      "^lodash-es$": "lodash",
    },
    setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.ts"],
    transform: {
      "calcite-design-tokens/dist/es6/.*\\.js$":
        "<rootDir>../../node_modules/@stencil/core/testing/jest-preprocessor.js",
    },
  },
  hydratedFlag: {
    selector: "attribute",
    name: "calcite-hydrated",
  },
  preamble: `All material copyright ESRI, All Rights Reserved, unless otherwise specified.\nSee https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.\nv${version}`,
  extras: {
    enableImportInjection: true,
    scriptDataOpts: true,
  },
});

export const config = create();
