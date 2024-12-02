import esriCalciteComponents from "@esri/eslint-plugin-calcite-components";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import react from "eslint-plugin-react";
import _import from "eslint-plugin-import";
import jest from "eslint-plugin-jest";
import jsdoc from "eslint-plugin-jsdoc";
import prettier from "eslint-plugin-prettier";
import unicorn from "eslint-plugin-unicorn";
import { fixupPluginRules } from "@eslint/compat";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["**/dist", "**/docs", "**/hydrate", "**/*.d.ts"],
}, ...compat.extends(
    "eslint:recommended",
    "plugin:@cspell/recommended",
    "plugin:@esri/calcite-components/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    "plugin:jsdoc/recommended",
    "prettier",
), {
    plugins: {
        "@esri/calcite-components": esriCalciteComponents,
        "@typescript-eslint": typescriptEslint,
        react,
        import: fixupPluginRules(_import),
        jest,
        jsdoc,
        prettier,
        unicorn,
    },

    languageOptions: {
        globals: {
            ...jest.environments.globals.globals,
        },

        parser: tsParser,
        ecmaVersion: 2021,
        sourceType: "module",

        parserOptions: {
            tsconfigRootDir: "/home/jamin/dev/work/calcite-design-system/main/packages/calcite-components",
            project: ["tsconfig-eslint.json"],
        },
    },

    settings: {
        react: {
            pragma: "h",
        },

        jsdoc: {
            ignoreInternal: true,
            ignorePrivate: true,
        },
    },

    rules: {
        "@esri/calcite-components/ban-events": ["warn", {
            event: "keyup",
            message: "Use keydown instead for consistent interaction behavior (e.g., closing, moving focus, etc.).",
        }, {
            event: "keypress",
            message: "Use keydown instead for consistent interaction behavior (e.g., closing, moving focus, etc.).",
        }],

        "@esri/calcite-components/enforce-ref-last-prop": "off",
        "@esri/calcite-components/strict-boolean-attributes": "off",

        "@typescript-eslint/explicit-module-boundary-types": ["error", {
            allowArgumentsExplicitlyTypedAsAny: true,

            allowedNames: [
                "connectedCallback",
                "disconnectedCallback",
                "componentWillRender",
                "componentDidRender",
                "componentWillLoad",
                "componentDidLoad",
                "componentWillUpdate",
                "componentDidUpdate",
                "render",
            ],
        }],

        "@typescript-eslint/method-signature-style": ["error", "property"],
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unnecessary-type-assertion": "error",
        curly: "error",

        "import/no-dynamic-require": ["error", {
            esmodule: true,
        }],

        "import/order": ["error", {
            "newlines-between": "never",
        }],

        "jest/expect-expect": "off",
        "jest/no-export": "warn",
        "jsdoc/check-tag-names": "off",

        "jsdoc/no-restricted-syntax": ["error", {
            contexts: [{
                context: "any",
                comment: "JsdocBlock:has(JsdocTag[tag=\"required\"]):has(JsdocTag[tag=\"deprecated\"])",
                message: "A property cannot be required and deprecated. Use `component#warnIfMissingRequiredProp` to handle required messaging.",
            }],
        }],

        "jsdoc/require-jsdoc": "off",
        "jsdoc/require-param-type": "off",
        "jsdoc/require-property-type": "off",
        "jsdoc/require-returns-type": "off",

        "jsdoc/tag-lines": ["error", "any", {
            startLines: 1,
        }],

        "no-eval": "error",
        "no-implied-eval": "error",

        "no-multiple-empty-lines": ["error", {
            max: 1,
        }],

        "no-new-func": "error",

        "no-restricted-imports": ["error", {
            patterns: [{
                group: ["tests/commonTests/*"],
                message: "Import named functions from commonTests instead of direct module imports, e.g., import { disabled } from 'tests/commonTests'",
            }],
        }],

        "no-unneeded-ternary": "error",
        "one-var": ["error", "never"],

        "react/forbid-component-props": ["warn", {
            forbid: [{
                propName: "onKeyPress",
                message: "Use onKeyDown instead for consistent interaction behavior (e.g., closing, moving focus, etc.).",
            }, {
                propName: "onKeyUp",
                message: "Use onKeyDown instead for consistent interaction behavior (e.g., closing, moving focus, etc.).",
            }],
        }],

        "react/forbid-dom-props": ["warn", {
            forbid: [{
                propName: "onKeyPress",
                message: "Use onKeyDown instead for consistent interaction behavior (e.g., closing, moving focus, etc.).",
            }, {
                propName: "onKeyUp",
                message: "Use onKeyDown instead for consistent interaction behavior (e.g., closing, moving focus, etc).",
            }],
        }],

        "react/jsx-props-no-spreading": "error",
        "react/jsx-sort-props": "error",
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "react/self-closing-comp": "error",
        "unicorn/prefer-ternary": "error",

        "unicorn/prevent-abbreviations": ["error", {
            allowList: {
                e2ePage: true,
            },

            extendDefaultReplacements: false,

            replacements: {
                e: {
                    error: true,
                    event: true,
                },
            },

            checkProperties: false,
            checkFilenames: false,
        }],
    },
}, {
    files: ["**/*.e2e.ts", "src/tests/**/*"],

    rules: {
        "@esri/calcite-components/no-dynamic-createelement": "off",
    },
}, ...compat.extends("plugin:@typescript-eslint/disable-type-checked").map(config => ({
    ...config,
    files: ["**/*.cjs"],
}))];