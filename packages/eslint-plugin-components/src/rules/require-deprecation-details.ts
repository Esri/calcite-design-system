import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator((name) => name);

export default createRule({
  name: "require-deprecation-details",
  defaultOptions: [],
  meta: {
    docs: {
      description:
        "This rule ensures there's a deprecation and removal version in @deprecated JSDoc tags, e.g. '@depercated in v1.2.3, removal target in v3'",
    },
    messages: {
      missingDeprecation: "Add a deprecation version to @deprecated tag (e.g. '@deprecated in v1.2.3').",
      missingRemoval: "Add a removal target version to @deprecated tag (e.g. 'removal target v3').",
      missingBoth:
        "Add deprecation and removal target versions to @deprecated tag (e.g. '@deprecated in v1.2.3, removal target v3').",
    },
    schema: [],
    type: "problem",
  },
  create(context) {
    const { sourceCode } = context;

    function inspectCommentsOnNode(node: TSESTree.Node) {
      const leadingComments = sourceCode.getCommentsBefore(node as any);

      for (const comment of leadingComments) {
        if (comment.type !== "Block") continue;

        const raw = comment.value || "";
        const deprecatedTagRegex = /@deprecated\b([\s\S]*?)(?=(?:\n\s*\*\s*@)|$)/gi;
        const deprecationVersionRegex = /^\s*in\s+v?\d+(?:\.\d+){0,2}\b/i;
        const removalTargetRegex = /\bremoval\s+target\s+v?\d+(?:\.\d+){0,2}\b/i;

        for (const match of raw.matchAll(deprecatedTagRegex)) {
          const tagContent = (match[1] as string) || "";
          const hasDeprecationVersion = deprecationVersionRegex.test(tagContent);
          const hasRemovalTarget = removalTargetRegex.test(tagContent);

          let messageId: "missingDeprecation" | "missingRemoval" | "missingBoth" | undefined;

          if (!hasDeprecationVersion && !hasRemovalTarget) {
            messageId = "missingBoth";
          } else if (!hasDeprecationVersion) {
            messageId = "missingDeprecation";
          } else if (!hasRemovalTarget) {
            messageId = "missingRemoval";
          }

          if (messageId) {
            context.report({ loc: comment.loc, messageId });
          }
        }
      }
    }

    return {
      ClassDeclaration: inspectCommentsOnNode,
      MethodDefinition: inspectCommentsOnNode,
      PropertyDefinition: inspectCommentsOnNode,
    };
  },
});
