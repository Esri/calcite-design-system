import tailwindcss, { Config as TailwindConfig } from "tailwindcss";
import autoprefixer from "autoprefixer";
import stylelint from "stylelint";
// TODO: [MIGRATION] review configuration documentation: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-build--docs
// TODO: [MIGRATION] For an equivalent of Stencil's globalScript option, simply add the global code to src/runtime.ts file. Such code will execute before any component code
// TODO: [MIGRATION] Lumina will output everything into the dist/ directory. If any of your configs or scripts are mentioning www/ or .docs/ directories, you should update them
// TODO: [MIGRATION] the main /index.html file is now in the package root. Also, you do not need any script or link tags in index.html files - they are added automatically by the dev server. And, you can import type script files in index.html. Please copy the content of your /src/index.html into /index.html. Vite also allows multiple index.html files
// TODO: [MIGRATION] evaluate the usages of the key={} props - most of the time key is not necessary in Lit. See https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-jsx--docs#key-prop
// TODO: [MIGRATION] codemod begun configuring Lit react wrappers, but you will have to finish updating the package.json, readme and other files in the wrapper. see docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-build--docs#buildwrappers
import { defineConfig } from "vite";
import { useLumina } from "@arcgis/lumina-compiler";
import tailwindConfig from "./tailwind.config";

export default defineConfig({
  plugins: [
    useLumina({
      build: {
        cdn: {
          namespace: "calcite",
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
        additionalData(code, id) {
          const globalCss = "/src/assets/styles/includes";
          if (!id.endsWith(".scss") || id.endsWith(`${globalCss}.sass`)) {
            return undefined;
          }
          return `@import "${globalCss}";\n${code}`;
        },
        silenceDeprecations: ["import", "global-builtin"],
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
  test: {
    setupFiles: ["src/tests/setupTests.ts"],
    include: ["**/*.{e2e,spec}.?(c|m)[jt]s?(x)"],
  },
  /*
   * While useLumina() pre-configures everything for you, you can still
   * provide any Vite, Vitest, ESBuild or Rollup configuration option. See:
   * - https://vitejs.dev/config/
   * - https://vitest.dev/config/
   */
});
