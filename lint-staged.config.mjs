import { resolve } from "node:path";

/**
 * @filename: lint-staged.config.mjs
 * @type {import('lint-staged').Configuration}
 */
export default {
  "*.{json,html,yml}": ["prettier --write"],
  "*.{s,}css": ["prettier --write"],
  "*.md": (absolutePaths) => {
    const files = absolutePaths.join(" ");
    return [
      `prettier --write ${files}`,
      `markdownlint-cli2 --fix --config ${resolve(import.meta.dirname, "./.markdownlint-cli2.jsonc")} ${files}`
    ];
  }
};
