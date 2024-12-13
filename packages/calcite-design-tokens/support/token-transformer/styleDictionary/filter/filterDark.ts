import StyleDictionary, { TransformedToken } from "style-dictionary";

export function filterDarkMatcher(token: TransformedToken): boolean {
  return token.path.includes("dark");
}

export function registerFilterDark(sd: StyleDictionary): void {
  sd.registerFilter({
    name: filterDark,
    filter: filterDarkMatcher,
  });
}

export const filterDark = "filter/dark";
