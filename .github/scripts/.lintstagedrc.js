const baseConfig = require("../../.lintstagedrc.js");

module.exports = {
  ...baseConfig,
  "*.{m,c,}js": ["eslint --fix", "prettier --write"],
};
