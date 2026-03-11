import stylelint from "stylelint";
import { meta, name, messages } from "./meta.ts";

const {
  utils: { report, validateOptions },
} = stylelint;

/** @type {import('stylelint').Rule} */
export const requireDeprecationAndRemovalVersions: stylelint.Rule = (primaryOption, secondaryOption) => {
  return (root, result) => {
    const validOptions = validateOptions(result, name, {
      actual: primaryOption,
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

      // Only enforce the rule when both a @prop declaration and a [Deprecated] marker are present
      if (!/\@prop/i.test(text) || !/\[Deprecated\]/i.test(text)) {
        return;
      }

      const hasDeprecationVersion = deprecationVersionRegex.test(text);
      const hasRemovalTarget = removalTargetRegex.test(text);

      if (!hasDeprecationVersion || !hasRemovalTarget) {
        report({
          result,
          ruleName: name,
          message: messages.rejected,
          node: comment,
        });
      }
    });
  };
};

requireDeprecationAndRemovalVersions.ruleName = name;
requireDeprecationAndRemovalVersions.messages = messages;
requireDeprecationAndRemovalVersions.meta = meta;
