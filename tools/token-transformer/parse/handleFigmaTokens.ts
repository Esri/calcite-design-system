import { DesignToken } from "style-dictionary/types/DesignToken";

export function handleFigmaTokens(key: string, value: any): DesignToken {
  const matchingGroup = new RegExp(/\$[.\w-]+/, 'g');
  let newValue = value;

  if (typeof newValue === 'string') {
    const matches = [...newValue.matchAll(matchingGroup)];
    matches.forEach((match) => {
      const figmaVariable  = match[0];
      newValue = newValue.replace(figmaVariable, `{${figmaVariable.slice(1)}}`);
    });
  }

  return newValue;
}
