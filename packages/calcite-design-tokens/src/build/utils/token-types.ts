import { DesignToken, TransformedToken } from "style-dictionary/types";

export function isBreakpoint(token: DesignToken): boolean {
  return !!token.filePath?.includes("container-size");
}

export function isTypographyRelated(token: DesignToken): boolean {
  return (
    !!token.path?.includes("typography") ||
    !!token.path?.includes("fontFamily") ||
    !!token.path?.includes("fontSize") ||
    !!token.path?.includes("fontWeight") ||
    !!token.path?.includes("letterSpacing") ||
    !!token.path?.includes("textCase") ||
    !!token.path?.includes("textDecoration") ||
    !!token.path?.includes("fontStyle") ||
    !!token.path?.includes("lineHeight")
  );
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
