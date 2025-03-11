import { DesignToken, TransformedToken } from "style-dictionary/types";

export function isBreakpoint(token: DesignToken): boolean {
  return !!token.filePath?.includes("container-size");
}

interface IsThemedOptions {
  theme?: "light" | "dark";
  targetPropName?: keyof Pick<TransformedToken, "filePath" | "path">;
}

export function isThemed(token: TransformedToken, options?: IsThemedOptions): boolean {
  const { theme, targetPropName } = options || {};
  const targetProp = token[targetPropName ?? "filePath"];

  return (
    token.type === "color" &&
    (theme ? targetProp.includes(theme) : targetProp.includes("light") || targetProp.includes("dark"))
  );
}
