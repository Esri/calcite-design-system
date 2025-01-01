const { FlatCompat } = require("@eslint/eslintrc");
const js = require("@eslint/js");
const globals = require("globals");

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

module.exports = [
  ...compat.extends("eslint:recommended", "plugin:prettier/recommended"),
  {
    files: ["**/*.{c,m,}js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },

      ecmaVersion: 2021,
      sourceType: "commonjs",
    },

    rules: {
      "comma-dangle": "off",
    },
  },
];
