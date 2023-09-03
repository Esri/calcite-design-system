import { Rule } from "eslint";
import { stencilComponentContext } from "stencil-eslint-core";

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: "Ensure that the ref attribute is placed as the last property in JSX elements to keep it up-to-date",
      category: "Best Practices",
      recommended: true,
    },
    fixable: "code",
    schema: [],
  },

  create(context): Rule.RuleListener {
    const stencil = stencilComponentContext();

    return {
      JSXOpeningElement(node) {
        const attributes = node.attributes;
        const refAttribute = attributes.find((attr) => attr.name.name === "ref");

        if (refAttribute && attributes.indexOf(refAttribute) !== attributes.length - 1) {
          context.report({
            node,
            message: "The 'ref' attribute should be placed as the last property in JSX elements.",
          });
        }
      },
    };
  },
};

export default rule;
