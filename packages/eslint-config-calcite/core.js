import cspellPlugin from "@cspell/eslint-plugin";
import eslint from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import * as importPlugin from "eslint-plugin-import";
import jsdocPlugin from "eslint-plugin-jsdoc";
import unicornPlugin from "eslint-plugin-unicorn";
import tseslint from "typescript-eslint";

export default tseslint.config(
  prettierConfig,

  {
    files: ["**/*.{ts,tsx,mjs,cjs}"],
    extends: [eslint.configs.recommended, tseslint.configs.recommended, jsdocPlugin.configs["flat/recommended"]],
    plugins: {
      "@cspell": cspellPlugin,
      import: importPlugin,
      unicorn: unicornPlugin,
    },

    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      parser: tseslint.parser,
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
      radix: ["error", "as-needed"],

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
);
