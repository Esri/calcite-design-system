import StyleDictionary, { TransformedToken } from "style-dictionary";

export function filterLightMatcher(token: TransformedToken): boolean {
  return token.path.includes("light");
}

export function registerFilterLight(sd: StyleDictionary): void {
  sd.registerFilter({
    name: filterLight,
    filter: filterLightMatcher,
  });
}

export const filterLight = "filter/light";
