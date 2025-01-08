const cspellPlugin = require("@cspell/eslint-plugin");
const eslint = require("@eslint/js");
const globals = require("globals");

module.exports = [
  eslint.configs.recommended,
  {
    files: ["**/*.{c,m,}js"],
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
    },
  },
];
