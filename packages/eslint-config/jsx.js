import reactPlugin from "eslint-plugin-react";
import tseslint from "typescript-eslint";

export default tseslint.config({
  files: ["**/*.{t,j}sx"],
  ...reactPlugin.configs.flat?.recommended,
  settings: {
    react: {
      pragma: "h",
    },
  },
  rules: {
    "react/jsx-props-no-spreading": "error",
    "react/jsx-sort-props": "error",
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react/self-closing-comp": "error",
    "react/forbid-component-props": [
      "warn",
      {
        forbid: [
          {
            propName: "onKeyPress",
            message: "Use onKeyDown instead for consistent interaction behavior (e.g., closing, moving focus, etc.).",
          },
          {
            propName: "onKeyUp",
            message: "Use onKeyDown instead for consistent interaction behavior (e.g., closing, moving focus, etc.).",
          },
        ],
      },
    ],
    "react/forbid-dom-props": [
      "warn",
      {
        forbid: [
          {
            propName: "onKeyPress",
            message: "Use onKeyDown instead for consistent interaction behavior (e.g., closing, moving focus, etc.).",
          },
          {
            propName: "onKeyUp",
            message: "Use onKeyDown instead for consistent interaction behavior (e.g., closing, moving focus, etc).",
          },
        ],
      },
    ],
  },
});
