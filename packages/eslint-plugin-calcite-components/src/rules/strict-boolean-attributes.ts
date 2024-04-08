import { Rule } from "eslint";
// @ts-ignore
import { getDecorator, stencilComponentContext } from "stencil-eslint-core";

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description:
        "This rule catches Stencil boolean Props that would not be able to be set to false with HTML5-compliant attributes.",
      category: "Possible Errors",
      recommended: false,
    },
    schema: [],
    type: "problem",
  },

  create(context): Rule.RuleListener {
    const stencil = stencilComponentContext();

    return {
      ...stencil.rules,
      PropertyDefinition: (node: any) => {
        const propDecorator = getDecorator(node, "Prop");
        if (stencil.isComponent() && propDecorator) {
          const initializer = node.value?.value;
          if (initializer === true) {
            context.report({
              node: node.key,
              message: `Boolean properties decorated with @Prop() should not be initialized to true`,
            });
          }
        }
      },
    };
  },
};

export default rule;
