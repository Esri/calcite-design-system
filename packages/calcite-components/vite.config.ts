// eslint-disable-next-line @typescript-eslint/triple-slash-reference -- follows vitest doc, see https://vitest.dev/guide/#configuring-vitest
/// <reference types="vitest/config" />

import { execSync } from "child_process";
import tailwindcss, { Config as TailwindConfig } from "tailwindcss";
import autoprefixer from "autoprefixer";
import stylelint from "stylelint";
// TODO: [MIGRATION] evaluate the usages of the key={} props - most of the time key is not necessary in Lit. See https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-jsx--docs#key-prop
import { defineConfig } from "vite";
import { useLumina } from "@arcgis/lumina-compiler";
import { defaultExclude } from "vitest/config";
import { version } from "./package.json";
import tailwindConfig from "./tailwind.config";

const nonEsmDependencies = ["interactjs"];
const runBrowserTests = process.env.EXPERIMENTAL_TESTS === "true";

const allDirsAndFiles = "**/*";
const specAndE2EFileExtensions = `{e2e,spec}.?(c|m)[jt]s?(x)`;
const browserTestMatch = `${allDirsAndFiles}.browser.${specAndE2EFileExtensions}`;
const allSpecAndE2ETestMatch = `${allDirsAndFiles}.${specAndE2EFileExtensions}`;

export default defineConfig({
  build: { minify: false },
  cacheDir: runBrowserTests ? undefined : "node_modules/.vite/puppeteer",

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
        enabled: !runBrowserTests,
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
            return "";
          }
          return `@import "${globalCss}";\n${code}`;
        },
      },
    },
    postcss: {
      plugins: [
        tailwindcss(tailwindConfig as any as TailwindConfig),
        autoprefixer(),
        stylelint({
          configFile: ".stylelintrc-postcss.json",
          fix: true,
          quiet: true,
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
    browser: { enabled: runBrowserTests, name: "chromium", provider: "playwright", screenshotFailures: false },
    include: runBrowserTests ? [browserTestMatch] : [allSpecAndE2ETestMatch],
    exclude: runBrowserTests ? undefined : [...defaultExclude, browserTestMatch],
    passWithNoTests: true,
  },
  /*
   * While useLumina() pre-configures everything for you, you can still
   * provide any Vite, Vitest, ESBuild or Rollup configuration option.
   * See https://vite.dev/config/
   * See https://vitest.dev/config/
   */
});
