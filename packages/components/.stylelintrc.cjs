// @ts-check

// ⚠️ AUTO-GENERATED CODE - DO NOT EDIT
const customFunctions = [
  "get-trailing-text-input-padding",
  "medium-modular-scale",
  "modular-scale",
  "scale-duration",
  "small-modular-scale",
];
// ⚠️ END OF AUTO-GENERATED CODE

const scssPatternRules = [
  "scss/at-function-pattern",
  "scss/dollar-variable-pattern",
  "scss/at-mixin-pattern",
  "scss/percent-placeholder-pattern",
];

/** @type {import('stylelint').Config["rules"]} */
const rules = {
  "length-zero-no-unit": true,
  "liberty/use-logical-spec": ["always"],
  "no-descending-specificity": [
    true,
    {
      ignore: ["selectors-within-list"],
    },
  ],
  "selector-attribute-name-disallowed-list": [
    ["hidden"],
    {
      message: "hidden styles are included in the `base-component` mixin, so make sure it's used",
      severity: "error",
    },
  ],
  "selector-disallowed-list": [
    ["/:host-context/"],
    {
      message: ":host-context is not supported in all browsers, so it should be avoided",
      severity: "error",
    },
  ],
  "selector-max-specificity": [
    "0,5,5",
    {
      message: "selector is too complex, consider applying multiple classes dynamically during rendering",
    },
  ],
  "selector-pseudo-element-colon-notation": [
    "double",
    {
      message: "Use double colons for pseudo-elements",
    },
  ],
  "selector-type-no-unknown": [
    true,
    {
      ignoreTypes: ["/^calcite-/"],
    },
  ],
  "scss/function-no-unknown": [
    true,
    {
      ignoreFunctions: [...customFunctions, "theme", "var"],
      severity: "error",
    },
  ],
};

scssPatternRules.forEach((rule) => {
  const kebabCasePattern = "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$";

  rules[rule] =
    /** @type {import('stylelint').Config["rules"][string]} */
    [
      kebabCasePattern,
      {
        message: "Name should be kebab-cased",
        severity: "error",
      },
    ];
});

/** @type {import('stylelint').Config} */
const config = {
  defaultSeverity: "warning",
  extends: "stylelint-config-recommended-scss",
  plugins: ["stylelint-use-logical-spec"],
  rules,
};

module.exports = config;
