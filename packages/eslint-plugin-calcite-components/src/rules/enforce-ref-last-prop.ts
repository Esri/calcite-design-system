import { Rule } from "eslint";
import type { JSXAttribute, JSXSpreadAttribute, JSXOpeningElement } from "@babel/types";

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: `Ensures the ref attribute is ordered last in a JSXElement to keep it up-to-date`,
      category: "Best Practices",
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
              message: `The "ref" attribute should be the last attribute in a JSXElement`,
            });
          }
        }
      },
    };
  },
};

export default rule;
