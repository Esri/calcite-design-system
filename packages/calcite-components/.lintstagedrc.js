import baseConfig from "../../.lintstagedrc.js";

export default {
  ...baseConfig,
  "*.{s,}css": ["stylelint --fix", "prettier --write"],
  "*.{ts,tsx,mjs,cjs}": ["eslint --fix", "prettier --write"],
};
