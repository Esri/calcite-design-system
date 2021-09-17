import { Config } from "@stencil/core";
import { postcss } from "@stencil/postcss";
import { sass } from "@stencil/sass";
import babel from "@rollup/plugin-babel";
import autoprefixer from "autoprefixer";
import tailwind from "tailwindcss";
import { generatePreactTypes } from "./support/preact";

export const create: () => Config = () => ({
  buildEs5: "prod",
  namespace: "calcite",
  bundles: [
    { components: ["calcite-popover", "calcite-popover-manager"] },
    { components: ["calcite-tooltip", "calcite-tooltip-manager"] }
  ],
  outputTargets: [
    { type: "dist-hydrate-script" },
    { type: "dist-custom-elements-bundle" },
    { type: "dist" },
    { type: "docs-readme" },
    { type: "docs-json", file: "./dist/extras/docs-json.json" },
    { type: "custom", name: "preact", generator: generatePreactTypes },
    {
      type: "www",
      baseUrl: "https://stenciljs.com/",
      prerenderConfig: "./prerender.config.ts",
      copy: [
        { src: "demos", dest: "demos" },
        { src: "robots.txt", dest: "robots.txt" }
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
      plugins: [tailwind(), autoprefixer()]
    })
  ],
  rollupPlugins: {
    after: [
      babel({
        babelHelpers: "bundled",
        include: [/\/color\//],
        plugins: ["@babel/plugin-proposal-numeric-separator"]
      })
    ]
  },
  testing: {
    moduleNameMapper: {
      "^/assets/(.*)$": "<rootDir>/src/tests/iconPathDataStub.ts"
    },
    setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.ts"]
  },
  hydratedFlag: {
    selector: "attribute",
    name: "calcite-hydrated"
  },
  extras: {
    scriptDataOpts: true
  }
});

export const config = create();
