import baseConfig from "../../lint-staged.config.mjs";

export default {
  ...baseConfig,
  "*.{ts,tsx,mjs,cjs}": ["eslint --fix", "prettier --write"],
};
