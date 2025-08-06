import { resolve } from "node:path";
import baseConfig from "../../lint-staged.config.mjs";

export default {
  ...baseConfig,
  "*.{s,}css": (absolutePaths) => {
    const files = absolutePaths.join(" ");
    const { dirname } = import.meta;
    return [
      `stylelint --fix ${files}`,
      `prettier --ignore-path ${resolve(dirname, "../../.prettierignore")} --write ${files}`,
    ];
  },
  "*.{ts,tsx,mjs,cjs}": (absolutePaths) => {
    const files = absolutePaths.join(" ");
    const { dirname } = import.meta;
    return [
      `eslint --fix ${files}`,
      `prettier --ignore-path ${resolve(dirname, "../../.prettierignore")} --write ${files}`,
    ];
  },
};
