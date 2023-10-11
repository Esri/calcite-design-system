import { Rule } from "eslint";
import type { JSXAttribute, JSXSpreadAttribute, JSXOpeningElement } from "@babel/types";

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: "Ensure that the ref attribute is placed as the last property in JSX elements to keep it up-to-date",
      category: "Best Practices",
      recommended: true,
    },
    fixable: "code",
    schema: [],
    type: "problem",
  },

  // https://unpkg.com/browse/@babel/types@7.6.0/lib/index.d.ts
  // export interface JSXAttribute extends BaseNode {
  //   type: "JSXAttribute";
  //   name: JSXIdentifier | JSXNamespacedName;
  //   value: JSXElement | JSXFragment | StringLiteral | JSXExpressionContainer | null;
  // }

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

          console.log("refAttribute", refAttribute);

          if (refAttribute && attributes.indexOf(refAttribute) !== attributes.length - 1) {
            context.report({
              node,
              message: "The 'ref' attribute should be placed as the last property in JSX elements.",
            });
          }
        }
      },
    };
  },
};

export default rule;
