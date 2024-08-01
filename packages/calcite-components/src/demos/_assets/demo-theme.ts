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
    "text-color$": "rgb(239, 118, 39)",
    "border-color$": "rgb(156, 89, 209)",
    "background-color$": "rgb(252, 244, 52)",
    color$: "rgb(0, 191, 255)",
    hover$: "rgb(255, 105, 180)",
    pressed$: "rgb(44, 44, 44)",
    selected$: "rgb(156, 89, 209)",
    shadow$:
      "rgb(255, 255, 255) 0px 0px 0px 4px, rgb(255, 105, 180) 0px 0px 0px 5px inset, rgb(0, 191, 255) 0px 0px 0px 9px",
    "z-index$": "42",
    "(size|space)$": "42px",
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

/*
 * @prop tokens - an array of CSS variables
 * @returns a string of CSS variables with their new values.
 */
export function setCSSVariables(tokens: string[]): string {
  return tokens
    .map((token) => {
      return `${token}: ${getTokenValue(token)};`;
    })
    .join("\n");
}

/**
 *
 * @example
 * <demo-theme tokens="
 *     --calcite-button-background-color,
 *     --calcite-button-border-color,
 *     --calcite-button-corner-radius,
 *     --calcite-button-corner-radius-start-start,
 *     --calcite-button-corner-radius-start-end,
 *     --calcite-button-corner-radius-end-start,
 *     --calcite-button-corner-radius-end-end,
 *     --calcite-button-loader-color,
 *     --calcite-button-shadow,
 *     --calcite-button-text-color,
 *     --calcite-button-icon-color"
 * ><calcite-button kind="inverse" scale="l"> Button </calcite-button></demo-theme>
 */
export class DemoTheme extends HTMLElement {
  _slot: HTMLSlotElement;

  _el: HTMLElement;

  static observedAttributes = ["tokens"];

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const slot = document.createElement("slot");
    shadow.append(slot);
    this._slot = slot;
    if (this._slot.assignedNodes().length === 1 && this._slot.assignedNodes()[0].nodeName.includes("calcite")) {
      this._el = this._slot.assignedNodes()[0] as HTMLElement;
    }
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (newValue !== oldValue && name === "tokens") {
      this.updateTheme(newValue);
    }
  }

  updateTheme(newValue: string): void {
    if (typeof newValue === "string") {
      let tokensList;

      try {
        tokensList = JSON.parse(newValue);
      } catch (error) {
        tokensList = newValue.split(",").map((t) => t.trim());
      }

      if (Array.isArray(tokensList)) {
        const stringifiedTheme = setCSSVariables(tokensList);

        if (this._el) {
          this._el.style.cssText = stringifiedTheme;
        } else {
          this.setAttribute("style", stringifiedTheme);
        }
      }
    }
  }
}

customElements.define("demo-theme", DemoTheme);
