import calciteCoreConfig from "@esri/eslint-config-calcite/core.js";
import vitestPlugin from "@vitest/eslint-plugin";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["**/dist"],
  },

  {
    extends: [calciteCoreConfig, vitestPlugin.configs.recommended],

    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        project: ["tsconfig-eslint.json"],
      },
      globals: {
        ...globals.builtin,
        ...globals.browser,
        ...vitestPlugin.environments?.env.globals,
      },
    },

    settings: {
      vitest: {
        typecheck: true,
      },
    },

    rules: {
      "vitest/expect-expect": "off",
      "lines-between-class-members": ["error", "always"],
    },
  },
);
