import { TransformedToken } from "style-dictionary/types";

export function isBreakpoint(token: TransformedToken): boolean {
  return token.path.includes("container-size");
}
