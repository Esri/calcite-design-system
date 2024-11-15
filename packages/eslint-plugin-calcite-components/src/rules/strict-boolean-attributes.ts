import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator((name) => name);

export default createRule({
  name: "strict-boolean-attributes",
  meta: {
    docs: {
      description: "This rule catches boolean properties decorated with @Prop() that are initialized to true.",
    },
    messages: {
      default: "Boolean properties decorated with @property() should not be initialized to true",
    },
    schema: [],
    type: "problem",
  },
  defaultOptions: [],
  create(context) {
    return {
      PropertyDefinition: (node: TSESTree.PropertyDefinition) => {
        const decorators = node.decorators || [];
        const hasPropDecorator = decorators.some(
          (decorator) =>
            decorator.expression.type === "CallExpression" &&
            decorator.expression.callee.type === "Identifier" &&
            decorator.expression.callee.name === "property",
        );

        if (hasPropDecorator) {
          const initializer = node.value;

          if (initializer && initializer.type === "Literal" && initializer.value === true) {
            context.report({
              node: node.key,
              messageId: "default",
            });
          }
        }
      },
    };
  },
});
