import calciteCoreConfig from "@esri/eslint-config-calcite/core.js";
import calciteJsxConfig from "@esri/eslint-config-calcite/jsx.js";
import calcitePlugin from "@esri/eslint-plugin-calcite-components";
import vitestPlugin from "@vitest/eslint-plugin";
import globals from "globals";
import tseslint from "typescript-eslint";
import unusedImports from "eslint-plugin-unused-imports";
import { luminaPlugin } from "@arcgis/eslint-config/plugins/lumina";
import unicornPlugin from "eslint-plugin-unicorn";
import storybookPlugin from "eslint-plugin-storybook";

export default tseslint.config(
  {
    ignores: ["**/dist", "**/docs", "**/*.d.ts"],
  },

  {
    extends: [calciteCoreConfig, calciteJsxConfig],
    plugins: {
      "@esri/calcite-components": calcitePlugin,
      "unused-imports": unusedImports,
      lumina: luminaPlugin,
    },

    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      parser: tseslint.parser,
      parserOptions: {
        jsxFragmentName: "Fragment",
        jsxPragma: "h",
        tsconfigRootDir: import.meta.dirname,
        project: ["tsconfig.eslint.json"],
      },
    },

    rules: {
      "lumina/member-ordering": "warn",

      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["tests/common/*"],
              message:
                "Import named functions from tests/common instead of direct module imports, e.g., import { disabled } from 'tests/common'",
            },
            {
              group: ["lit-html", "lit-html/*"],
              message: "Import from 'lit' instead of 'lit-html'",
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
          property: "cancel",
          message: "Use the useCancelable controller to manage cancelable resources.",
        },
      ],
      "no-restricted-syntax": [
        "error",
        {
          selector:
            ":matches(PropertyDefinition, ClassProperty)[accessibility='private'][value.type='CallExpression'][value.callee.name='createRef']:not([key.name=/Ref$|^ref$/])",
          message: "Private properties initialized with createRef must end with Ref",
        },
      ],

      "unused-imports/no-unused-imports": "error",

      "unicorn/filename-case": "off",

      "@esri/calcite-components/no-dynamic-createelement": "warn",
      "@esri/calcite-components/strict-boolean-attributes": "error",
      "@esri/calcite-components/require-deprecation-details": "warn",
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
    files: ["**/*.{e2e,spec}.{ts,tsx}", "src/tests/**/*"],
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

  {
    files: ["src/**/*.stories.ts"],
    extends: [storybookPlugin.configs["flat/recommended"]],
    rules: {
      "storybook/prefer-pascal-case": "off",
    },
  },

  {
    plugins: {
      unicorn: unicornPlugin,
    },
    files: [
      // scoped to allow for progressive adoption
      ".storybook/**/*",
      "src/*.{ts,tsx}",
      "src/components/**/*",
      "src/custom-theme/**/*",
      "src/demos/**/*",
      "src/internal-label/**/*",
      "src/tests/common/**/*",
      "src/tests/integration/**/*",
      "src/tests/setup.ts",
      "src/tests/utils/**/*",
      "support/**/*",
    ],
    ignores: ["src/components/alert/AlertManager*", "src/components/functional/*"],
    rules: {
      "unicorn/filename-case": [
        "error",
        {
          case: "kebabCase",
        },
      ],
    },
  },
  {
    files: ["src/controllers/**/*.{js,jsx,ts,tsx}"],
    rules: {
      "unicorn/filename-case": "off",
    },
  },
);
