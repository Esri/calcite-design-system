import StyleDictionary, { TransformedToken } from "style-dictionary";

export function filterDarkMatcher(token: TransformedToken): boolean {
  return token.path.includes("dark");
}

export function registerFilterDark(sd: typeof StyleDictionary): void {
  sd.registerFilter({
    name: filterDark,
    filter: filterDarkMatcher,
  });
}

export const filterDark = "filter/dark";
