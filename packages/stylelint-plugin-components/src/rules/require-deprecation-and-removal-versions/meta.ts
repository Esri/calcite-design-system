import stylelint from "stylelint";

const { ruleMessages } = stylelint.utils;

export const name = "calcite/require-deprecation-and-removal-versions";

export const messages = ruleMessages(name, {
  rejected:
    "Expected both deprecation and removal target versions on a [Deprecated] token. (e.g. '[Deprecated] in v1.2.3, removal target v3').",
});

export const meta: stylelint.RuleMeta = {
  deprecated: false,
  fixable: false,
  url: "https://github.com/Esri/calcite-design-system/stylelint-plugin-components",
};
