import cspellPluginRecommended from "@cspell/eslint-plugin/recommended";
import { fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import jsPlugin from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import jestPlugin from "eslint-plugin-jest";
import jsdocPlugin from "eslint-plugin-jsdoc";
import prettierPlugin from "eslint-plugin-prettier";
import unicornPlugin from "eslint-plugin-unicorn";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: jsPlugin.configs.recommended,
  allConfig: jsPlugin.configs.all,
});

export default [
  {
    ignores: ["**/dist"],
  },

  ...compat.extends("plugin:@typescript-eslint/recommended", "prettier"),
  cspellPluginRecommended,
  jestPlugin.configs["flat/recommended"],
  jsdocPlugin.configs["flat/recommended"],

  {
    files: ["**/*.{ts,tsx,mjs,cjs}"],
    plugins: {
      "@typescript-eslint": tsPlugin,
      import: fixupPluginRules(importPlugin),
      jest: jestPlugin,
      jsdoc: jsdocPlugin,
      prettier: prettierPlugin,
      unicorn: unicornPlugin,
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
      jsdoc: {
        ignoreInternal: true,
        ignorePrivate: true,
      },
    },

    rules: {
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
];
