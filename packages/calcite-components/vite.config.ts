import { execSync } from "child_process";
import tailwindcss, { Config as TailwindConfig } from "tailwindcss";
import autoprefixer from "autoprefixer";
import stylelint from "stylelint";
// TODO: [MIGRATION] evaluate the usages of the key={} props - most of the time key is not necessary in Lit. See https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-jsx--docs#key-prop
import { defineConfig } from "vite";
import { useLumina } from "@arcgis/lumina-compiler";
import { version } from "./package.json";
import tailwindConfig from "./tailwind.config";

const nonEsmDependencies = ["color", "interactjs"];

export default defineConfig({
  ssr: {
    noExternal: nonEsmDependencies,
  },

  plugins: [
    useLumina({
      build: {
        cdn: {
          namespace: "calcite",
        },
        dependencies: {
          // Workaround for https://github.com/Esri/calcite-design-system/issues/10761
          bundleIn: nonEsmDependencies,
        },
        ssr: {
          stencilCompatibility: {
            enabled: true,
          },
        },
        wrappers: [
          {
            type: "react18",
            proxiesFile: "../calcite-components-react/src/components.ts",
          },
        ],
        preamble: `All material copyright ESRI, All Rights Reserved, unless otherwise specified.\nSee https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.\nv${version}`,
      },
      css: {
        globalStylesPath: "src/assets/styles/global.scss",
        hydratedAttribute: "calcite-hydrated",
      },
      puppeteerTesting: {
        enabled: true,
        waitForChangesDelay: 100,
        launchOptions: {
          devtools: process.env.DEVTOOLS === "true",
          headless: process.env.HEADLESS === "false" ? false : undefined,
        },
      },
    }),
  ],

  css: {
    preprocessorOptions: {
      scss: {
        // Add "includes.scss" import to each scss file
        additionalData(code: string, id: string) {
          const globalCss = "/src/assets/styles/includes";
          if (!id.endsWith(".scss") || id.endsWith(`${globalCss}.sass`)) {
            return undefined;
          }
          return `@import "${globalCss}";\n${code}`;
        },
        silenceDeprecations: [
          // TODO: [MIGRATION] Migrate away from deprecated SASS import syntax. See https://github.com/Esri/calcite-design-system/issues/10583
          "import",
          // TODO: [MIGRATION] Migrate away from deprecated SASS global built-ins. See https://github.com/Esri/calcite-design-system/issues/new?assignees=&labels=refactor%2C0+-+new%2Cneeds+triage&projects=&template=refactor.yml
          "global-builtin",
        ],
      },
    },
    postcss: {
      plugins: [
        tailwindcss(tailwindConfig as any as TailwindConfig),
        autoprefixer(),
        stylelint({
          configFile: ".stylelintrc-postcss.json",
          fix: true,
        }),
      ],
    },
  },

  define: {
    __CALCITE_BUILD_DATE__: JSON.stringify(new Date().toISOString().split("T")[0]),
    __CALCITE_REVISION__: JSON.stringify(execSync("git rev-parse --short HEAD", { encoding: "utf-8" }).trim()),
    __CALCITE_VERSION__: JSON.stringify(version),
  },

  test: {
    // workaround for lumina puppeteer testing issue
    browser: {
      name: "chromium",
      enabled: false,
    },
    setupFiles: ["src/tests/setupTests.ts"],
    include: ["**/*.{e2e,spec}.?(c|m)[jt]s?(x)"],
  },
  /*
   * While useLumina() pre-configures everything for you, you can still
   * provide any Vite, Vitest, ESBuild or Rollup configuration option.
   * See https://vitest.dev/config/
   */
});
