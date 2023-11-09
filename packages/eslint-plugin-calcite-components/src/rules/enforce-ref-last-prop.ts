import { Rule } from "eslint";
import type { JSXAttribute, JSXSpreadAttribute, JSXOpeningElement } from "@babel/types";

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: `This ensures the node passed into the ref callback is in sync with its JSX attributes/properties when invoked.`,
      recommended: true,
    },
    fixable: "code",
    schema: [],
    type: "problem",
  },

  create(context): Rule.RuleListener {
    return {
      JSXIdentifier(node) {
        const openingElement = node.parent as JSXOpeningElement;
        if (openingElement.type === "JSXOpeningElement") {
          const attributes: string[] = [];

          openingElement.attributes.forEach((attr: JSXAttribute | JSXSpreadAttribute) => {
            if (attr.type === "JSXAttribute" && attr.name?.type === "JSXIdentifier") {
              attributes.push(attr.name.name);
            }
          });

          const refAttribute = attributes.find((attr: string) => attr === "ref");

          if (refAttribute && attributes.indexOf(refAttribute) !== attributes.length - 1) {
            context.report({
              node,
              message: `"ref" prop should be placed last in JSX to ensure the node attrs/props are in sync.`,
            });
          }
        }
      },
    };
  },
};

export default rule;
