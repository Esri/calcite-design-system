import { execSync } from "child_process";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import stylelint from "stylelint";
// TODO: [MIGRATION] evaluate the usages of the key={} props - most of the time key is not necessary in Lit. See https://webgis.esri.com/arcgis-components/?path=/docs/lumina-jsx--docs#key-prop
import { defineConfig, type UserConfig } from "vite";
import { useLumina } from "@arcgis/lumina-compiler";
import { defaultExclude } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";
import { playwrightCommands as customBrowserModeCommandsPlugin } from "vitest-browser-commands";
import customElementDependenciesPlugin from "./build/plugins/custom-element-dependencies";
import removeTestDataAttr from "./build/transforms/remove-test-data-attributes";
import { version } from "./package.json";
import tailwindConfig from "./tailwind.config";

const nonEsmDependencies = ["interactjs"];
const runBrowserTests = process.env.BROWSER_TESTS === "true";

const allDirsAndFiles = "**/*";
const specAndE2EFileExtensions = `{e2e,spec}.?(c|m)[jt]s?(x)`;
const browserTestMatch = `${allDirsAndFiles}.browser.${specAndE2EFileExtensions}`;
const allSpecAndE2ETestMatch = `${allDirsAndFiles}.${specAndE2EFileExtensions}`;

// input-time-zone tests run separate from main tests due to Vitest not supporting dynamic time zone changes
const timeZoneBrowserTestMatch = `${allDirsAndFiles}.time-zone.browser.${specAndE2EFileExtensions}`;

type ComponentsViteConfigOptions = {
  puppeteerTestingEnabled?: boolean;
  test?: UserConfig["test"];
};

export function createConfig({
  puppeteerTestingEnabled = !runBrowserTests,
  test,
}: ComponentsViteConfigOptions = {}): UserConfig {
  const lumina = useLumina({
    build: {
      dependencies: {
        // Workaround for https://github.com/Esri/calcite-design-system/issues/10761
        bundleIn: nonEsmDependencies,
      },
      wrappers: [
        {
          type: "react18",
          proxiesFile: "../components-react/src/components.ts",
        },
      ],
    },
    css: {
      globalStylesPath: "src/styles/global/index.scss",
      hydratedAttribute: "calcite-hydrated",
    },
    puppeteerTesting: {
      enabled: puppeteerTestingEnabled,
      launchOptions: {
        devtools: process.env.DEVTOOLS === "true",
        headless: process.env.HEADLESS === "false" ? false : undefined,
      },
    },
    types: {
      sourceFileTransformers: [removeTestDataAttr()],
    },
  });

  return {
    build: { minify: false },
    cacheDir: runBrowserTests ? undefined : "node_modules/.vite/puppeteer",

    ssr: {
      noExternal: nonEsmDependencies,
    },

    plugins: [lumina, customBrowserModeCommandsPlugin(), customElementDependenciesPlugin(lumina)],

    css: {
      postcss: {
        plugins: [
          tailwindcss(tailwindConfig),
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

    test: test ?? {
      browser: {
        enabled: runBrowserTests,
        provider: playwright(),
        screenshotFailures: false,
        headless: process.env.HEADLESS !== "false",
        ui: false,
      },
      include: runBrowserTests ? [browserTestMatch] : [allSpecAndE2ETestMatch],
      exclude: runBrowserTests ? [...defaultExclude, timeZoneBrowserTestMatch] : [...defaultExclude, browserTestMatch],
      passWithNoTests: true,
      setupFiles: runBrowserTests ? "./src/tests/browser/setup.ts" : undefined,
    },
    /*
     * While useLumina() pre-configures everything for you, you can still
     * provide any Vite, Vitest, ESBuild or Rollup configuration option.
     * See https://vite.dev/config/
     * See https://vitest.dev/config/
     */
  };
}

export default defineConfig(() => createConfig());
