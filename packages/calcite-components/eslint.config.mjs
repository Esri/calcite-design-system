import calciteCoreConfig from "@esri/eslint-config-calcite/core.js";
import calciteJsxConfig from "@esri/eslint-config-calcite/jsx.js";
import calcitePlugin from "@esri/eslint-plugin-calcite-components";
import vitestPlugin from "@vitest/eslint-plugin";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["**/dist", "**/docs", "**/hydrate", "**/*.d.ts"],
  },

  {
    extends: [calciteCoreConfig, calciteJsxConfig],
    plugins: {
      "@esri/calcite-components": calcitePlugin,
    },

    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        project: ["tsconfig-eslint.json"],
      },
    },

    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["tests/commonTests/*"],
              message:
                "Import named functions from commonTests instead of direct module imports, e.g., import { disabled } from 'tests/commonTests'",
            },
          ],
        },
      ],

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
