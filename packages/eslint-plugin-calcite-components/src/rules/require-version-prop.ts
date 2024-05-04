import { Rule } from "eslint";
import { getDecorator, stencilComponentContext } from "stencil-eslint-core";

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description:
        "This rule ensures components have a version property defined for the build to inject the version number",
      category: "Possible Errors",
    },
    fixable: "code",
    schema: [],
    type: "problem",
  },

  create(context): Rule.RuleListener {
    const stencil = stencilComponentContext();
    const versionStatus: {
      hasProp: boolean;
      hasValue: boolean;
      hasEmptyDecorator: boolean;
    } = {
      hasProp: false,
      hasValue: false,
      hasEmptyDecorator: false,
    };

    return {
      ...stencil.rules,
      PropertyDefinition: (node: any) => {
        if (!stencil.isComponent()) {
          return;
        }

        const decorator = getDecorator(node, "Prop");

        if (!decorator) {
          return;
        }

        if (node.key.name === "version") {
          versionStatus.hasProp = true;

          if (node.value?.name === "CalciteVersion") {
            versionStatus.hasValue = true;
          }

          if (node.decorators[0].expression.arguments.length === 0) {
            versionStatus.hasEmptyDecorator = true;
          }
        }
      },

      "ClassDeclaration:exit": (node: any) => {
        stencil.rules["ClassDeclaration:exit"](node);

        if (!stencil.isComponent()) {
          return;
        }

        const errorMessage = !versionStatus.hasProp
          ? "Component is missing a public `version` property"
          : !versionStatus.hasValue
            ? "Component's `version` property should be initialized to `CalciteVersion`"
            : !versionStatus.hasEmptyDecorator
              ? "Component's `version` property should be empty"
              : null;

        if (!errorMessage) {
          return;
        }

        return context.report({
          node,
          message: errorMessage,
          fix: (fixer) => {
            const fixers: Rule.Fix[] = [];

            const calciteVersionImportDeclarationNode = context.sourceCode.ast.body.find(
              (node) =>
                node.type === "ImportDeclaration" &&
                node.specifiers.some((specifier) => specifier.local.name === "CalciteVersion"),
            );

            if (!calciteVersionImportDeclarationNode) {
              const importStatement = `import { CalciteVersion } from "../resources";\n`;
              const sourceCode = context.sourceCode;
              const firstNode = sourceCode.ast.tokens[0];

              fixers.push(fixer.insertTextBefore(firstNode, importStatement));
            }

            if (!versionStatus.hasProp) {
              const classPropertiesWithPropDecorator = node.body.body.filter((prop) =>
                prop.decorators?.some((decorator) => decorator.expression.callee.name === "Prop"),
              );
              const lastProp = classPropertiesWithPropDecorator.pop();

              if (lastProp) {
                fixers.push(fixer.insertTextAfter(lastProp, `\n\n  @Prop() version = CalciteVersion;`));
              }

              return fixers;
            }

            if (!versionStatus.hasValue) {
              const versionNamedPropDecoratedProperty = node.body.body.find((prop) =>
                prop.decorators?.some((decorator) => {
                  return decorator.expression.callee.name === "Prop" && decorator.parent.key.name === "version";
                }),
              );

              fixers.push(
                fixer.replaceTextRange(
                  [versionNamedPropDecoratedProperty.range[1] - 1, versionNamedPropDecoratedProperty.range[1]],
                  " = CalciteVersion;",
                ),
              );
            }

            if (!versionStatus.hasEmptyDecorator) {
              const versionNamedPropDecoratedProperty = node.body.body.find((prop) =>
                prop.decorators?.some((decorator) => {
                  return decorator.expression.callee.name === "Prop" && decorator.parent.key.name === "version";
                }),
              );

              fixers.push(fixer.remove(versionNamedPropDecoratedProperty.decorators[0].expression.arguments[0]));
            }

            return fixers;
          },
        });
      },
    };
  },
};

export default rule;
