import { Rule } from "eslint";

function isCreateElement(node) {
  return (
    node?.callee?.type === "MemberExpression" &&
    node?.callee?.object?.name === "document" &&
    node?.callee?.property?.name === "createElement" &&
    node.arguments.length >= 1
  );
}

function isStaticValue(arg) {
  return arg.type === "Literal" || (arg.type === "TemplateLiteral" && arg.expressions.length === 0);
}

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description:
        "This ensures supporting components created with `document.createElement()` are auto-defined in Stencil's `components` output target.",
      recommended: true,
    },
    fixable: "code",
    schema: [],
    type: "problem",
  },

  create(context) {
    return {
      CallExpression(node) {
        if (!node.arguments[0] || isStaticValue(node.arguments[0])) {
          return;
        }

        if (isCreateElement(node)) {
          return context.report({
            node,
            message: "Calls to document.createElement() should use string literals",
          });
        }
      },
    };
  },
};

export default rule;
