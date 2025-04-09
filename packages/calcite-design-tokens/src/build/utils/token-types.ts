import { DesignToken, TransformedToken } from "style-dictionary/types";

export function isBreakpoint(token: TransformedToken): boolean {
  const fullPath = token.path.join(".");
  return fullPath.includes("container-size.width") || fullPath.includes("container-size.height");
}

export function isBreakpointRelated(token: TransformedToken): boolean {
  return token.path.includes("container-size");
}

export function isBreakpointExpand(token: DesignToken): boolean {
  return token.filePath.includes("container-size");
}

export function isCornerRadius(token: DesignToken): boolean {
  return token.path.join(".").includes("corner.radius");
}

export function isFontRelated(token: TransformedToken): boolean {
  const fullPath = token.path.join(".");

  return (
    fullPath.includes("font.family") ||
    fullPath.includes("font.size") ||
    fullPath.includes("font.style") ||
    fullPath.includes("font.weight") ||
    fullPath.includes("font.letter-spacing") ||
    fullPath.includes("font.paragraph-spacing") ||
    fullPath.includes("font.line-height") ||
    fullPath.includes("font.text-case") ||
    fullPath.includes("font.text-decoration")
  );
}

export function isLetterSpacing(token: TransformedToken): boolean {
  return isDimension(token) && token.path.includes("letter-spacing");
}

export function isDimension(token: TransformedToken): boolean {
  return token.type === "dimension";
}

export function isTypography(token: TransformedToken): boolean {
  return token.path.includes("typography");
}

interface IsThemedOptions {
  theme?: "light" | "dark";
}

export function isThemed(token: DesignToken, options?: IsThemedOptions): boolean {
  const { theme } = options || {};
  const targetProp = token.filePath;

  return (
    token.type === "color" &&
    (theme ? targetProp.includes(theme) : targetProp.includes("light") || targetProp.includes("dark"))
  );
}
