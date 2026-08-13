import { resolve } from "node:path";
import baseConfig from "../../lint-staged.config.mjs";

/**
 * @filename: lint-staged.config.mjs
 * @type {import('lint-staged').Configuration}
 */
export default {
  ...baseConfig,
  "*.{ts,tsx,mjs,cjs}": (absolutePaths) => {
    const files = absolutePaths.join(" ");
    const { dirname } = import.meta;
    return [
      `eslint --fix ${files}`,
      `prettier --ignore-path ${resolve(dirname, "../../.prettierignore")} --write ${files}`,
    ];
  },
};
