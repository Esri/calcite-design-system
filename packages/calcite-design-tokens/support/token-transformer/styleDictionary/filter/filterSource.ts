import { TransformedToken, Core as StyleDictionary } from "style-dictionary";

export function filterSourceMatcher(token: TransformedToken): boolean {
  return token.isSource;
}

export function registerFilterSource(sd: StyleDictionary): void {
  sd.registerFilter({
    name: filterSource,
    matcher: filterSourceMatcher,
  });
}

export const filterSource = "filter/source";
