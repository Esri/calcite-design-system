/*
 * EXAMPLE USAGE:
 *
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
 *
 */

const defaultTheme = {
  background: "blue",
  cornerRadius: "42px",
  shadowColor: "black",
  shadowValues: "0 1px 2px 0 1",
  space: "24px",
  textColor: "green",
  zIndex: "9999",
};

export class DemoTheme extends HTMLElement {
  _slot: HTMLSlotElement;

  _el: HTMLElement;

  _theme: Record<string, string> = defaultTheme;

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
      const textIconColorRegex = new RegExp(/(text|icon)-color/);
      const backgroundBorderRegex = new RegExp(/(background|border)-color/);
      const cornerRegex = new RegExp(/corner-radius/);
      const zIndexRegex = new RegExp(/z-index/);
      const spaceRegex = new RegExp(/space/);
      const shadowRegex = new RegExp(/shadow(-color)*/);

      const theme = {};

      let tokensList;

      try {
        tokensList = JSON.parse(newValue);
      } catch (error) {
        tokensList = newValue.split(",").map((t) => t.trim());
      }

      if (Array.isArray(tokensList)) {
        tokensList.forEach((token) => {
          let value = "";
          if (textIconColorRegex.test(token)) {
            value = this._theme.textColor;
          } else if (backgroundBorderRegex.test(token)) {
            value = this._theme.background;
          } else if (shadowRegex.test(token)) {
            value = token.includes("color")
              ? `${this._theme.shadowColor}`
              : `${this._theme.shadowValues} ${this._theme.shadowColor}`;
          } else if (cornerRegex.test(token)) {
            value = `${this._theme.cornerRadius}`;
          } else if (zIndexRegex.test(token)) {
            value = `${this._theme.zIndex}`;
          } else if (spaceRegex.test(token)) {
            value = `${this._theme.space}`;
          }
          theme[token] = value;
        });
      }

      const stringifiedTheme = Object.entries(theme)
        .map(([key, value]) => {
          return `${key}: ${value};`;
        })
        .join(" ");

      if (this._el) {
        this._el.style.cssText = stringifiedTheme;
      } else {
        this.setAttribute("style", stringifiedTheme);
      }
    }
  }
}

customElements.define("demo-theme", DemoTheme);
