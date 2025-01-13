import calciteCoreConfig from "@esri/eslint-config-calcite/core.js";
import prettierConfig from "eslint-config-prettier";
import jestPlugin from "eslint-plugin-jest";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["**/dist"],
  },

  prettierConfig,

  {
    extends: [calciteCoreConfig, jestPlugin.configs["flat/recommended"]],

    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        project: ["tsconfig-eslint.json"],
      },
      globals: {
        ...jestPlugin.environments.globals.globals,
      },
    },

    rules: {
      "jest/expect-expect": "off",
      "jest/no-export": "warn",
      "lines-between-class-members": ["error", "always"],
    },
  },
);
