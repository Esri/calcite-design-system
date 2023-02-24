class DemoSpacer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
          <style>
            :host {
              display: grid;
              grid-template-columns: 1fr;
              grid-gap: ${this.getAttribute("gap") || "12px"};
            }
          </style>
          <slot></slot>
        `;
    }
  }
}
customElements.define("demo-spacer", DemoSpacer);
