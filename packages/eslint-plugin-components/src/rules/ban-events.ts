import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator((name) => name);

type Options = (string | { event: string; message?: string })[];

export default createRule<Options, "default">({
  name: "ban-events",
  defaultOptions: [],
  meta: {
    docs: {
      description: "This rule helps ban or warn against listened event types",
    },
    messages: {
      default: "{{message}}",
    },
    schema: {
      type: "array",
      items: {
        anyOf: [
          { type: "string" },
          {
            type: "object",
            properties: {
              event: { type: "string" },
              message: {
                type: "string",
                minLength: 1,
              },
            },
            additionalProperties: false,
            required: ["event"],
          },
        ],
      },
      uniqueItems: true,
    },
    type: "problem",
  },

  create(context) {
    const bannedEventToMessageLookup = new Map<string, string | null>();
    context.options.forEach((option: string | { event: string; message?: string }) => {
      const event = typeof option === "string" ? option : option.event;
      const message = typeof option === "string" ? null : (option.message ?? null);
      bannedEventToMessageLookup.set(event, message);
    });

    function buildMessage(eventName: string): string {
      return bannedEventToMessageLookup.get(eventName) ?? `${eventName} is not allowed`;
    }

    function checkEvent(node: TSESTree.CallExpression, eventName: string): void {
      if (bannedEventToMessageLookup.has(eventName)) {
        context.report({
          node,
          messageId: "default",
          data: {
            message: buildMessage(eventName),
          },
        });
      }
    }

    return {
      "ClassDeclaration[superClass.name=LitElement] CallExpression:matches([callee.property.name=addEventListener], [callee.property.name=removeEventListener])"(
        node: TSESTree.CallExpression,
      ) {
        const eventName = (node.arguments[0] as TSESTree.Literal).value as string;
        checkEvent(node, eventName);
      },
      "ClassDeclaration[superClass.name=LitElement] CallExpression[callee.object.type=ThisExpression][callee.property.name=listen], CallExpression[callee.object.type=ThisExpression][callee.property.name=listenOn]"(
        node: TSESTree.CallExpression,
      ) {
        const eventName = (node.arguments[1] as TSESTree.Literal).value as string;
        checkEvent(node, eventName);
      },
    };
  },
});
