import stylelint from "stylelint";

const {
  createPlugin,
  utils: { report, ruleMessages, validateOptions },
} = stylelint;

const ruleName = "calcite/require-deprecation-and-removal-versions";
const messages = ruleMessages(ruleName, {
  expected:
    "Expected both deprecation and removal target versions on a [Deprecated] token. (e.g. '[Deprecated] in v1.2.3, removal target v3').",
});

/** @type {import('stylelint').Rule} */
const ruleFunction = (primary) => {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: primary,
      possible: [true],
    });

    if (!validOptions) {
      return;
    }

    const deprecationVersionRegex = /\bin\s+v?\d+(?:\.\d+){0,2}\b/i;
    const removalTargetRegex = /\bremoval\s+target\s+v?\d+(?:\.\d+){0,2}\b/i;

    root.walkComments((comment) => {
      if (!comment || !comment.text) {
        return;
      }
      const text = comment.text;

      if (!/\[Deprecated\]/i.test(text)) {
        return;
      }

      const hasDeprecationVersion = deprecationVersionRegex.test(text);
      const hasRemovalTarget = removalTargetRegex.test(text);

      if (!hasDeprecationVersion || !hasRemovalTarget) {
        report({
          result,
          ruleName,
          message: messages.expected,
          node: comment,
        });
      }
    });
  };
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;

export default createPlugin(ruleName, ruleFunction);
