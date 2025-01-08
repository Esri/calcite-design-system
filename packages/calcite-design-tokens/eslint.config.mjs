import cspellPlugin from "@cspell/eslint-plugin";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import * as importPlugin from "eslint-plugin-import";
import prettierConfig from "eslint-config-prettier";
import jestPlugin from "eslint-plugin-jest";
import jsdocPlugin from "eslint-plugin-jsdoc";
import unicornPlugin from "eslint-plugin-unicorn";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default tseslint.config(
  {
    ignores: ["**/dist"],
  },

  prettierConfig,

  {
    files: ["**/*.{ts,tsx,mjs,cjs}"],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      jsdocPlugin.configs["flat/recommended"],
      jestPlugin.configs["flat/recommended"],
    ],

    plugins: {
      "@cspell": cspellPlugin,
      import: importPlugin,
      unicorn: unicornPlugin,
    },

    languageOptions: {
      globals: {
        ...jestPlugin.environments.globals.globals,
      },

      parser: tseslint.parser,
      ecmaVersion: 2021,
      sourceType: "module",

      parserOptions: {
        tsconfigRootDir: __dirname,
        projectService: true,
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

      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      "@typescript-eslint/explicit-module-boundary-types": [
        "error",
        {
          allowArgumentsExplicitlyTypedAsAny: true,
        },
      ],

      "import/no-dynamic-require": [
        "error",
        {
          esmodule: true,
        },
      ],

      "jsdoc/check-tag-names": "off",
      "jsdoc/require-jsdoc": "off",
      "jsdoc/require-param-type": "off",
      "jsdoc/require-returns-type": "off",
      "jsdoc/tag-lines": [
        "error",
        "any",
        {
          startLines: 1,
        },
      ],

      "jest/expect-expect": "off",
      "jest/no-export": "warn",

      curly: "error",
      "lines-between-class-members": ["error", "always"],
      "one-var": ["error", "never"],
      "no-eval": "error",
      "no-new-func": "error",
      "no-unneeded-ternary": "error",
      "no-implied-eval": "error",
      "no-multiple-empty-lines": [
        "error",
        {
          max: 1,
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
);
