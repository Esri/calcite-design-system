import calciteCoreConfig from "@esri/eslint-config-calcite/core.js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["**/js"],
  },

  {
    extends: [calciteCoreConfig],

    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        project: ["tsconfig-eslint.json"],
      },
    },
  },
);
