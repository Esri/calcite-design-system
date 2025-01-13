import vitestPlugin from "@vitest/eslint-plugin";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["**/dist"],
  },

  {
    extends: [vitestPlugin.configs.recommended],

    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        project: ["tsconfig-eslint.json"],
      },
      globals: {
        ...vitestPlugin.environments.env.globals,
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
