/** Forbid certain props on DOM elements */
export function forbidDomProps(options) {
  const { forbidden } = options;
  return (context) => ({
    JSXAttribute(node) {
      // › Extract prop name
      const propName = node.name.type === "JSXIdentifier" ? node.name.name : null;
      if (propName == null) return;
      const forbiddenEntry = forbidden.find((entry) => entry.propName === propName);
      if (!forbiddenEntry) return;

      const parent = node.parent;
      if (parent?.type !== "JSXOpeningElement") return;

      const elName = parent.name.type === "JSXIdentifier" ? parent.name.name : null;

      if (elName == null || elName[0] !== elName[0]?.toLowerCase()) return;

      context.report({
        node,
        message: forbiddenEntry.message || `Prop "${propName}" is forbidden on elements.`,
      });
    },
  });
}

/** Disallow JSX props spreading. */
export function jsxPropsNoSpreading() {
  return (context) => ({
    JSXSpreadAttribute(node) {
      context.report({
        node,
        message: "Props spreading is not allowed.",
      });
    },
  });
}

