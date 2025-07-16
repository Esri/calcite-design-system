import baseConfig from "../../lint-staged.config.mjs";

/**
 * @filename: lint-staged.config.mjs
 * @type {import('lint-staged').Configuration}
 */
export default {
  ...baseConfig,
  "*.{s,}css": ["stylelint --fix", "prettier --config-precedence prefer-file --write"],
  "*.{ts,tsx,mjs,cjs}": ["eslint --fix", "prettier --config-precedence prefer-file --write"],
};
