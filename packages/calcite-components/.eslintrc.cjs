const config = require("eslint-config-custom");

module.exports = {
  ...config,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["tsconfig-eslint.json"],
    ecmaVersion: 2021,
    sourceType: "module",
  },
};
