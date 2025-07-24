import { resolve } from "node:path";

/**
 * @filename: lint-staged.config.mjs
 * @type {import('lint-staged').Configuration}
 */
export default {
  "*.{json,html,yml}": (absolutePaths) => {
    const files = absolutePaths.join(" ");
    const { dirname } = import.meta;
    return [`prettier --ignore-path ${resolve(dirname, "./.prettierignore")} --write ${files}`];
  },
  "*.{s,}css": (absolutePaths) => {
    const files = absolutePaths.join(" ");
    const { dirname } = import.meta;
    return [`prettier --ignore-path ${resolve(dirname, "./.prettierignore")} --write ${files}`];
  },
  "*.md": (absolutePaths) => {
    const files = absolutePaths.join(" ");
    const { dirname } = import.meta;
    return [
      `prettier --ignore-path ${resolve(dirname, "./.prettierignore")} --write ${files}`,
      `markdownlint-cli2 --fix --config ${resolve(dirname, "./.markdownlint-cli2.jsonc")} ${files}`,
    ];
  },
};
