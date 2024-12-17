import StyleDictionary, { TransformedToken } from "style-dictionary";

export function filterGlobalTokens(token: TransformedToken): boolean {
  return (
    token.isSource &&
    !(
      token.type === "color" ||
      token.type === "dark" ||
      token.type === "light" ||
      token.type === "breakpoint" ||
      token.type === "min" ||
      token.type === "max" ||
      token.type === "typography"
    )
  );
}

export function registerFilterGlobalTokens(sd: typeof StyleDictionary): void {
  return sd.registerFilter({
    name: FilterGlobalTokens,
    filter: filterGlobalTokens,
  });
}

export const FilterGlobalTokens = "filter/GlobalTokens";
