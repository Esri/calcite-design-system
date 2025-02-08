import tailwindcss, { Config as TailwindConfig } from "tailwindcss";
import autoprefixer from "autoprefixer";
import stylelint from "stylelint";
import { defineConfig } from "vite";
import { useLumina } from "@arcgis/lumina-compiler";
import tailwindConfig from "./tailwind.config";

export default defineConfig({
  optimizeDeps: {
    disabled: true,
    noDiscovery: true,
  },
  plugins: [
    useLumina({
      css: {
        globalStylesPath: "src/assets/styles/global.scss",
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
});
