import { Rule } from "eslint";

const eventHandlerPropLikePattern = /^on[A-Z]\w+/;
const allowedExactAttributes = ["id", "calcite-hydrated-hidden", "role", "tabIndex", "tabindex"];

const allowedAttributeName = (attributeName: string): boolean =>
  allowedExactAttributes.includes(attributeName) ||
  attributeName.startsWith("aria-") ||
  attributeName.startsWith("bla") ||
  eventHandlerPropLikePattern.test(attributeName);

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: "This rule catches usage of banned props on <Host>.",
      category: "Possible Errors",
      recommended: true,
    },
    schema: [
      {
        type: "array",
        items: {
          type: "string",
        },
        minLength: 1,
        additionalProperties: false,
      },
    ],
    type: "problem",
  },

  create(context): Rule.RuleListener {
    return {
      JSXIdentifier: (node: any) => {
        if (node.name === "Host" && node.parent.type === "JSXOpeningElement") {
          const hostAttributes: string[] = [];

          node.parent.attributes.forEach((node: any) => node.name?.name && hostAttributes.push(node.name.name));

          const unauthorizedAttributes = hostAttributes.filter((attribute) => !allowedAttributeName(attribute));

          if (unauthorizedAttributes.length > 0) {
            context.report({
              node: node,
              message: `Avoid setting unnecessary attributes/properties on <Host>: ${unauthorizedAttributes.join(
                ", ",
              )}`,
            });
          }
        }
      },
    };
  },
};

export default rule;
