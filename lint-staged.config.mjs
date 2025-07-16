import { resolve } from "node:path";

/**
 * @filename: lint-staged.config.mjs
 * @type {import('lint-staged').Configuration}
 */
export default {
  "*.{json,html,yml}": ["prettier --config-precedence prefer-file --write"],
  "*.{s,}css": ["prettier --config-precedence prefer-file --write"],
  "*.md": (absolutePaths) => {
    const files = absolutePaths.join(" ");
    return [
      `prettier --config-precedence prefer-file --write ${files}`,
      `markdownlint-cli2 --fix --config ${resolve(import.meta.dirname, "./.markdownlint-cli2.jsonc")} ${files}`
    ];
  }
};
