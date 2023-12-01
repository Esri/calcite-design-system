import { Rule } from "eslint";
// @ts-ignore
import { stencilComponentContext } from "stencil-eslint-core";

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description:
        "This rule helps enforce the payload type to EventEmitters to avoid misleading `any` type on the CustomEvent detail object.",
      category: "Best practices",
      recommended: true,
    },
    schema: [],
    type: "problem",
  },

  create(context): Rule.RuleListener {
    const stencil = stencilComponentContext();

    return {
      ...stencil.rules,
      "PropertyDefinition > Decorator[expression.callee.name=Event]": (node: any) => {
        if (stencil.isComponent()) {
          const propertyDefNode = node.parent;
          const propertyDefType = propertyDefNode.typeAnnotation;
          const typedAsEventEmitter = !!propertyDefType;

          if (!typedAsEventEmitter) {
            context.report({
              node,
              message: "Emitter not typed as `EventEmitter<CustomEventDetailsType>`",
            });
            return;
          }

          const eventEmitterType = propertyDefType.typeAnnotation.typeParameters;

          if (eventEmitterType === undefined) {
            context.report({
              node,
              message: "EventEmitter is not typed and will cause its detail object to be typed as `any`",
            });
          }
        }
      },
    };
  },
};

export default rule;
