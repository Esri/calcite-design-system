import baseConfig from "../../.lintstagedrc.js";

export default {
  ...baseConfig,
  "*.{ts,tsx,mjs,cjs}": ["eslint --fix", "prettier --write"],
};
