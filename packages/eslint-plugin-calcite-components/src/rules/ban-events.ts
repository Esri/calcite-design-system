import { Rule } from "eslint";
import { stencilComponentContext } from "stencil-eslint-core";
import { CallExpression, Literal } from "estree";

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: "This rule catches helps ban or warn against listened event types",
      category: "Consistency",
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

  create: function (context): Rule.RuleListener {
    const stencil = stencilComponentContext();
    const bannedEventToMessageLookup = new Map<string, string | null>();
    context.options.forEach((option: string | { event: string; message?: string }) => {
      const event = typeof option === "string" ? option : option.event;
      const message = typeof option === "string" ? null : option.message ?? null;
      bannedEventToMessageLookup.set(event, message);
    });

    function buildMessage(eventName: string): string {
      return bannedEventToMessageLookup.get(eventName) ?? `${eventName} is not allowed`;
    }

    return {
      ...stencil.rules,
      "MethodDefinition > Decorator[expression.callee.name=Listen] Literal": (node: Literal) => {
        if (stencil.isComponent()) {
          const eventName = node.value as string;

          if (bannedEventToMessageLookup.has(eventName)) {
            context.report({
              node,
              message: buildMessage(eventName),
            });
          }
        }
      },
      "CallExpression:matches([callee.property.name=addEventListener], [callee.property.name=removeEventListener])": (
        node: CallExpression,
      ) => {
        if (stencil.isComponent()) {
          const eventName = (node.arguments[0] as Literal).value as string;

          if (bannedEventToMessageLookup.has(eventName)) {
            context.report({
              node,
              message: buildMessage(eventName),
            });
          }
        }
      },
    };
  },
};

export default rule;
