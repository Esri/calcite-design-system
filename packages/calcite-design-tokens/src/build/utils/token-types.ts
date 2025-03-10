import { DesignToken } from "style-dictionary/types";

export function isBreakpoint(token: DesignToken): boolean {
  return !!token.filePath?.includes("container-size");
}
