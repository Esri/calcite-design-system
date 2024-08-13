/**
 *
 * Sets the value of a CSS variable to a test value.
 * This is useful for testing themed components.
 *
 * @param token - the token as a CSS variable
 * @returns string - the new value for the token
 */
export function getTokenValue(token: string): string {
  const tokenValueMap = {
    background$: "rgb(252, 244, 52)",
    "text-color$": "rgb(239,118,39)",
    "border-color$": "rgb(156, 89, 209)",
    "background-color$": "rgb(44, 44, 44)",
    color$: "rgb(0, 191, 255)",
    highlighted$: "rgb(255, 105, 180)",
    selected$: "rgb(255, 255, 255)",
    shadow$:
      "rgb(255, 255, 255) 0px 0px 0px 4px, rgb(255, 105, 180) 0px 0px 0px 5px inset, rgb(0, 191, 255) 0px 0px 0px 9px",
    "z-index$": "42",
    "(size|space|size-x|size-y)$": "42px",
    "(offset|offset-x|offset-y)$": "22px",
  } as const;

  const match = Object.entries(tokenValueMap).find(([regexStr]) => {
    return new RegExp(regexStr, "g").test(token);
  });

  if (!match) {
    console.warn("token not found in tokenValueMap", token);
    return tokenValueMap["color$"];
  }

  return match[1];
}

/**
 *
 * @param tokens - an array of CSS variables
 * @returns a string of CSS variables with their new values.
 */
export function setCSSVariables(tokens: string[]): string {
  return tokens
    .map((token) => {
      return `${token}: ${getTokenValue(token)};`;
    })
    .join("\n");
}
