// @ts-check
import tseslint from "typescript-eslint";
import eslint from "@eslint/js";

export default tseslint.config({
  files: ["*.config.mjs", "bin", "lib", "docs/*.js"],
  ignores: ["node_modules", "docs/resources", "js", "fonts", "icons"],
  extends: [eslint.configs.recommended, tseslint.configs.recommended],
  languageOptions: {
    parserOptions: {
      tsconfigRootDir: import.meta.dirname,
      project: ["tsconfig-eslint.json"],
    },
  },
});
