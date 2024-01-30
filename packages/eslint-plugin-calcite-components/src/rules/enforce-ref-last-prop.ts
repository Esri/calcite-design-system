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
          const attributes: (JSXAttribute | JSXSpreadAttribute)[] = [];

          openingElement.attributes.forEach((attr: JSXAttribute | JSXSpreadAttribute) => {
            if (attr.type === "JSXAttribute" && attr.name?.type === "JSXIdentifier") {
              attributes.push(attr);
            }
          });

          const refAttribute = attributes.find(
            (attr: JSXAttribute | JSXSpreadAttribute) =>
              attr.type === "JSXAttribute" && attr.name?.type === "JSXIdentifier" && attr.name.name === "ref",
          );

          if (refAttribute && attributes.indexOf(refAttribute) !== attributes.length - 1) {
            context.report({
              node,
              message: `"ref" prop should be placed last in JSX to ensure the node attrs/props are in sync.`,
              fix(fixer) {
                const sourceCode = context.getSourceCode();

                const refAttrText = sourceCode.getText(refAttribute as typeof node);
                const otherAttrs = attributes.filter((attr) => attr !== refAttribute);

                return [
                  fixer.remove(refAttribute as typeof node),
                  fixer.insertTextAfterRange(
                    [otherAttrs[otherAttrs.length - 1].range[1], otherAttrs[otherAttrs.length - 1].range[1]],
                    ` // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)\n${refAttrText}`,
                  ),
                ];
              },
            });
          }
        }
      },
    };
  },
};

export default rule;
