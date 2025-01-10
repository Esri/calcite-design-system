import cspellPlugin from "@cspell/eslint-plugin";
import eslint from "@eslint/js";
import calcitePlugin from "@esri/eslint-plugin-calcite-components";
import vitestPlugin from "@vitest/eslint-plugin";
import prettierConfig from "eslint-config-prettier";
import * as importPlugin from "eslint-plugin-import";
import jsdocPlugin from "eslint-plugin-jsdoc";
import reactPlugin from "eslint-plugin-react";
import unicornPlugin from "eslint-plugin-unicorn";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["**/dist", "**/docs", "**/hydrate", "**/*.d.ts"],
  },

  prettierConfig,

  {
    files: ["**/*.{ts,tsx,mjs,cjs}"],
    extends: [eslint.configs.recommended, tseslint.configs.recommended, jsdocPlugin.configs["flat/recommended"]],
    plugins: {
      "@esri/calcite-components": calcitePlugin,
      "@cspell": cspellPlugin,
      import: importPlugin,
      unicorn: unicornPlugin,
    },

    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      parser: tseslint.parser,
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        project: ["tsconfig-eslint.json"],
      },
    },

    settings: {
      jsdoc: {
        ignoreInternal: true,
        ignorePrivate: true,
      },
    },

    rules: {
      "@cspell/spellchecker": ["warn", {}],

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
      "no-unexpected-multiline": "off", // conflicts with prettier - https://github.com/prettier/eslint-config-prettier/issues/32
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
      radix: ["error", "as-needed"],

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
    },
  },

  {
    files: ["**/*.tsx"],
    ...reactPlugin.configs.flat?.recommended,
    settings: {
      react: {
        pragma: "h",
      },
    },
    rules: {
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
    },
  },

  {
    files: ["**/*.{m,c,}js"],
    extends: [tseslint.configs.disableTypeChecked],
    rules: {
      // turn off other type-aware rules
      "other-plugin/typed-rule": "off",
      // turn off rules that don't apply to JS code
      "@typescript-eslint/explicit-function-return-type": "off",
    },
    languageOptions: {
      globals: {
        module: "writable",
      },
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
