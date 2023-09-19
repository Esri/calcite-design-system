module.exports = {
  root: true,
  env: {
    "jest/globals": true,
  },
  extends: [
    "plugin:@cspell/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    "plugin:jsdoc/recommended",
    "prettier",
  ],
  ignorePatterns: ["dist"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["tsconfig-eslint.json"],
    ecmaVersion: 2021,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "import", "jest", "jsdoc", "prettier", "unicorn"],
  rules: {
    "@typescript-eslint/ban-types": "warn",
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
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "error",
    curly: "error",
    "import/no-dynamic-require": ["error", { esmodule: true }],
    "jest/expect-expect": "off",
    "jest/no-export": "warn",
    "jsdoc/check-tag-names": "off",
    "jsdoc/require-jsdoc": "off",
    "jsdoc/require-param-type": "off",
    "jsdoc/require-returns-type": "off",
    "jsdoc/tag-lines": ["error", "any", { startLines: 1 }],
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
  settings: {
    jsdoc: {
      ignoreInternal: true,
      ignorePrivate: true,
    },
  },
};
