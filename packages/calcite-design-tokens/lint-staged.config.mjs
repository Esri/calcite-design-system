import baseConfig from "../../lint-staged.config.mjs";

/**
 * @filename: lint-staged.config.mjs
 * @type {import('lint-staged').Configuration}
 */
export default {
  ...baseConfig,
  "*.{ts,tsx,mjs,cjs}": ["eslint --fix", "prettier --config-precedence prefer-file --write"],
};
