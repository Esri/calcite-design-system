import { Rule } from "eslint";
import type { JSXAttribute, JSXOpeningElement, JSXSpreadAttribute } from "@babel/types";

const rule: Rule.RuleModule = {
  meta: {
    deprecated: true,
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
          const attributes = openingElement.attributes
            .map((attr) => {
              if (attr.type === "JSXAttribute" && attr.name?.type === "JSXIdentifier") {
                return attr;
              }
            })
            .filter(Boolean);

          const refAttribute = attributes.find(
            (attr: JSXAttribute | JSXSpreadAttribute) =>
              attr.type === "JSXAttribute" && attr.name?.type === "JSXIdentifier" && attr.name.name === "ref",
          );

          if (refAttribute) {
            const { sourceCode } = context;
            const refAttrText = sourceCode.getText(refAttribute as typeof node);
            const otherAttrs = attributes.filter((attr) => attr !== refAttribute);
            const indentation = new Array(refAttribute.loc.start.column).fill(" ").join("");
            const tokenBeforeRefAttr = sourceCode.getTokenBefore(refAttribute as typeof node);
            const eslintDisableComments = sourceCode
              .getCommentsBefore(refAttribute as typeof node)
              .filter((comment) => comment.value.includes("eslint-disable-next-line"));
            const refIsLastWithSortDisablingComment =
              attributes.indexOf(refAttribute) === attributes.length - 1 && eslintDisableComments.length !== 0;

            if (!refIsLastWithSortDisablingComment) {
              context.report({
                node,
                message: `"ref" prop should be placed last in JSX to ensure the node attrs/props are in sync.`,
                fix(fixer) {
                  return [
                    fixer.removeRange([tokenBeforeRefAttr.range[1], refAttribute.range[1]]),
                    fixer.insertTextAfterRange(
                      otherAttrs[otherAttrs.length - 1].range,
                      `\n${indentation}// eslint-disable-next-line react/jsx-sort-props -- auto-generated by @esri/calcite-components/enforce-ref-last-prop\n${indentation}${refAttrText}`,
                    ),
                  ];
                },
              });
            }
          }
        }
      },
    };
  },
};

export default rule;
