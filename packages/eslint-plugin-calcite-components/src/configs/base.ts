export default {
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      env: {
        es2020: true,
        browser: true,
      },
      plugins: ["@esri/calcite-components"],
      rules: {
        "@esri/calcite-components/no-dynamic-createelement": 1,
        "@esri/calcite-components/strict-boolean-attributes": 1,
        "@esri/calcite-components/native-button-tab-index-required": 1,
      },
    },
  ],
};
