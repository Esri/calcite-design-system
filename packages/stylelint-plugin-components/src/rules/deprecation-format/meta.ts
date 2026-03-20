import stylelint from "stylelint";

const { ruleMessages } = stylelint.utils;

export const name = "@esri/calcite-components/deprecation-format";

export const messages = ruleMessages(name, {
  rejected:
    "Expected both deprecation and removal target versions on a [Deprecated] token. (e.g. '[Deprecated] in v1.2.3, removal target v3').",
});

export const meta: stylelint.RuleMeta = {
  url: "https://github.com/Esri/calcite-design-system/tree/dev/packages/stylelint-plugin-components",
};
