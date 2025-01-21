import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator((name) => name);

function isCreateElement(node: TSESTree.CallExpression) {
  return (
    node.callee?.type === "MemberExpression" &&
    node.callee?.object?.type === "Identifier" &&
    node.callee?.object?.name === "document" &&
    node.callee?.property?.type === "Identifier" &&
    node.callee?.property?.name === "createElement" &&
    node.arguments.length >= 1
  );
}

function isStaticValue(arg: TSESTree.Node) {
  return arg.type === "Literal" || (arg.type === "TemplateLiteral" && arg.expressions.length === 0);
}

export default createRule({
  name: "no-dynamic-createelement",
  defaultOptions: [],
  meta: {
    docs: {
      description:
        "This rule ensures that calls to `document.createElement()` use string literals to avoid dynamic tag creation to enhance plugin compatibility.",
    },
    fixable: "code",
    messages: {
      default: "Calls to document.createElement() should use string literals",
    },
    schema: [],
    type: "problem",
  },

  create(context) {
    return {
      CallExpression(node: TSESTree.CallExpression) {
        if (!node.arguments[0] || isStaticValue(node.arguments[0])) {
          return;
        }

        if (isCreateElement(node)) {
          return context.report({
            node,
            messageId: "default",
          });
        }
      },
    };
  },
});
