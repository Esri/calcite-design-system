import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

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
      `markdownlint-cli2 --fix --config ${resolve(__dirname, "./.markdownlint-cli2.jsonc")} ${files}`
    ];
  }
};
