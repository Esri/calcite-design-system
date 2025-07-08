import calciteCoreConfig from "@esri/eslint-config-calcite/core.js";
import calciteJsxConfig from "@esri/eslint-config-calcite/jsx.js";
import calcitePlugin from "@esri/eslint-plugin-calcite-components";
import vitestPlugin from "@vitest/eslint-plugin";
import globals from "globals";
import tseslint from "typescript-eslint";
import unusedImports from "eslint-plugin-unused-imports";
import luminaPlugin from "@arcgis/eslint-config/plugins/lumina";

export default tseslint.config(
  {
    ignores: ["**/dist", "**/docs", "**/hydrate", "**/*.d.ts"],
  },

  {
    extends: [calciteCoreConfig, calciteJsxConfig],
    plugins: {
      "@esri/calcite-components": calcitePlugin,
      "unused-imports": unusedImports,
      lumina: luminaPlugin,
    },

    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        project: ["tsconfig-eslint.json"],
      },
    },

    rules: {
      "lumina/member-ordering": "warn",

      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["tests/commonTests/*"],
              message:
                "Import named functions from commonTests instead of direct module imports, e.g., import { disabled } from 'tests/commonTests'",
            },
            {
              group: ["tests/commonTests/browser/*"],
              message:
                "Import named functions from commonTests/browser for browser mode (experimental) tests instead of direct module imports, e.g., import { cancelable } from 'tests/commonTests/browser'",
            },
          ],
        },
      ],
      "no-restricted-properties": [
        "error",
        {
          property: "findAll",
          message: "Use custom findAll test util for more predictable (non-empty) result usage.",
        },
        {
          property: "waitForEvent",
          message: "Use spyOnEvent and await on its next property instead for more reliable async event handling.",
        },
        {
          object: "*",
          property: "cancel",
          message:
            "Use the useCancelable controller utility instead of calling .cancel directly. Register resources with .add for consistent cleanup.",
        },
      ],

      "unused-imports/no-unused-imports": "error",

      "@esri/calcite-components/no-dynamic-createelement": "warn",
      "@esri/calcite-components/strict-boolean-attributes": "error",
      "@esri/calcite-components/ban-events": [
        "warn",
        {
          event: "keyup",
          message: "Use keydown instead for consistent interaction behavior (e.g., closing, moving focus, etc.).",
        },
        {
          event: "keypress",
          message: "Use keydown instead for consistent interaction behavior (e.g., closing, moving focus, etc.).",
        },
      ],
    },
  },

  {
    files: ["**/*.{e2e,spec}.ts", "src/tests/**/*"],
    extends: [vitestPlugin.configs.recommended],
    settings: {
      vitest: {
        typecheck: true,
      },
    },
    rules: {
      "vitest/expect-expect": "off",
      "@esri/calcite-components/no-dynamic-createelement": "off",
    },
    languageOptions: {
      globals: {
        ...globals.builtin,
        ...globals.browser,
        ...vitestPlugin.environments?.env.globals,
      },
    },
  },
);
