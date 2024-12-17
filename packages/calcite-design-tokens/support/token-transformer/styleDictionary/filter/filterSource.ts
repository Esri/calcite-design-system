import StyleDictionary, { TransformedToken } from "style-dictionary";

export function filterSourceMatcher(token: TransformedToken): boolean {
  return token.isSource;
}

export function registerFilterSource(sd: typeof StyleDictionary): void {
  sd.registerFilter({
    name: filterSource,
    filter: filterSourceMatcher,
  });
}

export const filterSource = "filter/source";
