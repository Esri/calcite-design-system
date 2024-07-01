const defaultTheme = {
  primary: "blue",
  background: "grey",
  shadowColor: "black",
  shadowValues: "0 1px 2px 0 1",
  cornerRadius: "42px",
  zIndex: "9999",
  space: "24px",
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
    this._el = this._slot.assignedNodes()[0] as HTMLElement;
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (newValue !== oldValue) {
      this.updateTheme(newValue);
    }
  }

  updateTheme(newValue: string): void {
    const tokens = JSON.parse(newValue);
    const theme = {};

    if (tokens && typeof tokens === "string") {
      const textIconColorRegex = new RegExp(/(text|icon)-color/);
      const backgroundBorderRegex = new RegExp(/(background|border)-color/);
      const cornerRegex = new RegExp(/corner-radius/);
      const zIndexRegex = new RegExp(/z-index/);
      const spaceRegex = new RegExp(/space/);
      const shadowRegex = new RegExp(/shadow(-color)*/);
      const tokensList = tokens.split(",").map((token) => token.trim());
      let stringifiedTheme = "";

      tokensList.forEach((token) => {
        let value = "";
        if (textIconColorRegex.test(token)) {
          value = this._theme.text;
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

      Object.entries(theme).forEach(([key, value]) => {
        stringifiedTheme += `${key}: ${value};`;
      });

      this._el.style.cssText = stringifiedTheme;
    }
  }
}
