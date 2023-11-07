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
        "@esri/calcite-components/ban-props-on-host": 2,
        "@esri/calcite-components/enforce-ref-last-prop": 2,
        "@esri/calcite-components/require-event-emitter-type": 2,
        "@esri/calcite-components/strict-boolean-attributes": 2,
      },
    },
  ],
};
