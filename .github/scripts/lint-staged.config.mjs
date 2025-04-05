import baseConfig from "../../lint-staged.config.mjs";

export default {
  ...baseConfig,
  "*.{m,c,}js": ["eslint --fix", "prettier --write"],
};
