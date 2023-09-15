module.exports = {
  root: true,
  env: {
    "jest/globals": true
  },
  extends: [
    "plugin:@cspell/recommended",
    "plugin:@esri/calcite-components/recommended",
    "plugin:@stencil-community/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    "plugin:jsdoc/recommended",
    "prettier"
  ],
  ignorePatterns: ["dist", "docs", "hydrate", "www"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["tsconfig-eslint.json"],
    ecmaVersion: 2021,
    sourceType: "module"
  },
  plugins: [
    "@esri/calcite-components",
    "@typescript-eslint",
    "eslint-plugin-react",
    "import",
    "jest",
    "jsdoc",
    "prettier",
    "unicorn"
  ],
  rules: {
    "@esri/calcite-components/ban-events": [
      "warn",
      {
        event: "keyup",
        message: "Use keydown instead for consistent interaction behavior (e.g., closing, moving focus, etc.)."
      },
      {
        event: "keypress",
        message: "Use keydown instead for consistent interaction behavior (e.g., closing, moving focus, etc.)."
      }
    ],
    "@stencil-community/decorators-context": "off",
    "@stencil-community/decorators-style": "warn",
    "@stencil-community/no-unused-watch": "off",
    "@stencil-community/own-methods-must-be-private": "off",
    "@stencil-community/own-props-must-be-private": "off",
    "@stencil-community/prefer-vdom-listener": "warn",
    "@stencil-community/required-jsdoc": "off",
    "@stencil-community/strict-boolean-conditions": "off",
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
          "render"
        ]
      }
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
        max: 1
      }
    ],
    "no-new-func": "error",
    "no-unneeded-ternary": "error",
    "one-var": ["error", "never"],
    "react/forbid-component-props": [
      "warn",
      {
        forbid: [
          {
            propName: "onKeyPress",
            message: "Use onKeyDown instead for consistent interaction behavior (e.g., closing, moving focus, etc.)."
          },
          {
            propName: "onKeyUp",
            message: "Use onKeyDown instead for consistent interaction behavior (e.g., closing, moving focus, etc.)."
          }
        ]
      }
    ],
    "react/forbid-dom-props": [
      "warn",
      {
        forbid: [
          {
            propName: "onKeyPress",
            message: "Use onKeyDown instead for consistent interaction behavior (e.g., closing, moving focus, etc.)."
          },
          {
            propName: "onKeyUp",
            message: "Use onKeyDown instead for consistent interaction behavior (e.g., closing, moving focus, etc)."
          }
        ]
      }
    ],
    "react/jsx-sort-props": "error",
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react/self-closing-comp": "error",
    "unicorn/prefer-ternary": "error",
    "unicorn/prevent-abbreviations": [
      "error",
      {
        allowList: {
          e2ePage: true
        },
        extendDefaultReplacements: false,
        replacements: {
          e: {
            error: true,
            event: true
          }
        },
        checkProperties: false,
        checkFilenames: false
      }
    ]
  },
  settings: {
    react: {
      pragma: "h"
    },
    jsdoc: {
      ignoreInternal: true,
      ignorePrivate: true
    }
  }
};
