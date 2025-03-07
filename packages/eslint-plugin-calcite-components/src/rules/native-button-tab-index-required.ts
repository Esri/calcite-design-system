import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator((name) => name);


export default createRule({
    name: "native-button-tab-index-required",
    meta: {
        docs: {
            description: "This rule catches if any native button element is missing a tab index attribute.",
        },
        messages: {
            default: "Native button elements should have a tab index attribute",
        },
        schema: [],
        type: "problem",
    },
    defaultOptions: [],
    create(context) {
        return {
            JSXElement(node: TSESTree.JSXElement) {
                const { openingElement } = node;
                const { name } = openingElement;
                if (name.type === "JSXIdentifier" && name.name === "button") {
                    const tabIndexAttribute = openingElement.attributes.find((attr) => {
                        return attr.type === "JSXAttribute" && attr.name.type === "JSXIdentifier" && attr.name.name === "tabIndex";
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