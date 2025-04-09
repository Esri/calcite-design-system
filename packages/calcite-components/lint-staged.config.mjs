import baseConfig from "../../lint-staged.config.mjs";

/**
 * @filename: lint-staged.config.mjs
 * @type {import('lint-staged').Configuration}
 */
export default {
  ...baseConfig,
  "*.{s,}css": ["stylelint --fix", "prettier --write"],
  "*.{ts,tsx,mjs,cjs}": ["eslint --fix", "prettier --write"],
};
