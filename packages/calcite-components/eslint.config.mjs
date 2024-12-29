import path from "node:path";
import { fileURLToPath } from "node:url";
import cspellPluginRecommended from "@cspell/eslint-plugin/recommended";
import { fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import jsPlugin from "@eslint/js";
import calcitePlugin from "@esri/eslint-plugin-calcite-components";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import jestPlugin from "eslint-plugin-jest";
import jsdocPlugin from "eslint-plugin-jsdoc";
import prettierPlugin from "eslint-plugin-prettier";
import reactPlugin from "eslint-plugin-react";
import unicornPlugin from "eslint-plugin-unicorn";
import vitestPlugin from "eslint-plugin-vitest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: jsPlugin.configs.recommended,
  allConfig: jsPlugin.configs.all,
});

export default [
  {
    ignores: ["**/dist", "**/docs", "**/hydrate", "**/*.d.ts"],
  },

  ...compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"),

  vitestPlugin.configs.recommended,
  cspellPluginRecommended,
  jestPlugin.configs["flat/recommended"],
  jsdocPlugin.configs["flat/recommended"],

  {
    files: ["**/*.{ts,tsx,mjs,cjs}"],
    plugins: {
      "@esri/calcite-components": calcitePlugin,
      "@typescript-eslint": tsPlugin,
      import: fixupPluginRules(importPlugin),
      react: reactPlugin,
      jsdoc: jsdocPlugin,
      jest: jestPlugin,
      prettier: prettierPlugin,
      unicorn: unicornPlugin,
      vitest: vitestPlugin,
    },

    languageOptions: {
      globals: {
        ...jestPlugin.environments.globals.globals,
      },

      parser: tsParser,
      ecmaVersion: 2021,
      sourceType: "module",

      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["tsconfig-eslint.json"],
      },
    },

    settings: {
      react: {
        pragma: "h",
      },

      jsdoc: {
        ignoreInternal: true,
        ignorePrivate: true,
      },
    },

    rules: {
      "@typescript-eslint/method-signature-style": ["error", "property"],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      "@typescript-eslint/explicit-module-boundary-types": [
        "error",
        {
          allowArgumentsExplicitlyTypedAsAny: true,
          allowedNames: [
            "connectedCallback",
            "disconnectedCallback",
            "componentWillRender",
            "componentDidRender",
            "componentWillLoad",
            "componentDidLoad",
            "componentWillUpdate",
            "componentDidUpdate",
            "render",
          ],
        },
      ],

      "import/no-dynamic-require": [
        "error",
        {
          esmodule: true,
        },
      ],
      "import/order": [
        "error",
        {
          "newlines-between": "never",
        },
      ],

      "jsdoc/check-param-names": "off",
      "jsdoc/require-jsdoc": "off",
      "jsdoc/require-param-description": "off",
      "jsdoc/require-param-type": "off",
      "jsdoc/require-property-type": "off",
      "jsdoc/require-returns": "off",
      "jsdoc/require-returns-description": "off",
      "jsdoc/require-returns-type": "off",
      "jsdoc/check-tag-names": "off",
      "jsdoc/tag-lines": [
        "error",
        "any",
        {
          startLines: 1,
        },
      ],
      "jsdoc/no-restricted-syntax": [
        "error",
        {
          contexts: [
            {
              context: "any",
              comment: 'JsdocBlock:has(JsdocTag[tag="required"]):has(JsdocTag[tag="deprecated"])',
              message:
                "A property cannot be required and deprecated. Use `component#warnIfMissingRequiredProp` to handle required messaging.",
            },
          ],
        },
      ],

      curly: "error",
      "one-var": ["error", "never"],
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-new-func": "error",
      "no-unneeded-ternary": "error",
      "no-multiple-empty-lines": [
        "error",
        {
          max: 1,
        },
      ],
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

      "react/jsx-props-no-spreading": "error",
      "react/jsx-sort-props": "error",
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "react/self-closing-comp": "error",
      "react/forbid-component-props": [
        "warn",
        {
          forbid: [
            {
              propName: "onKeyPress",
              message: "Use onKeyDown instead for consistent interaction behavior (e.g., closing, moving focus, etc.).",
            },
            {
              propName: "onKeyUp",
              message: "Use onKeyDown instead for consistent interaction behavior (e.g., closing, moving focus, etc.).",
            },
          ],
        },
      ],
      "react/forbid-dom-props": [
        "warn",
        {
          forbid: [
            {
              propName: "onKeyPress",
              message: "Use onKeyDown instead for consistent interaction behavior (e.g., closing, moving focus, etc.).",
            },
            {
              propName: "onKeyUp",
              message: "Use onKeyDown instead for consistent interaction behavior (e.g., closing, moving focus, etc).",
            },
          ],
        },
      ],

      "unicorn/prefer-ternary": "error",
      "unicorn/prevent-abbreviations": [
        "error",
        {
          allowList: {
            e2ePage: true,
          },

          extendDefaultReplacements: false,

          replacements: {
            e: {
              error: true,
              event: true,
            },
          },

          checkProperties: false,
          checkFilenames: false,
        },
      ],
      "vitest/expect-expect": "off",
    },
  },

  {
    files: ["**/*.cjs"],
    languageOptions: {
      globals: {
        module: "writable",
      },
    },
  },

  {
    files: ["**/*.e2e.ts", "src/tests/**/*"],
    rules: {
      "@esri/calcite-components/no-dynamic-createelement": "off",
    },
  },

  ...compat.extends("plugin:@typescript-eslint/disable-type-checked").map((config) => ({
    ...config,
    files: ["**/*.cjs"],
  })),
];
