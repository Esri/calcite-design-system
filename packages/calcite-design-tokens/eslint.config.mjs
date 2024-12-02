import { fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import _import from "eslint-plugin-import";
import jest from "eslint-plugin-jest";
import jsdoc from "eslint-plugin-jsdoc";
import prettier from "eslint-plugin-prettier";
import unicorn from "eslint-plugin-unicorn";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ["**/dist"],
  },
  ...compat.extends(
    "plugin:@cspell/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    "prettier",
  ),
  jsdoc.configs["flat/recommended"],
  {
    plugins: {
      "@typescript-eslint": typescriptEslint,
      import: fixupPluginRules(_import),
      jest,
      jsdoc,
      prettier,
      unicorn,
    },

    languageOptions: {
      globals: {
        ...jest.environments.globals.globals,
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
      "@typescript-eslint/explicit-module-boundary-types": [
        "error",
        {
          allowArgumentsExplicitlyTypedAsAny: true,
        },
      ],

      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      curly: "error",

      "import/no-dynamic-require": [
        "error",
        {
          esmodule: true,
        },
      ],

      "jest/expect-expect": "off",
      "jest/no-export": "warn",
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

      "lines-between-class-members": ["error", "always"],
      "no-eval": "error",
      "no-implied-eval": "error",

      "no-multiple-empty-lines": [
        "error",
        {
          max: 1,
        },
      ],

      "no-new-func": "error",
      "no-unneeded-ternary": "error",
      "one-var": ["error", "never"],
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
