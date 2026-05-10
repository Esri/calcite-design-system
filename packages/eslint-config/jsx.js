import eslintReact from "@eslint-react/eslint-plugin";
import eslintReactKit from "@eslint-react/kit";
import perfectionist from "eslint-plugin-perfectionist";
import stylistic from "@stylistic/eslint-plugin";
import tseslint from "typescript-eslint";
import { forbidDomProps, jsxPropsNoSpreading } from "./eslint-react/custom/index.js";

const kit = eslintReactKit()
  .use(forbidDomProps, {
    forbidden: [
      {
        propName: "onKeyPress",
        message: "Use onKeyDown instead for consistent interaction behavior (e.g., closing, moving focus, etc.).",
      },
      {
        propName: "onKeyUp",
        message: "Use onKeyDown instead for consistent interaction behavior (e.g., closing, moving focus, etc.).",
      },
    ],
  })
  .use(jsxPropsNoSpreading);

export default tseslint.config({
  files: ["**/*.{t,j}sx"],
  extends: [eslintReact.configs["jsx"]],
  plugins: {
    "@stylistic": stylistic,
    perfectionist: perfectionist,
    "@eslint-react/kit": kit.getPlugin(),
  },
  rules: {
    "@stylistic/jsx-self-closing-comp": "error",

    // https://www.eslint-react.xyz/docs/rules#x-rules
    "@eslint-react/no-array-index-key": "error",

    // https://www.eslint-react.xyz/docs/rules#dom-rules
    "@eslint-react/dom-no-missing-button-type": "warn",
    "@eslint-react/dom-no-missing-iframe-sandbox": "error",
    "@eslint-react/dom-no-script-url": "error",
    "@eslint-react/dom-no-unsafe-iframe-sandbox": "error",
    "@eslint-react/dom-no-unsafe-target-blank": "error",
    "@eslint-react/dom-no-void-elements-with-children": "error",

    "@eslint-react/kit/forbid-dom-props": "warn",

    "perfectionist/sort-jsx-props": "error",
  },
});
