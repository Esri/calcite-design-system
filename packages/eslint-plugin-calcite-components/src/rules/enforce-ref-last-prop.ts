import { Rule } from "eslint";
import type { JSXAttribute, JSXSpreadAttribute, JSXOpeningElement } from "@babel/types";

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: `This rule ensures this is a workaround for a [Stencil bug](https://github.com/ionic-team/stencil/issues/4074) where ref is called in the specified order and not after initializing element with all its attributes/properties. This can cause attributes/properties to be outdated by the time the callback is invoked. This rule ensures the ref attribute is ordered last in a JSXElement to keep it up-to-date.`,
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
              message: `Attribute "ref" should be placed last in a JSXElement so node attrs/props are in sync. If it's called in the specified order, attributes/properties can be outdated by the time the callback is invoked.`,
            });
          }
        }
      },
    };
  },
};

export default rule;
