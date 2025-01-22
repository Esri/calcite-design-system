const globals = require("globals");
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const cspellPlugin = require("@cspell/eslint-plugin");

module.exports = tseslint.config({
  files: ["**/*.{c,m,}js"],
  extends: [eslint.configs.recommended, tseslint.configs.recommended],
  plugins: { "@cspell": cspellPlugin },

  languageOptions: {
    ecmaVersion: 2021,
    sourceType: "commonjs",
    globals: {
      ...globals.node,
    },
  },

  rules: {
    "comma-dangle": "off",
    "@cspell/spellchecker": ["warn", {}],
    "@typescript-eslint/no-require-imports": "off",
  },
});
