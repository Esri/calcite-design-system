import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator((name) => name);


export default createRule({
    name: "button-tab-index-required",
    meta: {
        docs: {
            description: "This rule catches if any button element is missing a tab index attribute.",
        },
        messages: {
            default: "Button element should have a tab index attribute",
        },
        schema: [],
        type: "problem",
        fixable: "code",
    },
    defaultOptions: [],
    create(context) {
        return {
            JSXElement(node: TSESTree.JSXElement) {
                const { openingElement } = node;
                const el = openingElement.name;
                if (el.type === "JSXIdentifier" && el.name === "button") {
                    const tabIndexAttribute = openingElement.attributes.find((attr) => {
                        if (attr.type === "JSXAttribute") {
                            const { name: { type, name } } = attr;
                            return type === "JSXIdentifier" && name === "tabIndex"
                        };
                        return false;
                    });
                    if (!tabIndexAttribute) {
                        context.report({
                            node: openingElement,
                            messageId: "default",
                        });
                    }
                }

            }
        };
    },
});