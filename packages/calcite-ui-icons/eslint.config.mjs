// import calciteCoreConfig from "@esri/eslint-config-calcite/core.js";
import tseslint from "typescript-eslint";
import eslint from "@eslint/js";

export default tseslint.config(
  {
    ignores: ["**/js", "docs/resources/*"],
  },

  {
    files: ["**/*.js"],
    extends: [eslint.configs.recommended, tseslint.configs.recommended],

    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        project: ["tsconfig-eslint.json"],
      },
    },
  },
);
